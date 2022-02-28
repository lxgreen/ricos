const defaultLineSpacing = {
  'line-height': '1.5',
  'padding-top': '2px',
  'padding-bottom': '3px',
};

const getSpacing = (currentSpacing = {}, defaultLineSpacingFromApi = {}) => {
  const hasCurrentSpacing = Object.keys(currentSpacing).length !== 0;
  const hasDefaultSpacing = Object.keys(defaultLineSpacingFromApi).length !== 0;
  const defaultSpacing = hasDefaultSpacing ? defaultLineSpacingFromApi : defaultLineSpacing;
  return hasCurrentSpacing ? currentSpacing : defaultSpacing;
};

export const getCurrentSelection = (toolbarItem, defaultLineSpacingFromApi) => {
  const spacingFromContent = {
    'line-height': toolbarItem.attributes.selectedLineSpacing,
    'padding-top': toolbarItem.attributes.selectedLineSpacingBefore,
    'padding-bottom': toolbarItem.attributes.selectedLineSpacingAfter,
  };
  const currentSpacing = Object.values(spacingFromContent).some(spacing => !spacing)
    ? {}
    : spacingFromContent;

  const spacing = getSpacing(currentSpacing, defaultLineSpacingFromApi);
  return spacing;
};
