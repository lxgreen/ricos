import { verticalEmbedProviders } from './constants';
import { isNumber } from 'lodash';

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

export const fixImageSrc = (src, width) => {
  if (!src) {
    return;
  }
  const originalWidth = src.match(/w_[0-9]+/)?.[0].slice(2);
  const originalHight = src.match(/h_[0-9]+/)?.[0].slice(2);
  const height = Math.floor(width * (originalHight / originalWidth));
  return src.replace(/w_[0-9]+,h_[0-9]+/, `w_${width},h_${height}`);
};

export const dataTypeMapper = {
  [verticalEmbedProviders.booking]: getBookingData,
  [verticalEmbedProviders.event]: getEventData,
  [verticalEmbedProviders.product]: getProductData,
};
