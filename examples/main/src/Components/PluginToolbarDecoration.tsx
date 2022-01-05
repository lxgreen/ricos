import type { CSSProperties } from 'react';
import React, { Component } from 'react';

class PluginToolbarDecoration extends Component<{
  style?: CSSProperties;
  className?: string;
}> {
  static displayName = 'PluginToolbarDecoration';

  render() {
    const { style, className, children, ...props } = this.props;
    return (
      <div style={style} className={className} {...props}>
        {children}
      </div>
    );
  }
}

export default PluginToolbarDecoration;
