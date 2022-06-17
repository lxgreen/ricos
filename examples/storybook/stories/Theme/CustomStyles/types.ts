import type { RicosCustomStyles } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleAttr = [keyof CustomStyles | undefined, string, string];
export type CustomStyles = {
  [key in keyof Required<RicosCustomStyles>]: string[];
};
