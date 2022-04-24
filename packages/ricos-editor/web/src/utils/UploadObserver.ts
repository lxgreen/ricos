import type { IUploadObserver, IUploadProgessMessage } from 'wix-rich-content-common';
import { MediaUploadProgressKey } from 'wix-rich-content-common';

export default class UploadObserver implements IUploadObserver {
  activeUploads: number;

  constructor() {
    this.activeUploads = 0;
  }

  update(message: IUploadProgessMessage) {
    if (message.key === MediaUploadProgressKey.STARTED) {
      this.activeUploads++;
    } else {
      this.activeUploads--;
    }
  }

  hasActiveUploads(): boolean {
    return this.activeUploads > 0;
  }
}
