'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isExternal = void 0;
const externals = [
  'assert',
  'axios',
  'classnames',
  'lodash',
  'prop-types',
  'react',
  'react-dom',
  'wix-rich-content-editor-common',
  'wix-rich-content-common',
  'wix-rich-content-plugin-commons',
  'wix-rich-content-ui-components',
  'wix-rich-content-toolbars-new',
  'wix-rich-content-toolbars',
  'i18next',
  'react-i18next',
  'react-flip-move',
  'image-client-api/dist/imageClientSDK',
  '@wix/draft-js',
  'downshift',
  /^punycode$/,
  /^jss$/,
  /^jss-plugin-camel-case$/,
  /^jss-plugin-nested$/,
  /^jss-plugin-props-sort$/,
  /^wix-rich-content-editor$/,
  /^wix-rich-content-viewer$/,
  /^ricos-content$/,
  /^ricos-content\/libs\/toDraftData$/,
  /^react-player$/,
  /^@loadable\/component$/,
  /@babel\/runtime/,
];
const excludedExternalsRegexArr = [
  /react-click-outsider/,
  /@tiptap\/react/,
  /@tiptap/,
  /wix-rich-content-editor-common\/.*?\.scss/,
  /wix-rich-content-common\/.*?\.scss/,
];
const localPrefixes = ['\0', '.', '/'];
const testRegex = (regex, source) =>
  typeof regex === 'string' ? regex === source : regex.test(source);
const isExternal = source => {
  return (
    !localPrefixes.some(prefix => source.startsWith(prefix)) &&
    !excludedExternalsRegexArr.some(regex => testRegex(regex, source)) &&
    externals.some(externalName => new RegExp(externalName).test(source))
  );
};
exports.isExternal = isExternal;
