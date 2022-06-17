/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  ILocalFileReader,
  IFileUploader,
  INotifier,
  IMediaPluginService,
  IUpdateService,
  IUploadService,
  IUploadObserver,
} from 'ricos-types';

export class UploadService implements IUploadService {
  StreamReader: ILocalFileReader;

  ErrorNotifier: INotifier;

  UpdateService: IUpdateService;

  hiddenInputElement: HTMLInputElement;

  onInputChange: ((this: HTMLInputElement, event: any) => any) | null;

  BICallbacks?: {
    onMediaUploadStart?: any;
    onMediaUploadEnd?: any;
  };

  UploadObserver?: IUploadObserver;

  constructor(
    StreamReader: ILocalFileReader,
    Notifier: INotifier,
    UpdateService: IUpdateService,
    hiddenInputElement: HTMLInputElement,
    BICallbacks?: {
      onMediaUploadStart?: any;
      onMediaUploadEnd?: any;
    },
    UploadObserver?: IUploadObserver
  ) {
    this.StreamReader = StreamReader;
    this.ErrorNotifier = Notifier;
    this.UpdateService = UpdateService;
    this.hiddenInputElement = hiddenInputElement;
    this.onInputChange = null;
    this.BICallbacks = BICallbacks;
    this.UploadObserver = UploadObserver;
  }

  selectFiles(accept = 'image/*', multiple: boolean, callback: (files: File[]) => void) {
    this.onInputChange && this.hiddenInputElement.removeEventListener('change', this.onInputChange);
    this.onInputChange = event => {
      const files: File[] = Array.from(event.target.files || []);
      event.target.value = null;
      callback(files);
    };
    this.hiddenInputElement.addEventListener('change', this.onInputChange, { once: true });
    this.hiddenInputElement.accept = accept;
    this.hiddenInputElement.multiple = !!multiple;
    this.hiddenInputElement.click();
  }

  async uploadFile(
    file: File,
    nodeId: string,
    uploader: IFileUploader,
    type: string,
    MediaPluginService: IMediaPluginService,
    fileState?: Record<string, string | number>
  ) {
    this.UploadObserver?.update({ key: 0 });
    try {
      const url = await this.StreamReader.read(file);
      const newFileState = this.UpdateService.updateLoadingState(
        url,
        file,
        nodeId,
        type,
        MediaPluginService,
        fileState
      );
      const uploadBIData = this.BICallbacks?.onMediaUploadStart?.(type, file.size, file.type);
      let error = null;
      try {
        const uploadedFile = await uploader.upload(file);
        this.UpdateService.updatePluginData(
          uploadedFile,
          nodeId,
          type,
          MediaPluginService,
          newFileState
        );
        this.StreamReader.free(url as string);
      } catch (e) {
        error = e;
        this.ErrorNotifier.notify(e);
        this.UpdateService.updateErrorState(e, nodeId, type, MediaPluginService, newFileState);
      } finally {
        this.BICallbacks?.onMediaUploadEnd?.(uploadBIData, error);
      }
    } catch (e) {
      this.ErrorNotifier.notify({ msg: 'Failed reading file locally' });
    }
    this.UploadObserver?.update({ key: 1 });
  }
}
