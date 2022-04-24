import type { IMediaPluginService, UploadedData, IMessage } from 'ricos-types';
import { omit } from 'lodash';
import type { ComponentData } from 'wix-rich-content-common';

export class FilePluginService implements IMediaPluginService {
  createLoadingData(file: File, _: unknown, componentData: ComponentData) {
    const { name, size } = file;
    const type = name.split('.').pop();
    return {
      componentData: {
        ...componentData,
        name,
        size,
        type,
        tempData: true,
      },
    };
  }

  createPluginData(uploadedData: UploadedData, componentData: ComponentData) {
    return {
      ...omit(componentData, ['tempData']),
      ...uploadedData.data,
    };
  }

  createErrorData(error: IMessage, componentData: ComponentData) {
    return {
      ...omit(componentData, ['tempData']),
      error,
    };
  }
}
