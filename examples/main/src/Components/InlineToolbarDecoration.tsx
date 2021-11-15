import React, { Component } from 'react';
import { getVisibleSelectionRect } from 'wix-rich-content-editor-common';
import styles from './InlineToolbarDecoration.scss';

class InlineToolbarDecoration extends Component<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
  className?: string;
  refCallback?: (node) => void;
}> {
  static displayName = 'InlineToolbarDecoration';

  element: Element;

  handleRef = el => {
    this.element = el;
    return this.props.refCallback(el);
  };

  render() {
    const { style, className, children, ...props } = this.props;
    const alteredStyle = style;
    if (alteredStyle.top) {
      alteredStyle.top -= 10;
    }

    const selectionRect = getVisibleSelectionRect(window);
    const toolbarRect: Partial<DOMRect> = this.element ? this.element.getBoundingClientRect() : {};
    // eslint-disable-next-line no-console
    console.log('TCL: InlineToolbarDecoration -> render -> toolbarRect', toolbarRect);
    const relLeft = selectionRect ? selectionRect.left + selectionRect.width / 2 : 0;
    const toolbarLeft = toolbarRect.left || 0;
    const left = relLeft - toolbarLeft;

    const arrowStyle = {
      left,
    };

    return (
      <div style={alteredStyle} className={className} ref={this.handleRef} {...props}>
        <div className={styles.arrow} style={arrowStyle} />
        {children}
      </div>
    );
  }
}

export default InlineToolbarDecoration;
