import type { ComponentType } from 'react';
import type { KeyboardShortcut } from './shortcuts';

type Group = 'popover' | 'drawer' | 'dialog' | 'fullscreen';
export type Placement =
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';

type ModalPositioning = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  referenceElement?: any;
  placement?: Placement;
};

export type ModalConfig = {
  Component: ComponentType;
  id: string;
  groups: Group[];
  positioning?: ModalPositioning;
  shortcuts?: KeyboardShortcut[];
};
