import React, { ReactNode } from 'react';
import { combineMappers } from './combineMappers';

export const DefaultInteractionWrapper = ({ children }) => children;

export const getInteractionWrapper = ({ interactions, context }) => ({
  children,
}: {
  children: ReactNode[];
}) => {
  const { config } = context;
  const { contentInteractionMappers = [], onPreviewExpand = () => {} } = config.PREVIEW || {};
  const interactionMap = combineMappers(contentInteractionMappers, onPreviewExpand);
  return interactions.reduce((child: ReactNode, { type, settings }) => {
    const Interaction = interactionMap[type] || DefaultInteractionWrapper;
    return (
      <Interaction {...settings} {...context}>
        {child}
      </Interaction>
    );
  }, children);
};
