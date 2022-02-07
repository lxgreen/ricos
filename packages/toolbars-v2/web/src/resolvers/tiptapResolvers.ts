import type { Node as TiptapNode } from 'prosemirror-model';

export const alwaysVisible = () => true;

export const isTextInSelection = ({ content }: { content: TiptapNode[] }) => {
  return (
    Array.isArray(content) &&
    content.every(node => node.type.name === 'text' || node.type.name === 'paragraph')
  );
};
