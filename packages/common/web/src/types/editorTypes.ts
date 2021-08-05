import { ComponentData, BICallbacks } from '.';
import { CSSProperties } from 'react';
import { EditorState } from 'draft-js';
import { OnPluginAction } from './pluginsBiCallbacksTypes';
import {
  UpdateEntityFunc,
  ImageComponentData,
  VideoComponentData,
  FileComponentData,
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
  onPluginAdd?(pluginId: string, entryPoint: string, version?: string): void;
  onPluginAddSuccess?(pluginId: string, entryPoint: string, params, version?: string): void;
  isPreview?: () => boolean;
  onPluginAction?: OnPluginAction;
}

export type OnErrorFunction = (error: string) => void;

export type CustomStyleFn = (styles: CSSProperties) => CSSProperties;

export type TextToolbarType = 'inline' | 'static';

export type SetEditorState = (editorState: EditorState) => void;
export type GetEditorState = () => EditorState;

export interface Header {
  'font-size'?: number;
  color?: string;
}

export const DOC_STYLE_CLASSES = {
  headerOne: 'rich_content_H1',
  headerTwo: 'rich_content_H2',
  headerThree: 'rich_content_H3',
  headerFour: 'rich_content_H4',
  headerFive: 'rich_content_H5',
  headerSix: 'rich_content_H6',
  paragraph: 'rich_content_P',
};

export const DRAFT_TO_RICOS_DOC_TYPE = {
  'header-one': 'headerOne',
  'header-two': 'headerTwo',
  'header-three': 'headerThree',
  'header-four': 'headerFour',
  'header-five': 'headerFive',
  'header-six': 'headerSix',
  unstyled: 'paragraph',
};

export interface DocStyle {
  headerOne?: Header;
  headerTwo?: Header;
  headerThree?: Header;
  headerFour?: Header;
  headerFive?: Header;
  headerSix?: Header;
  paragraph?: Header;
}
