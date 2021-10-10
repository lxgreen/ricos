import { ModalStyles } from 'wix-rich-content-common';
// export const HEADER_TYPE_MAP = {
//   H1: 'header-one',
//   H2: 'header-two',
//   H3: 'header-three',
//   H4: 'header-four',
//   H5: 'header-five',
//   H6: 'header-six',
//   P: 'unstyled',
// };

// export const DEFAULT_HEADERS_DROPDOWN_OPTIONS = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

// export const PLUGIN_DECORATIONS = Object.freeze({
//   RESIZEABLE: 'RESIZEABLE',
// });

// export const PLUGIN_DECORATION_PROPS = Object.freeze({
//   [PLUGIN_DECORATIONS.RESIZEABLE]: props => ({
//     onMouseDown: props.onMouseDown,
//     onMouseMove: props.onMouseMove,
//     onMouseLeave: props.onMouseLeave,
//     style: props.style,
//     width: props.width,
//     containerClassName: props.containerClassName,
//   }),
// });

// export const TOOLBAR_OFFSETS = Object.freeze({
//   top: 12,
//   left: 15,
// });

export const FOOTER_BUTTON_ALIGNMENT = Object.freeze({
  CENTER: 'center',
  END: 'end',
});

export const MODAL_CONTROLS_POSITION = Object.freeze({
  TOP: 'top',
  BOTTOM: 'bottom',
});

export const KEYS_CHARCODE = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
};

export const BUTTON_SIZE = {
  tiny: 'tiny',
  small: 'small',
  medium: 'medium',
  large: 'large',
};

// eslint-disable-next-line no-duplicate-imports
export {
  // ModifierKey as MODIFIERS,
  // ToolbarType as TOOLBARS,
  // DisplayMode as DISPLAY_MODE,
  DecorationMode as DECORATION_MODE,
} from 'wix-rich-content-common';

// export const UNSUPPORTED_BLOCKS_TYPE = 'unsupported-blocks';

export const DesktopFlyOutModalStyles: ModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: 360,
    boxSizing: 'border-box',
    minHeight: 165,
    maxHeight: 230,
    height: 'max-content',
    overflow: 'visible',
    border: 'solid 1px rgba(51, 51, 51, 0.1)',
    display: 'block',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 6,
    padding: 20,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.06)',
  },
});

export const MOBILE_FULL_SCREEN_CUSTOM_STYLE: ModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    alignItems: 'center',
    display: 'flex',
    width: '100vw',
    justifyContent: 'center',
  },
});

export const DesktopOverlayModalStyles: ModalStyles = Object.freeze({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
