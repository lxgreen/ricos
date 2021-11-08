import { SEOSettings } from 'wix-rich-content-common';

export const getPaywallSeoClass = (paywall: SEOSettings['paywall'], blockIndex: number) => {
  const { index = 3, className = 'paywall' } = paywall || {};
  return blockIndex < index && className;
};

export const isPaywallSeo = (seoMode?: SEOSettings) =>
  typeof seoMode === 'object' && typeof seoMode.paywall === 'object';
