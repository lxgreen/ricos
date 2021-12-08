import { render } from '@testing-library/react';
import { Editor, EditorOptions, JSONContent } from '@tiptap/react';
import { compact } from 'lodash';
import React from 'react';
import { compare } from 'ricos-content/lib/comparision';
import { RichContent } from 'ricos-schema';
import { pluginDivider } from 'wix-rich-content-plugin-divider';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { fromTiptap, toTiptap } from 'wix-tiptap-extensions';
import { pluginLink } from 'wix-rich-content-plugin-link';
import supportedPluginsContent from '../../__tests__/supportedPluginsContent.json';
import { RicosTiptapEditor } from './RicosTiptapEditor';
import { TiptapEditorPlugin } from 'ricos-tiptap-types';

let editor: Editor | null = null;

jest.mock('@tiptap/react', () => {
  const { Editor, ...tiptapReact } = jest.requireActual('@tiptap/react');
  function MockEditor(options: EditorOptions) {
    editor = new Editor(options);
    return editor;
  }
  return {
    ...tiptapReact,
    Editor: MockEditor,
  };
});

describe('tiptap editor', () => {
  it('should not change content', async () => {
    const content = toTiptap(RichContent.fromJSON(supportedPluginsContent));
    const plugins = [pluginImage(), pluginDivider(), pluginLink()];
    const extensions =
      compact(plugins?.flatMap((plugin: TiptapEditorPlugin) => plugin.tiptapExtensions)) || [];
    render(<RicosTiptapEditor content={content} extensions={extensions} t={() => ''} />);
    const newContent = editor?.getJSON();
    const richContent = fromTiptap(newContent as JSONContent);
    expect(compare(richContent, supportedPluginsContent, { verbose: true })).toEqual({});
  });
});
