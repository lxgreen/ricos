import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';

const handleLinkSettings = linkSettings => {
  const { anchorTarget = '_blank', customAnchorScroll } = linkSettings;
  let { relValue, rel } = linkSettings;
  if (relValue) {
    console.warn(`relValue is deprecated, Please use rel prop instead.`);
    rel = convertRelStringToObject(relValue) || rel;
  }
  relValue = convertRelObjectToString(rel);
  return { relValue, anchorTarget, customAnchorScroll };
};

export const getLinkModalProps = (editorCommands, linkSettings) => {
  const linkData = editorCommands?.getLinkDataInSelection();
  const anchorableBlocks = editorCommands?.getAnchorableBlocks();
  const linkSettingsData = handleLinkSettings(linkSettings);
  return { linkData, anchorableBlocks, linkSettingsData };
};
