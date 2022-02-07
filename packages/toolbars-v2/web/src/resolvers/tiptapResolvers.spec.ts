/* eslint-disable @typescript-eslint/ban-ts-comment */
import { alwaysVisible, isTextInSelection } from './tiptapResolvers';

describe('tiptap editor resolvers', () => {
  it('test alwaysVisible resolver - should always return true', () => {
    expect(alwaysVisible()).toBeTruthy();
  });

  it('test isTextInSelection resolver - should check if the selection contains text', () => {
    const mockContentWhenTextIsInSelection = [{ type: { name: 'text' } }];
    // @ts-ignore
    expect(isTextInSelection({ content: mockContentWhenTextIsInSelection })).toBeTruthy();

    const mockContentWhenTextIsNotInSelection = [{ type: { name: 'image' } }];
    // @ts-ignore
    expect(isTextInSelection({ content: mockContentWhenTextIsNotInSelection })).toBeFalsy();
  });
});
