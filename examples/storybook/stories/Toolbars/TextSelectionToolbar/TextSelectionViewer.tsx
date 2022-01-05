import React, { Component } from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
class TextSelectionViewer extends Component<
  { content?: DraftContent },
  { containerRef?: HTMLDivElement }
> {
  setRef = (ref: HTMLDivElement) => this.setState({ containerRef: ref });

  render() {
    const { content } = this.props;
    return (
      <div data-hook="viewer" style={{ position: 'relative', paddingTop: '8px' }} ref={this.setRef}>
        <RicosViewer content={content} textSelectionToolbar />
      </div>
    );
  }
}

export default TextSelectionViewer;
