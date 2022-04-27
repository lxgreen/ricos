import type { Component } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type {
  DraftContent,
  EditorContextType,
  Pubsub,
  ToolbarType,
  EditorCommands,
} from 'ricos-types';

export interface RicosEditorRef extends Component<RicosEditorProps> {
  focus(): void;
  blur(): void;
  getContent(
    postId?: string,
    forPublish?: boolean,
    shouldRemoveErrorBlocks?: boolean
  ): Promise<DraftContent>;
  getContentPromise({
    flush,
    publishId,
  }?: {
    flush?: boolean | undefined;
    publishId?: string | undefined;
  }): Promise<DraftContent>;
  getContentTraits(): {
    isEmpty: boolean;
    isContentChanged: boolean;
    isLastChangeEdit: boolean;
  };
  getToolbarProps(type: ToolbarType): {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buttons: any;
    context: EditorContextType;
    pubsub: Pubsub;
  };
  getEditorCommands(): EditorCommands;
}
