function minMax(value = 0, min = 0, max = 0): number {
  return Math.min(Math.max(value, min), max);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const posToDOMRect = (view: any, from: number, to: number): DOMRect => {
  const minPos = 0;
  const maxPos = view.state.doc.content.size;
  const resolvedFrom = minMax(from, minPos, maxPos);
  const resolvedEnd = minMax(to, minPos, maxPos);
  const start = view.coordsAtPos(resolvedFrom);
  const end = view.coordsAtPos(resolvedEnd, -1);
  const top = Math.min(start.top, end.top);
  const bottom = Math.max(start.bottom, end.bottom);
  const left = Math.min(start.left, end.left);
  const right = Math.max(start.right, end.right);
  const width = right - left;
  const height = bottom - top;
  const x = left;
  const y = top;
  const data = {
    top,
    bottom,
    left,
    right,
    width,
    height,
    x,
    y,
  };

  return {
    ...data,
    toJSON: () => data,
  };
};
