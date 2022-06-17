/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateService, StreamReader, UploadService } from './UploadServices';
import type { IUploadObserver, INotifier, IUploadService, IUpdateService } from 'ricos-types';

export const createUploadServiceContextValue = (
  errorNotifier: INotifier,
  hiddenInputElement: HTMLInputElement,
  editorCommands?: any,
  BICallbacks?: {
    onMediaUploadStart?: any;
    onMediaUploadEnd?: any;
  },
  UploadObserver?: IUploadObserver
) => {
  const updateService: IUpdateService = new UpdateService(editorCommands);
  const uploadService: IUploadService = new UploadService(
    new StreamReader(),
    errorNotifier,
    updateService,
    hiddenInputElement,
    BICallbacks,
    UploadObserver
  );
  return {
    uploadService,
    updateService,
  };
};
