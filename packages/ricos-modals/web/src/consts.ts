import type { Placement, Layout } from 'ricos-types';

export const PLACEMENTS: Record<string, Placement> = {
  TOP_START: 'top-start',
  TOP: 'top',
  TOP_END: 'top-end',
  RIGHT_START: 'right-start',
  RIGHT: 'right',
  RIGHT_END: 'right-start',
  BOTTOM_START: 'bottom-start',
  BOTTOM: 'bottom',
  BOTTOM_END: 'bottom-end',
  LEFT_START: 'left-start',
  LEFT: 'left',
  LEFT_END: 'left-end',
};

export const LAYOUTS: Record<string, Layout> = {
  POPOVER: 'popover',
  DRAWER: 'drawer',
  DIALOG: 'dialog',
  FULLSCREEN: 'fullscreen',
};
