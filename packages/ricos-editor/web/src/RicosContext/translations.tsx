export const fetchLocaleResource = async (locale = 'en') => {
  if (locale === 'en') {
    return { locale };
  }
  try {
    const localeResource = await import(
      /* webpackChunkName: "ricos_messages_[request]" */
      `wix-rich-content-common/dist/statics/locale/messages_${locale}.json`
    ).then(res => res.default);
    return { locale, localeResource };
  } catch (err) {
    throw new Error(`error while loading locale ${locale}:\n${err}`);
  }
};
