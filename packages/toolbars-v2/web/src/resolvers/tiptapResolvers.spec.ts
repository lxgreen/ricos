/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Node as TiptapNode } from 'prosemirror-model';
import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextInSelection,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
} from './tiptapResolvers';

describe('tiptap resolvers', () => {
  describe('alwaysVisibleResolver', () => {
    it('should always return true', () => {
      // @ts-ignore
      const mockContent: TiptapNode[] = [{ type: 'paragraph' }];
      expect(alwaysVisibleResolver.resolve(mockContent)).toBe(true);
    });
  });

  describe('isTextContainsBold', () => {
    it('should return true if selected text is bold', () => {
      const mockContentWithBold: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'bold' } }], text: 'World' },
      ];
      expect(isTextContainsBoldResolver.resolve(mockContentWithBold)).toBe(true);
    });

    it('should return false if selected text is not bold', () => {
      const mockContentWithoutBold: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'underline' } }], text: 'World' },
      ];
      expect(isTextContainsBoldResolver.resolve(mockContentWithoutBold)).toBe(false);
    });
  });

  describe('isTextContainsItalicResolver', () => {
    it('should return true if selected text is italic', () => {
      const mockContentWithItalic: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'italic' } }], text: 'World' },
      ];
      expect(isTextContainsItalicResolver.resolve(mockContentWithItalic)).toBe(true);
    });

    it('should return false if selected text is not italic', () => {
      const mockContentWithoutItalic: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'bold' } }], text: 'World' },
      ];
      expect(isTextContainsItalicResolver.resolve(mockContentWithoutItalic)).toBe(false);
    });
  });

  describe('isTextContainsUnderlineResolver', () => {
    it('should return true if selected text is underline', () => {
      const mockContentWithUnderline: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'underline' } }], text: 'World' },
      ];
      expect(isTextContainsUnderlineResolver.resolve(mockContentWithUnderline)).toBe(true);
    });

    it('should return false if selected text is not underline', () => {
      const mockContentWithoutUnderline: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'italic' } }], text: 'World' },
      ];
      expect(isTextContainsUnderlineResolver.resolve(mockContentWithoutUnderline)).toBe(false);
    });
  });
});
