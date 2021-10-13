import { setupContentBuilder } from '../RicosContentAPI/RicosContentBuilder';
import { generateId } from '../converters/generateRandomId';
import { flow } from 'lodash';
import { pipe } from 'fp-ts/function';
import { applyContent, emptyContent } from './consts';
import { RichContent } from 'ricos-schema';
import { ContentBuilderAdapter } from './types';
import { ContentBuilder } from '../types';
import { addImage } from './addImage';

const extractBuilderMethods: (
  builder: ReturnType<typeof setupContentBuilder>
) => ContentBuilder = ({ RicosContentBuilder: _, ...rest }) => rest;

const applyBuilderPattern: (
  content: RichContent
) => (methods: ContentBuilder) => ContentBuilderAdapter = content => methods =>
  Object.entries(methods).reduce(
    (prev, [key, func]: [string, (arg) => RichContent]) => ({
      ...prev,
      [key]: arg => createBuilder(func({ ...arg, content })),
    }),
    {} as ContentBuilderAdapter
  );

export function createBuilder(content: RichContent = emptyContent): ContentBuilderAdapter {
  const originalMethods = pipe(generateId, setupContentBuilder, extractBuilderMethods);
  const adapterMethods = pipe(originalMethods, applyBuilderPattern(content));
  return {
    ...adapterMethods,
    addImage: flow(addImage, applyContent(content), originalMethods.addImage, createBuilder),
    get: () => content,
  };
}
