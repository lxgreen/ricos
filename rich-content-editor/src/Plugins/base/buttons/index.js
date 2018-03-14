import BlockLinkButton from './BlockLinkButton';
import createBlockButton from './utils/createBlockButton';
import createBlockAlignmentAndSizeButton from './utils/createBlockAlignmentAndSizeButton';
import SizeOriginalIcon from '../icons/size-original.svg';
import SizeSmallCenterIcon from '../icons/size-small-center.svg';
import SizeSmallLeftIcon from '../icons/size-small-left.svg';
import SizeSmallRightIcon from '../icons/size-small-right.svg';
import SizeContentIcon from '../icons/size-best-fit.svg';
import SizeFullWidthIcon from '../icons/size-full-width.svg';
import DeleteIcon from '../icons/trash.svg';

export const BUTTONS = {
  FILES: 'file',
  TOGGLE: 'toggle',
  PANEL: 'panel',
  EXTERNAL_MODAL: 'external-modal',
  DROPDOWN: 'dropdown',
  SEPARATOR: 'separator',
  SIZE_ORIGINAL: 'size-original',
  SIZE_SMALL_CENTER: 'size-small-center',
  SIZE_SMALL_LEFT: 'size-small-left',
  SIZE_SMALL_RIGHT: 'size-small-right',
  SIZE_CONTENT: 'size-content',
  SIZE_FULL_WIDTH: 'size-full-width',
  LINK: 'link',
  DELETE: 'delete',
};

export { BlockLinkButton };

export const SizeOriginalButton = createBlockAlignmentAndSizeButton({
  size: 'original',
  alignment: 'left',
  Icon: SizeOriginalIcon,
  tooltipTextKey: 'SizeOriginalButton_Tooltip',
});

export const SizeSmallCenterButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'center',
  Icon: SizeSmallCenterIcon,
  tooltipTextKey: 'SizeSmallCenterButton_Tooltip',
});

export const SizeSmallLeftButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'left',
  Icon: SizeSmallLeftIcon,
  tooltipTextKey: 'SizeSmallLeftButton_Tooltip',
});

export const SizeSmallRightButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'right',
  Icon: SizeSmallRightIcon,
  tooltipTextKey: 'SizeSmallRightButton_Tooltip',
});

export const SizeContentButton = createBlockAlignmentAndSizeButton({
  size: 'content',
  alignment: 'center',
  Icon: SizeContentIcon,
  tooltipTextKey: 'SizeContentButton_Tooltip',
});

export const SizeFullWidthButton = createBlockAlignmentAndSizeButton({
  size: 'fullWidth',
  alignment: 'center',
  Icon: SizeFullWidthIcon,
  tooltipTextKey: 'SizeFullWidthButton_Tooltip',
});

export const DeleteButton = createBlockButton({
  Icon: DeleteIcon,
  tooltipTextKey: 'DeleteButton_Tooltip',
});

export default {
  [BUTTONS.SIZE_ORIGINAL]: SizeOriginalButton,
  [BUTTONS.SIZE_SMALL_CENTER]: SizeSmallCenterButton,
  [BUTTONS.SIZE_SMALL_LEFT]: SizeSmallLeftButton,
  [BUTTONS.SIZE_SMALL_RIGHT]: SizeSmallRightButton,
  [BUTTONS.SIZE_CONTENT]: SizeContentButton,
  [BUTTONS.SIZE_FULL_WIDTH]: SizeFullWidthButton,
  [BUTTONS.LINK]: BlockLinkButton,
  [BUTTONS.DELETE]: DeleteButton,
};
