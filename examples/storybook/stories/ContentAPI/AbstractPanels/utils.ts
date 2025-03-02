import { merge } from 'lodash';

export const createAbstractPanelSetter =
  <T>(obj: T, setter: (obj: T) => void) =>
  (newObj: Partial<T>) =>
    setter(merge({ ...obj }, newObj));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareForDropdown = (arr: any[]) =>
  arr.map((value, id) => ({
    id,
    value,
  }));

export const alignments = ['LEFT', 'RIGHT', 'CENTER'];
export const alignmentOptions = prepareForDropdown(alignments);

export const dividerTypes = ['SINGLE', 'DOUBLE', 'DASHED', 'DOTTED'];
export const dividerTypesOptions = prepareForDropdown(dividerTypes);

export const dividerWidth = ['LARGE', 'MEDIUM', 'SMALL'];
export const dividerWidthOptions = prepareForDropdown(dividerWidth);

export const buttonTypes = ['LINK', 'ACTION'];
export const buttonTypesOptions = prepareForDropdown(buttonTypes);
