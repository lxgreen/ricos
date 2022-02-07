/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
  isTextContainsQuoteResolver,
  isTextContainsCodeblockResolver,
  isTextContainsOrderedListResolver,
  isTextContainsUnorderedListResolver,
  isTextContainsSpoilerResolver,
} from './draftResolvers';
import { EditorState } from '@wix/draft-js';

let editorState;

describe('draft resolvers', () => {
  beforeEach(() => {
    editorState = EditorState.createEmpty();
  });
  describe('alwaysVisible', () => {
    it('should always return true', () => {
      expect(alwaysVisibleResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsBold', () => {
    it('should return true if selected text is bold', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'BOLD') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsBoldResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('BOLD');
    });
  });

  describe('isTextContainsItalicResolver', () => {
    it('should return true if selected text is italic', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'ITALIC') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsItalicResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('ITALIC');
    });
  });

  describe('isTextContainsUnderlineResolver', () => {
    it('should return true if selected text is underline', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'UNDERLINE') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsUnderlineResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('UNDERLINE');
    });
  });

  describe('isTextContainsQuoteResolver', () => {
    it('should return true if selected text is quote', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'blockquote' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsQuoteResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsCodeblockResolver', () => {
    it('should return true if selected text is code block', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'code-block' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsCodeblockResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsOrderedListResolver', () => {
    it('should return true if selected text is ordered list', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'ordered-list-item' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsOrderedListResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsUnorderedListResolver', () => {
    it('should return true if selected text is unordered list', () => {
      const currentContentState = editorState.getCurrentContent();
      const hasMock = jest.fn(_blockKey => {
        const block = { getType: () => 'unordered-list-item' };
        return block;
      });
      currentContentState.getBlockForKey = hasMock;
      expect(isTextContainsUnorderedListResolver.resolve(editorState)).toBe(true);
    });
  });

  describe('isTextContainsSpoilerResolver', () => {
    it('should return true if selected text is with spoiler', () => {
      const currentInlineStyle = editorState.getCurrentInlineStyle();
      const hasMock = jest.fn(style => {
        if (style === 'wix-rich-content-plugin-spoiler') {
          return true;
        }
      });
      currentInlineStyle.has = hasMock;
      expect(isTextContainsSpoilerResolver.resolve(editorState)).toBe(true);
      expect(hasMock).toBeCalledWith('wix-rich-content-plugin-spoiler');
    });
  });
});
