/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
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
});
