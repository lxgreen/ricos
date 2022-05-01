/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Node as TiptapNode } from 'prosemirror-model';
import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextInSelection,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
  isTextContainsQuoteResolver,
  isTextContainsCodeblockResolver,
  isTextContainsOrderedListResolver,
  isTextContainsUnorderedListResolver,
  isTextContainsSpoilerResolver,
  isImageSelected,
  isVideoSelected,
  isGallerySelected,
  isDividerSelected,
  isVerticalEmbedSelected,
  isSocialEmbedSelected,
  isMapSelected,
  isGifSelected,
  isTableSelected,
  isCollapsibleListSelected,
  isButtonSelected,
  isPollsSelected,
  isHtmlEmbedSelected,
  isAudioSelected,
  isFileSelected,
} from './tiptapResolvers';

import toCamelCase from 'to-camel-case';
import { Node_Type } from 'wix-rich-content-common';
import type { TiptapContentResolver } from '../ContentResolver';

const pluginSelectedResolvers = {
  [Node_Type.IMAGE]: isImageSelected,
  [Node_Type.VIDEO]: isVideoSelected,
  [Node_Type.GALLERY]: isGallerySelected,
  [Node_Type.FILE]: isFileSelected,
  [Node_Type.AUDIO]: isAudioSelected,
  [Node_Type.HTML]: isHtmlEmbedSelected,
  [Node_Type.POLL]: isPollsSelected,
  [Node_Type.BUTTON]: isButtonSelected,
  [Node_Type.COLLAPSIBLE_LIST]: isCollapsibleListSelected,
  [Node_Type.TABLE]: isTableSelected,
  [Node_Type.GIF]: isGifSelected,
  [Node_Type.MAP]: isMapSelected,
  [Node_Type.EMBED]: isSocialEmbedSelected,
  [Node_Type.APP_EMBED]: isVerticalEmbedSelected,
  [Node_Type.DIVIDER]: isDividerSelected,
};

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

  describe('isTextContainsQuoteResolver', () => {
    it('should return true if selected text is quote', () => {
      // @ts-ignore
      const mockContent: TiptapNode[] = [{ type: { name: 'blockquote' } }];
      expect(isTextContainsQuoteResolver.resolve(mockContent)).toBe(true);
    });

    it('should return false if selected text is not quote', () => {
      // @ts-ignore
      const mockContentWithoutGif: TiptapNode[] = [{ type: { name: 'text' } }];
      expect(isTextContainsQuoteResolver.resolve(mockContentWithoutGif)).toBe(false);
    });
  });

  describe('isTextContainsCodeblockResolver', () => {
    it('should return true if selected text is code block', () => {
      // @ts-ignore
      const mockContent: TiptapNode[] = [{ type: { name: 'codeBlock' } }];
      expect(isTextContainsCodeblockResolver.resolve(mockContent)).toBe(true);
    });

    it('should return false if selected text is not code block', () => {
      // @ts-ignore
      const mockContentWithoutGif: TiptapNode[] = [{ type: { name: 'text' } }];
      expect(isTextContainsCodeblockResolver.resolve(mockContentWithoutGif)).toBe(false);
    });
  });

  describe('isTextContainsOrderedListResolver', () => {
    it('should return true if selected text is ordered list', () => {
      // @ts-ignore
      const mockContent: TiptapNode[] = [{ type: { name: 'orderedList' } }];
      expect(isTextContainsOrderedListResolver.resolve(mockContent)).toBe(true);
    });

    it('should return false if selected text is not ordered list', () => {
      // @ts-ignore
      const mockContentWithoutGif: TiptapNode[] = [{ type: { name: 'text' } }];
      expect(isTextContainsOrderedListResolver.resolve(mockContentWithoutGif)).toBe(false);
    });
  });

  describe('isTextContainsUnorderedListResolver', () => {
    it('should return true if selected text is unordered list', () => {
      // @ts-ignore
      const mockContent: TiptapNode[] = [{ type: { name: 'bulletedList' } }];
      expect(isTextContainsUnorderedListResolver.resolve(mockContent)).toBe(true);
    });

    it('should return false if selected text is not unordered list', () => {
      // @ts-ignore
      const mockContentWithoutGif: TiptapNode[] = [{ type: { name: 'text' } }];
      expect(isTextContainsUnorderedListResolver.resolve(mockContentWithoutGif)).toBe(false);
    });
  });

  describe('isTextContainsSpoilerResolver', () => {
    it('should return true if selected text is spoiler', () => {
      const mockContent: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'spoiler' } }], text: 'World' },
      ];
      expect(isTextContainsSpoilerResolver.resolve(mockContent)).toBe(true);
    });

    it('should return false if selected text is not spoiler', () => {
      const mockContent: TiptapNode[] = [
        // @ts-ignore
        { type: { name: 'text' }, marks: [{ type: { name: 'italic' } }], text: 'World' },
      ];
      expect(isTextContainsSpoilerResolver.resolve(mockContent)).toBe(false);
    });
  });

  describe('Plugin Selected Resolvers', () => {
    Object.entries(pluginSelectedResolvers).forEach(
      ([type, isPluginSelectedResolver]: [Node_Type, TiptapContentResolver]) => {
        const tiptapPluginType = toCamelCase(type);
        it(`should return true if ${tiptapPluginType} is selected`, () => {
          const mockContentWithPlugin: TiptapNode[] = [
            // @ts-ignore
            { type: { name: tiptapPluginType } },
          ];
          expect(isPluginSelectedResolver.resolve(mockContentWithPlugin)).toBe(true);
        });

        it(`should return false if ${tiptapPluginType} is not selected`, () => {
          // @ts-ignore
          const mockContentWithoutPlugin: TiptapNode[] = [{ type: { name: 'text' } }];
          expect(isPluginSelectedResolver.resolve(mockContentWithoutPlugin)).toBe(false);
        });
      }
    );
  });
});
