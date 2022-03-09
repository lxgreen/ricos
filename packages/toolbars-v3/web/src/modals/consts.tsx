import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from './icons';

export const alignmentsModalData = [
  {
    text: 'AlignTextLeftButton_Tooltip',
    tooltip: 'AlignTextLeftButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧L)',
      Windows: ' (Ctrl+⇧+L)',
    },
    commandKey: 'left',
    icon: AlignLeftIcon,
    dataHook: 'textAlignmentButton_left',
  },
  {
    text: 'AlignTextCenterButton_Tooltip',
    tooltip: 'AlignTextCenterButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧E)',
      Windows: ' (Ctrl+⇧+E)',
    },
    commandKey: 'center',
    icon: AlignTextCenterIcon,
    dataHook: 'textAlignmentButton_center',
  },
  {
    text: 'AlignTextRightButton_Tooltip',
    tooltip: 'AlignTextRightButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧R)',
      Windows: ' (Ctrl+⇧+R)',
    },
    commandKey: 'right',
    icon: AlignRightIcon,
    dataHook: 'textAlignmentButton_right',
  },
  {
    text: 'AlignTextJustifyButton_Tooltip',
    tooltip: 'AlignTextJustifyButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧J)',
      Windows: ' (Ctrl+⇧+J)',
    },
    commandKey: 'justify',
    icon: AlignJustifyIcon,
    dataHook: 'textAlignmentButton_justify',
  },
];

export const lineSpacingModalData = [
  { text: '1', commandKey: '1' },
  { text: '1.5', commandKey: '1.5' },
  { text: '2', commandKey: '2' },
  { text: '2.5', commandKey: '2.5' },
  { text: '3', commandKey: '3' },
];
