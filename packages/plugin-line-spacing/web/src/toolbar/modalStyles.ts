const PANEL_WIDTH = 216;
const PANEL_HEIGHT = 116;
export const MODAL_STYLES = {
  desktop: {
    content: {
      display: 'inline-table',
      minHeight: PANEL_HEIGHT,
      height: 'auto',
      position: 'absolute',
      borderRadius: 6,
      border: 'solid 1px #ededed',
      margin: 0,
      minWidth: PANEL_WIDTH,
      maxWidth: 360,
      width: 'auto',
      transform: 'unset',
    },
    overlay: {
      background: 'transparent',
    },
  },
  mobile: {
    content: {
      display: 'inline-table',
      position: 'absolute',
      borderRadius: 'var(--ricos-settings-whitebox-border-radius, 0px)',
      boxShadow: 'var(--ricos-settings-whitebox-box-shadow)',
      margin: 0,
      bottom: 0,
      top: 'unset',
      transform: 'unset',
      width: '100%',
    },
    overlay: {
      background: 'transparent',
    },
  },
};
