// @ts-ignore
const requireAllScssFiles = require.context('./', true, /\.scss$/);
const resolvedThemes = requireAllScssFiles
  .keys()
  .map(key => requireAllScssFiles(key))
  .reduce((prev, curr) => ({ ...prev, ...curr.default }), {});

const modalTheme = {
  content: {},
};

const theme = {
  modalTheme,
  ...resolvedThemes,
};

export default theme;
