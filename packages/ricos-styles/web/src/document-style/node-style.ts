import type { NodeStyle as NodeStyleRichContent } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';
import type { NodeStyle } from '../models/node-style';

export default class RicosNodeStyle implements NodeStyle {
  nodeStyle: NodeStyleRichContent;

  constructor(nodeStyle: NodeStyleRichContent) {
    this.nodeStyle = nodeStyle;
  }

  getNodeStyle: NodeStyle['getNodeStyle'] = () => this.nodeStyle;

  static fromCustomStyle = (customStyle: CustomTextualStyle): NodeStyle => {
    const { paddingBottom, paddingTop } = customStyle;
    const nodeStyle = {
      paddingBottom,
      paddingTop,
    };
    return new RicosNodeStyle(nodeStyle as NodeStyleRichContent);
  };

  toCustomStyle: NodeStyle['toCustomStyle'] = () => {
    return { paddingBottom: this.nodeStyle.paddingBottom, paddingTop: this.nodeStyle.paddingTop };
  };

  overrideWith: NodeStyle['overrideWith'] = NodeStyle => {
    return new RicosNodeStyle({ ...this.nodeStyle, ...NodeStyle });
  };
}
