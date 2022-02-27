/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CommandDescriptor } from 'ricos-types';

const decoration = { type: 'SPOILER' };

export const setSpoiler: CommandDescriptor = {
  name: 'setSpoiler',
  execute:
    ({ model }) =>
    () =>
      model.filter(n => n.getSelection()).modify(n => (n as any).setDecoration(decoration)),
};

export const unsetSpoiler: CommandDescriptor = {
  name: 'unsetSpoiler',
  execute:
    ({ model }) =>
    () =>
      model.filter(n => n.getSelection()).modify(n => (n as any).unsetDecoration(decoration)),
};

export const toggleSpoiler: CommandDescriptor = {
  name: 'toggleSpoiler',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: any) =>
          n
            .getNodes()
            .asArray()
            .some(node =>
              node
                .getData()
                .decorations.some(currDecoration => currDecoration.type === decoration.type)
            )
            ? n.unsetDecoration(decoration)
            : n.setDecoration(decoration)
        ),
};
