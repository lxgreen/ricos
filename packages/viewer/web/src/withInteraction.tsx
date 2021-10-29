import React, { ReactElement } from 'react';
import { isArray } from 'lodash';
import { getInteractionWrapper } from './utils/getInteractionWrapper';
import { ViewerContextType } from 'wix-rich-content-common';
import { PreviewInteraction } from './types';

export const withInteraction = (
  element: ReactElement | string,
  interactions: PreviewInteraction[],
  context: ViewerContextType
) => {
  const { config } = context;
  if (
    !config.PREVIEW?.contentInteractionMappers?.length ||
    !config.PREVIEW.onPreviewExpand ||
    !isArray(interactions)
  ) {
    return element;
  }
  const BlockInteractionWrapper = getInteractionWrapper({ interactions, context });
  return <BlockInteractionWrapper>{element}</BlockInteractionWrapper>;
};
