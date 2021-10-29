import React, { ComponentType } from 'react';
import { combineMappers } from './combineMappers';
import { PreviewInteraction } from '../types';
import { ViewerContextType } from 'wix-rich-content-common';

export const DefaultInteractionWrapper = ({ children }) => children;

export const getInteractionWrapper = ({
  interactions,
  context,
}: {
  interactions: PreviewInteraction[];
  context: ViewerContextType;
}) => ({ children }: { children: ComponentType }) => {
  const { config } = context;
  const { contentInteractionMappers = [], onPreviewExpand = () => {} } = config.PREVIEW || {};
  const interactionMap = combineMappers(contentInteractionMappers, onPreviewExpand);
  return interactions.reduce((child: ComponentType, { type, settings }) => {
    const Interaction = interactionMap[type] || DefaultInteractionWrapper;
    return (
      <Interaction {...settings} {...context}>
        {child}
      </Interaction>
    );
  }, children);
};
