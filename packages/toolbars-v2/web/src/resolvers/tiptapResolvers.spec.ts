import { alwaysVisible, isTextInSelection } from './tiptapResolvers';

describe('tiptap editor resolvers', () => {
  it('test alwaysVisible resolver - should always return true', () => {
    expect(alwaysVisible()).toBeTruthy();
  });

  it('test isTextInSelection resolver - should check if the selection contains text', () => {
    const mockContentWhenTextIsInSelection = [{ type: { name: 'text' } }];

    expect(isTextInSelection.resolve(mockContentWhenTextIsInSelection)).toBeTruthy();

    const mockContentWhenTextIsNotInSelection = [{ type: { name: 'image' } }];
    expect(isTextInSelection.resolve(mockContentWhenTextIsNotInSelection)).toBeFalsy();
  });
});
