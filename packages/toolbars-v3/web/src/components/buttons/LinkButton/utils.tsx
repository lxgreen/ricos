import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';
import { getAnchorableBlocksFromAnchorableNodes, getAnchorableNodesQuery } from './anchorAdapter';
import type { ContentQueryService } from 'ricos-content-query';

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

export const getLinkModalProps = (
  editorCommands,
  linkSettings,
  contentQueryService: ContentQueryService,
  experiments
) => {
  const linkData = editorCommands?.getLinkDataInSelection();
  let anchorableBlocks;
  if (experiments.tiptapEditor.enabled) {
    const contentExtractor = contentQueryService.getContentExtractor();
    if (contentExtractor) {
      const anchorableNodes = getAnchorableNodesQuery(contentExtractor, editorCommands);
      anchorableBlocks = getAnchorableBlocksFromAnchorableNodes(anchorableNodes);
    }
  } else {
    anchorableBlocks = editorCommands?.getAnchorableBlocks();
  }
  const linkSettingsData = handleLinkSettings(linkSettings);
  return { linkData, anchorableBlocks, linkSettingsData };
};
