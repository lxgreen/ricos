import type { RicosTheme } from 'ricos-common';
import type {
  TranslationFunction,
  AvailableExperiments,
  EditorCommands,
  TextDirection,
  ModalConfig,
} from 'ricos-types';

export type ModalContextValue = {
  ModalService?: IModalService;
  //TODO: move to global context
  isMobile?: boolean;
  theme?: RicosTheme;
  experiments?: AvailableExperiments;
  t: TranslationFunction;
  getEditorCommands: () => EditorCommands | void;
  languageDir: TextDirection;
};

export interface IModalService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (modalConfig: ModalConfig) => void;
  closeModal: (id: string) => void;
  getOpenModals: () => ModalConfig[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  on: (event: string, fn: Function) => IModalService;
}
