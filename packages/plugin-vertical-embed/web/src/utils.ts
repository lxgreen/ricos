import { verticalEmbedProviders } from './constants';
import { isNumber } from 'lodash';
import imageClientAPI from 'image-client-api/dist/imageClientSDK';

export const convertDuration = (durationInMinutes, t) => {
  if (!isNumber(durationInMinutes)) return '';
  if (durationInMinutes < 60) {
    return t('VerticalEmbed_Units_Minute', { minutes: durationInMinutes });
  }
  const hours = durationInMinutes / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const durationInHours =
    rminutes === 0
      ? t('VerticalEmbed_Units_Hour', { hours: rhours })
      : t('VerticalEmbed_Units_Hour', { hours: rhours }) +
        ' ' +
        t('VerticalEmbed_Units_Minute', { minutes: rminutes });
  return durationInHours;
};

const getBookingData = (data, t) => {
  const { name, imageSrc, pageUrl, durations } = data;
  const content = {
    title: name,
    info: { leftSubtitle: durations && convertDuration(durations, t) },
    buttonText: t('VerticalEmbed_Bookings_Button'),
  };
  return { url: pageUrl, imageSrc, content };
};

const getEventData = (data, t) => {
  const { name, imageSrc, scheduling, pageUrl, location } = data;
  const content = {
    title: name,
    info: { leftSubtitle: scheduling, rightSubtitle: location },
    buttonText: t('VerticalEmbed_Events_Button'),
  };
  return { url: pageUrl, imageSrc, content };
};

const getProductData = (data, t) => {
  const { name, imageSrc, pageUrl } = data;
  const content = {
    title: name,
    buttonText: t('VerticalEmbed_Products_Button'),
  };
  return { url: pageUrl, imageSrc, content };
};

export function getMediaId(src: string) {
  try {
    const [, mediaId] = /media\/([^/]+)/.exec(src) as string[];
    return mediaId;
  } catch (error) {
    return src;
  }
}

export function getImageSrc(src: string, width: number, height: number) {
  const mediaId = getMediaId(src);

  try {
    return imageClientAPI.getScaleToFillImageURL(mediaId, null, null, width, height, {
      quality: 90,
    });
  } catch (error) {
    return src;
  }
}

export const dataTypeMapper = {
  [verticalEmbedProviders.booking]: getBookingData,
  [verticalEmbedProviders.event]: getEventData,
  [verticalEmbedProviders.product]: getProductData,
};
