import { cloneDeep, merge } from 'lodash';
import { RichContent } from 'ricos-schema';
import { v4 as uuid } from 'uuid';

type Duplicate = (content: RichContent) => RichContent;

export const duplicate: Duplicate = content =>
  merge(cloneDeep(content), { metadata: { id: uuid() } });
