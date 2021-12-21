import * as A from 'fp-ts/Array';
import { flow, identity, pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import { extract } from './extract';
import tiptapContent from './__tests__/migrationContentTiptap.json';

describe('JSONContent extract', () => {
  it('should extract all node types from content', () => {
    const actual = pipe(
      extract(tiptapContent)
        .map(({ type }) => type)
        .get(),
      A.uniq(S.Eq)
    );
    const expected = [
      'doc',
      'paragraph',
      'text',
      'image',
      'video',
      'gallery',
      'html',
      'embed',
      'button',
      'divider',
      'codeBlock',
      'gif',
      'map',
      'file',
      'appEmbed',
      'linkPreview',
      'poll',
      'blockquote',
      'orderedList',
      'listItem',
      'bulletedList',
      'heading',
      'collapsibleList',
      'collapsibleItem',
      'collapsibleItemTitle',
      'collapsibleItemBody',
      'table',
      'tableRow',
      'tableCell',
    ];
    expect(actual).toEqual(expected);
  });

  it('should extract all mark types from content', () => {
    const actual = pipe(
      extract(tiptapContent)
        .map(
          flow(
            ({ marks }) => marks || [],
            A.map(({ type }) => type)
          )
        )
        .get(),
      A.chain(identity),
      A.uniq(S.Eq)
    );
    const expected = [
      'bold',
      'fontSize',
      'underline',
      'italic',
      'link',
      'spoiler',
      'mention',
      'color',
      'anchor',
    ];
    expect(actual).toEqual(expected);
  });
});
