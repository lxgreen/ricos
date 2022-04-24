import type { IMediaPluginService, UploadedData, IMessage } from 'ricos-types';
import { omit } from 'lodash';
import type { ComponentData, VideoComponentData } from 'wix-rich-content-common';

export class VideoPluginService implements IMediaPluginService {
  createLoadingData(_: File, url: unknown, componentData: ComponentData) {
    return {
      componentData: {
        ...componentData,
        src: url,
        tempData: true,
        isCustomVideo: true,
      },
    };
  }

  createPluginData(uploadedData: UploadedData, componentData: ComponentData) {
    let src;
    const data = uploadedData.data as VideoComponentData & { url: unknown };
    if (data) {
      const { pathname, thumbnail, url } = data;
      src = pathname ? { pathname, thumbnail } : url;
    }
    return {
      ...omit(componentData, ['src', 'tempData']),
      src,
    };
  }

  createErrorData(error: IMessage, componentData: ComponentData) {
    return {
      ...omit(componentData, ['tempData']),
      error,
    };
  }
}
