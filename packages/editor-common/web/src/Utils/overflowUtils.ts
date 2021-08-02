type ElementCoords = {
  top: number;
  left: number;
};

const getElementCoordsInWindow = (elem: HTMLElement): ElementCoords => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
};

const getWidth = (element: HTMLElement): number => {
  return element.clientWidth;
};

const getHeight = (element: HTMLElement): number => {
  return element.clientHeight;
};

export const isElementOutOfWindow = (element: HTMLElement): boolean | number | undefined => {
  if (element && document) {
    const modalOffset = getElementCoordsInWindow(element).left;
    const modalWidth = getWidth(element);
    const rootEditor = element.closest(
      '[data-hook=root-editor], [data-hook=ricos-editor]'
    ) as HTMLElement;
    const editorOffset = rootEditor && getElementCoordsInWindow(rootEditor).left;
    const editorWidth = (rootEditor && rootEditor.getBoundingClientRect().width) || 999999;
    if (modalWidth + (modalOffset - editorOffset) > editorWidth) {
      return modalWidth + (modalOffset - editorOffset) - editorWidth; // optional: return overflow by
    } else {
      return false;
    }
  } else {
    console.error('window or document not found'); //eslint-disable-line
  }
};

export const isElementOutOfWindowHeight = (element: HTMLElement): boolean | undefined => {
  if (element && document) {
    const modalOffset = getElementCoordsInWindow(element).top;
    const modalHeight = getHeight(element);
    const rootEditor = element.closest(
      '[data-hook=root-editor], [data-hook=ricos-editor]'
    ) as HTMLElement;
    const editorOffset = rootEditor && getElementCoordsInWindow(rootEditor).top;
    const editorHeight = (rootEditor && rootEditor.getBoundingClientRect().height) || 999999;
    if (modalHeight + (modalOffset - editorOffset) > editorHeight) {
      return true;
    } else {
      return false;
    }
  } else {
    console.error('window or document not found'); //eslint-disable-line
  }
};
