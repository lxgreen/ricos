import { RawDraftContentBlock } from 'draft-js';
export type ViewerBlockProps = {
  keys: RawDraftContentBlock['key'][];
  data: ViewerBlockData[];
};

export type ViewerBlockData = RawDraftContentBlock['data'] & {
  interactions?: PreviewInteraction[];
} & {
  dynamicStyles?: Record<string, unknown>;
};

export type PreviewInteraction =
  | {
      type: 'READ_MORE';
      settings: {
        showToggle: boolean;
        lines: number;
      };
    }
  | {
      type: 'SEE_FULL_CONTENT';
      settings: {
        label: string;
      };
    }
  | {
      type: 'IMAGE_COUNTER';
      settings: { counter: number };
    };
