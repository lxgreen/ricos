import { ComponentData, BICallbacks } from '.';
import { CSSProperties } from 'react';
import { EditorState } from 'draft-js';
import { OnPluginAction } from './pluginsBiCallbacksTypes';
import {
  UpdateEntityFunc,
  ImageComponentData,
  VideoComponentData,
  FileComponentData,
  HEADER_BLOCK,
} from 'ricos-content';
export interface Helpers extends BICallbacksForHelpers {
  openModal?: (modalProps: Record<string, unknown>) => void;
  closeModal?: () => void;
  handleFileUpload?: (
    file: File,
    updateEntity: UpdateEntityFunc<ImageComponentData | VideoComponentData | FileComponentData>
  ) => void;
  handleFileSelection?: (
    index: number | undefined,
    multiple: boolean,
    updateEntity: UpdateEntityFunc<ImageComponentData[]>,
    removeEntity?: undefined,
    componentData?: ComponentData
  ) => void;
  onVideoSelected?: (
    url: string,
    updateEntity: (metadata: Record<string, unknown>) => void
  ) => void;
  getImageUrl?: ({ file_name }: { file_name: string }) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: ((...args: any[]) => any) | undefined;
}
interface BICallbacksForHelpers extends BICallbacks {
  // makes version optional
  onPluginAdd?(pluginId: string, entryPoint: string, version?: string, contentId?: string): void;
  onPluginAddSuccess?(
    pluginId: string,
    entryPoint: string,
    params,
    version?: string,
    contentId?: string
  ): void;
  isPreview?: () => boolean;
  onPluginAction?: OnPluginAction;
}

export type OnErrorFunction = (error: string) => void;

export type CustomStyleFn = (styles: CSSProperties) => CSSProperties;

export type TextToolbarType = 'inline' | 'static';

export type SetEditorState = (editorState: EditorState) => void;
export type GetEditorState = () => EditorState;

export interface EditorStyleClasses {
  editorClassName?: string;
  containerClassName?: string;
}

export const DROPDOWN_OPTIONS_TO_DOC_STYLE_TYPE = {
  P: 'paragraph',
  H1: 'headerOne',
  H2: 'headerTwo',
  H3: 'headerThree',
  H4: 'headerFour',
  H5: 'headerFive',
  H6: 'headerSix',
};

export const DRAFT_TO_RICOS_DOC_TYPE = {
  [HEADER_BLOCK.ONE]: 'headerOne',
  [HEADER_BLOCK.TWO]: 'headerTwo',
  [HEADER_BLOCK.THREE]: 'headerThree',
  [HEADER_BLOCK.FOUR]: 'headerFour',
  [HEADER_BLOCK.FIVE]: 'headerFive',
  [HEADER_BLOCK.SIX]: 'headerSix',
  [HEADER_BLOCK.PARAGRAPH]: 'paragraph',
};
