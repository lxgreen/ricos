import type { ComponentType } from 'react';

type Group = 'popover' | 'drawer' | 'dialog' | 'fullscreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalPositioning = { referenceElement: any };

export type ModalConfig = {
  Component: ComponentType;
  id: string;
  groups?: Group[];
  positioning?: ModalPositioning;
};
