import {
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from '../../../icons';
import { getLangDir } from 'wix-rich-content-common';

export const getDefaultAlignment = locale => {
  const langDir = getLangDir(locale);
  return langDir === 'rtl' ? 'right' : 'left';
};

export const alignmentMap = {
  left: AlignLeftIcon,
  center: AlignTextCenterIcon,
  right: AlignRightIcon,
  justify: AlignJustifyIcon,
};
