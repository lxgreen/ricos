import { TiptapContentResolver } from '../ContentResolver';

export const alwaysVisible = () => true;

export const isTextInSelection = TiptapContentResolver.create(
  'isTextInSelection',
  (content = []) => {
    return content.some(node => node.type.name === 'text');
  }
);
