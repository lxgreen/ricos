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

const getBaseData = ({ imageSrc, pageUrl, imageWidth, imageHeight }) => ({
  url: pageUrl,
  imageSrc,
  imageWidth,
  imageHeight,
});

const getBookingData = (data, t) => {
  const { name, durations } = data;
  const content = {
    title: name,
    info: { leftSubtitle: durations && convertDuration(durations, t) },
    buttonText: t('VerticalEmbed_Bookings_Button'),
  };
  return { content, ...getBaseData(data) };
};

const getEventData = (data, t) => {
  const { name, scheduling, location } = data;
  const content = {
    title: name,
    info: { leftSubtitle: scheduling, rightSubtitle: location },
    buttonText: t('VerticalEmbed_Events_Button'),
  };
  return { content, ...getBaseData(data) };
};

const getProductData = (data, t) => {
  const content = {
    title: data.name,
    buttonText: t('VerticalEmbed_Products_Button'),
  };
  return { content, ...getBaseData(data) };
};

export const dataTypeMapper = {
  [verticalEmbedProviders.booking]: getBookingData,
  [verticalEmbedProviders.event]: getEventData,
  [verticalEmbedProviders.product]: getProductData,
};
