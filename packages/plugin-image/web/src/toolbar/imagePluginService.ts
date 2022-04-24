import type { IMediaPluginService, UploadedData, IMessage } from 'ricos-types';
import { omit } from 'lodash';
import type { ComponentData } from 'wix-rich-content-common';

export class ImagePluginService implements IMediaPluginService {
  createLoadingData(_: File, url: unknown, componentData: ComponentData) {
    return {
      componentData: {
        ...componentData,
        tempData: {
          dataUrl: url,
        },
      },
    };
  }

  createPluginData(uploadedData: UploadedData, componentData: ComponentData) {
    return {
      ...omit(componentData, ['tempData']),
      src: { ...uploadedData.data },
    };
  }

  createErrorData(error: IMessage, componentData: ComponentData) {
    return {
      ...componentData,
      error,
    };
  }
}
