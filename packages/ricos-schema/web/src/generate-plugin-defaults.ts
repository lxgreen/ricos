/*
 * This script generates the empty RichContent object and writes specific plugin portions to dedicated json files
 * residing in ricos-schema/dist/statics/. These files then define tiptap schemas for RicosExtensions.
 */
import * as E from 'fp-ts/Either';
import * as T from 'fp-ts/Tuple';
import * as A from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { identity, flow, pipe } from 'fp-ts/function';

import { mkdirSync, writeFileSync, copySync } from 'fs-extra';
import { resolve } from 'path';
import {
  RichContent,
  Node,
  Node_Type,
  Decoration_Type,
  LinkData,
} from '../generated/stringEnums/wix/rich_content/v1/';

const pluginDataPropByType = {
  [Node_Type.APP_EMBED]: 'appEmbedData',
  [Node_Type.BUTTON]: 'buttonData',
  [Node_Type.CODE_BLOCK]: 'codeBlockData',
  [Node_Type.DIVIDER]: 'dividerData',
  [Node_Type.EMBED]: 'embedData',
  [Node_Type.FILE]: 'fileData',
  [Node_Type.GALLERY]: 'galleryData',
  [Node_Type.GIF]: 'gifData',
  [Node_Type.HEADING]: 'headingData',
  [Node_Type.HTML]: 'htmlData',
  [Node_Type.IMAGE]: 'imageData',
  [Node_Type.LINK_PREVIEW]: 'linkPreviewData',
  [Node_Type.MAP]: 'mapData',
  [Node_Type.PARAGRAPH]: 'paragraphData',
  [Node_Type.POLL]: 'pollData',
  [Node_Type.TEXT]: 'textData',
  [Node_Type.VIDEO]: 'videoData',
};

// defaultContent has to include any non-primitive fields to make tiptap refer nested fields
const containerData = { spoiler: {}, height: {}, width: {} };
const defaultContent = {
  nodes: [
    { type: 'APP_EMBED', appEmbedData: { eventData: {}, bookingData: {} } },
    { type: 'BUTTON', buttonData: { containerData, link: {}, styles: {} } },
    { type: 'CODE_BLOCK', codeBlockData: { textStyle: {} } },
    { type: 'DIVIDER', dividerData: { containerData } },
    { type: 'EMBED', embedData: { containerData, oembed: {} } },
    { type: 'FILE', fileData: { containerData, src: {} } },
    { type: 'GIF', gifData: { containerData } },
    {
      type: 'GALLERY',
      galleryData: {
        containerData,
        options: { item: {}, layout: {}, thumbnails: {} },
      },
    },
    { type: 'HEADING', headingData: { textStyle: {} } },
    { type: 'HTML', htmlData: { containerData } },
    { type: 'IMAGE', imageData: { containerData, image: {}, link: {} } },
    { type: 'LINK_PREVIEW', linkPreviewData: { containerData, link: {} } },
    { type: 'MAP', mapData: { containerData, mapSettings: {} } },
    { type: 'PARAGRAPH', paragraphData: { textStyle: {} } },
    {
      type: 'POLL',
      pollData: { containerData, design: {}, layout: {}, poll: {} },
    },
    { type: 'TEXT', textData: {} },
    { type: 'VIDEO', videoData: { containerData, thumbnail: {}, video: {} } },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringify = (replacer: (key: string, value: any) => any, space = 0) => <A>(
  a: A
): E.Either<unknown, string> =>
  E.tryCatch(() => {
    const s = JSON.stringify(a, replacer, space);
    if (typeof s !== 'string') {
      throw new Error('Converting unsupported structure to JSON');
    }
    return s;
  }, identity);

const writeStaticsEntry = ([type, defaults]) => {
  const entryPath = resolve(__dirname, '..', 'statics', `${type}.defaults.json`);
  writeFileSync(entryPath, defaults, { encoding: 'utf8', flag: 'w+' });
};

const toNodes = (content: RichContent) => content.nodes;
const toPluginDataTuple = (n: Node): [string, unknown] => [n.type, n[pluginDataPropByType[n.type]]];
const nullReplacer = (_: string, value: unknown) => (typeof value === 'undefined' ? null : value);

const generatePluginDefaults = flow(
  RichContent.fromJSON, // content with default values
  toNodes, // map nodes
  A.map(
    flow(
      toPluginDataTuple, // [TYPE, pluginData]
      T.bimap(
        // [TYPE, pluginData] => [type, "pluginData"]
        flow(
          stringify(nullReplacer),
          E.fold(() => 'data stringify error', identity)
        ),
        S.toLowerCase
      ),
      writeStaticsEntry // write to /statics/type.defaults.json
    )
  )
);

const toDecorationDataDefaults = <T>(fromJSON: () => T) =>
  pipe(
    fromJSON(),
    flow(
      stringify(nullReplacer),
      E.fold(() => 'data stringify error', identity)
    )
  );

const generateDecorationDefaults = () =>
  pipe(
    {
      [Decoration_Type.LINK]: () => ({
        linkData: LinkData.fromJSON({ link: { url: '', anchor: '', rel: {} } }),
      }),
    },
    Object.entries,
    A.map(flow(T.bimap(toDecorationDataDefaults, S.toLowerCase), writeStaticsEntry))
  );

mkdirSync('statics', { recursive: true });
generatePluginDefaults(defaultContent);
generateDecorationDefaults();
copySync(resolve(__dirname, '..', 'statics'), resolve(__dirname, '..', 'dist', 'statics'));
