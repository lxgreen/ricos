import { Decoration_Type } from 'ricos-schema';
import type { CommandDescriptor } from '../../models/command';
import type { EditableParagraph } from '../nodes/editable-paragraph';

export const setBold: CommandDescriptor = {
  name: 'setBold',
  execute:
    ({ model }) =>
    () =>
      model
        .filter((n: EditableParagraph) => n.getSelection())
        .modify((n: EditableParagraph) =>
          n.setDecoration({ type: Decoration_Type.BOLD, fontWeightValue: 700 })
        ),
};

export const unsetBold: CommandDescriptor = {
  name: 'unsetBold',
  execute:
    ({ model }) =>
    () =>
      model
        .filter((n: EditableParagraph) => n.getSelection())
        .modify((n: EditableParagraph) =>
          n.unsetDecoration({ type: Decoration_Type.BOLD, fontWeightValue: 700 })
        ),
};
