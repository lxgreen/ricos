const x = [
  'wix-rich-content-plugin-button',
  'wix-rich-content-plugin-code-block',
  'wix-rich-content-plugin-collapsible-list',
  'wix-rich-content-plugin-divider',
  'wix-rich-content-plugin-emoji',
  'wix-rich-content-plugin-file-upload',
  'wix-rich-content-plugin-gallery',
  'wix-rich-content-plugin-giphy',
  'wix-rich-content-plugin-hashtag',
  'wix-rich-content-plugin-headers-markdown',
  'wix-rich-content-plugin-headings',
  'wix-rich-content-plugin-html',
  'wix-rich-content-plugin-image',
  'wix-rich-content-plugin-indent',
  'wix-rich-content-plugin-line-spacing',
  'wix-rich-content-plugin-link',
  'wix-rich-content-plugin-link-preview',
  'wix-rich-content-plugin-link-preview',
  'wix-rich-content-plugin-map',
  'wix-rich-content-plugin-mentions',
  'wix-rich-content-plugin-social-polls',
  'wix-rich-content-plugin-sound-cloud',
  'wix-rich-content-plugin-spoiler',
  'wix-rich-content-plugin-table',
  'wix-rich-content-plugin-text-color',
  'wix-rich-content-plugin-undo-redo',
  'wix-rich-content-plugin-unsupported-blocks',
  'wix-rich-content-plugin-vertical-embed',
  'wix-rich-content-plugin-video',
]
  .map(package => {
    const postfix = package.substring('wix-rich-content-'.length);
    return {
      [package]: [`packages/${postfix}/web/src`],
      [`${package}/viewer`]: [`packages/${postfix}/web/src/viewer`],
      [`${package}/loadable/viewer`]: [`packages/${postfix}/web/src/viewer-loadable`],
      [`${package}/libs/*`]: [`packages/${postfix}/web/lib/*`],
    };
  })
  .reduce((prev, curr) => ({
    ...prev,
    ...curr,
  }));

console.log(x);
