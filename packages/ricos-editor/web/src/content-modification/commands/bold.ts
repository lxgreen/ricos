import { Decoration_Type } from 'ricos-schema';
import type { CommandDescriptor } from '../../models/command';
import type { RicosParagraphNode } from '../nodes/ricos-paragraph-node';

export const setBold: CommandDescriptor = {
  name: 'setBold',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: RicosParagraphNode) =>
          n.setDecoration({ type: Decoration_Type.BOLD, fontWeightValue: 700 })
        ),
};

export const unsetBold: CommandDescriptor = {
  name: 'unsetBold',
  execute:
    ({ model }) =>
    () =>
      model
        .filter(n => n.getSelection())
        .modify((n: RicosParagraphNode) =>
          n.unsetDecoration({ type: Decoration_Type.BOLD, fontWeightValue: 700 })
        ),
};
