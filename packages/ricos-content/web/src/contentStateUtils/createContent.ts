// Starting in Webpack 5, named imports from JSON files are no longer supported
// https://webpack.js.org/blog/2020-10-10-webpack-5-release/#json-modules
// ------> import { version } from '../../package.json'; // won't work
import packageInfo from '../../package.json';
import { DraftContent } from '../types';

const { version } = packageInfo;

type BlockType =
  | 'unstyled'
  | 'blockquote'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six';

export const createContent = (text: string, type: BlockType = 'unstyled'): DraftContent => {
  return {
    blocks: [
      {
        key: 'd79aa',
        text,
        type,
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
    VERSION: version,
  };
};
