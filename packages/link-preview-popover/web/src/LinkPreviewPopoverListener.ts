import { Position } from './types';

type Callback = (url: string, position?: Position) => void;

export default function addLinkPreviewPopoverListener(container: HTMLElement, callback: Callback) {
  const onLinkHover = (linkNode: HTMLLinkElement) => {
    const url = linkNode.href;
    const linkNodeRect = linkNode.getBoundingClientRect();
    const position: Position = {
      top: linkNodeRect.top + linkNodeRect.height + 4,
      left: linkNodeRect.left,
    };
    callback(url, position);
  };

  const onStopLinkHover = () => callback('');

  const handleMouseOver = event => {
    switch (event.target.tagName) {
      case 'A':
      case 'U':
        return onLinkHover(event.target.closest('a'));
      default:
        return onStopLinkHover();
    }
  };

  container.addEventListener('mouseover', handleMouseOver);

  return () => {
    container.removeEventListener('mouseover', handleMouseOver);
  };
}
