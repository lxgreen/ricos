import { flow, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import { readFileSync, writeFileSync } from 'fs';
import type { RichContent } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import parse from './parser';
import { tap } from '../../../../fp-utils';
import { toDraft } from '../../../draft/toDraft/toDraft';
import { extract } from '../../../../RicosContentAPI/extract';
import type { DraftContent } from '../../../../types/contentTypes';

const loadFile = (filename: string) =>
  readFileSync(`${__dirname}/../__tests__/${filename}`, 'utf8');
const _writeFile = (fileName: string) =>
  tap((data: RichContent | DraftContent) => writeFileSync(fileName, JSON.stringify(data), 'utf8'));

describe('CKEditor parser', () => {
  const html = loadFile('FAQContent.html');
  const content = parse(html);
  it('iframe => video with youtube url', async () => {
    const videos = extract(content.nodes)
      .filter(({ type }) => type === Node_Type.VIDEO)
      .get();
    expect(videos.length).toEqual(1);
    expect(videos[0].videoData?.video?.src?.url).toEqual(
      'https://www.youtube.com/watch?v=4meDcOLeWSs'
    );
  });

  it('<a><img></a> => image with link', async () => {
    const images = extract(content.nodes)
      .filter(({ type }) => type === Node_Type.IMAGE)
      .get();
    expect(images.length).toEqual(5);
    expect(images[0].imageData?.image?.src?.url).toEqual(
      'https://static.wixstatic.com/media/23a20f14fc6d489d91b14aaa3033cd30.jpg'
    );
    expect(images[0].imageData?.link?.url).toEqual('javascript:void(0)'); // eslint-disable-line no-script-url
    expect(images[0].imageData?.link?.customData).toEqual(
      JSON.stringify({ type: 'pageLink', id: 'eihsd' })
    );
  });

  it('should output valid content for toDraft', () => {
    const failedContent = pipe(
      'migration-failures.json',
      loadFile,
      JSON.parse,
      // a => [a[0]],
      A.map(
        flow(
          parse,
          // _writeFile('faq-rich.json'),
          toDraft
          //, _writeFile('faq-draft.json')
        )
      )
    );
    expect(failedContent.length).toEqual(172);
  });
});
