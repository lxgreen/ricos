import { AppEmbedData_AppType, Node, Node_Type } from 'ricos-schema';
import plugins from './pluginCreators';

describe('Plugin Creators', () => {
  it('should create a plugin', () => {
    const appEmbed: Node = plugins.appEmbed({
      data: { type: AppEmbedData_AppType.BOOKING },
    });
    expect(appEmbed).toStrictEqual<Node>({
      id: appEmbed.id,
      appEmbedData: { type: AppEmbedData_AppType.BOOKING },
      nodes: [],
      type: Node_Type.APP_EMBED,
    });
  });
});
