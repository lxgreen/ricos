const modalContentStyles: React.CSSProperties = {
  width: 363,
  padding: 20,
  boxSizing: 'border-box',
  border: 'solid 1px rgba(51, 51, 51, 0.1)',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.06)',
};

export const videoModalContentStyles: React.CSSProperties = {
  height: 232,
  ...modalContentStyles,
};

export const embedModalContentStyles: React.CSSProperties = {
  height: 180,
  ...modalContentStyles,
};
