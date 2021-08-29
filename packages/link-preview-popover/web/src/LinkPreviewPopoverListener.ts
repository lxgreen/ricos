/* eslint-disable @typescript-eslint/no-explicit-any */
export default function addLinkPreviewPopoverListener(container, callback) {
  const onLinkHover = (linkNode: any) => {
    const url = linkNode.href;
    const linkNodeRect = linkNode.getBoundingClientRect();
    const position = { top: linkNodeRect.top + linkNodeRect.height + 4, left: linkNodeRect.left };
    callback(url, position);
  };

  const onStopLinkHover = () => callback(undefined);

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
