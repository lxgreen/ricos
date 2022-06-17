import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import cx from 'classnames';
import type { ToolbarSpec } from '../../types';
import styles from './Toolbar.scss';
import { RicosToolbar } from '../../RicosToolbar';
import { SizeCalculator } from '../SizeCalculator';
import { ClickOutside } from '../Clickoutside/ClickOutside';
import { MoreButton } from '../buttons';
import { ToolbarButton, ToolbarButtons } from '../../models';

type ToolbarProps = {
  toolbar: RicosToolbar;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolbarItemsRenders: any;
  isMobile: boolean;
  maxWidth?: number;
};

const visibleOnlySpec: ToolbarSpec = attributes => attributes.visible === true;

class ToolbarComponent extends Component<ToolbarProps, Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Record<string, any> = {};

  state = {
    dummyUpdate: 1,
    showMore: false,
  };

  constructor(props) {
    super(props);

    props.toolbar.on(RicosToolbar.EVENTS.UPDATED, () => {
      // force update
      this.setState({ dummyUpdate: this.state.dummyUpdate + 1 });
    });
  }

  onClickOutside = () => {
    this.setState({ showMore: false });
  };

  toggleMoreItems = () => {
    const { showMore } = this.state;
    this.setState({ showMore: !showMore });
  };

  render() {
    const { showMore } = this.state;
    const { toolbarItemsRenders, toolbar, isMobile, maxWidth } = this.props;
    const toolbarItems = toolbar.getToolbarItemsBy(visibleOnlySpec);

    const toolbarButtonArray: ToolbarButton[] = toolbarItems.map(toolbarButton => {
      const toolbarItemRender = toolbarItemsRenders[toolbarButton.id];
      if (!toolbarItemRender) {
        throw `Toolbar: missing toolbar item renderer for '${toolbarButton.id}'`;
      }
      const toolbarItemRenderElement = toolbarItemRender(toolbarButton);
      return new ToolbarButton(toolbarButton, toolbarItemRenderElement);
    });

    const toolbarButtons = new ToolbarButtons(toolbarButtonArray);

    return !isMobile ? (
      <SizeMe refreshRate={100}>
        {({ size }) => {
          if (!size.width) {
            return <div style={{ width: '100%' }}>.</div>;
          }

          const width = maxWidth || size.width;
          return (
            <div dir="ltr" data-hook="toolbar-v3" className={styles.toolbar}>
              <ClickOutside onClickOutside={this.onClickOutside} wrapper="div">
                <SizeCalculator width={width} toolbarButtons={toolbarButtons}>
                  {({ visibleButtons, overflowedButtons }) => {
                    return (
                      <div>
                        {!visibleButtons.isEmpty() && (
                          <div className={styles.visibleItems}>
                            {visibleButtons.getButtonsElementsWithDataHook()}
                            {!overflowedButtons.isEmpty() && (
                              <MoreButton
                                key={'more-button'}
                                onClick={this.toggleMoreItems}
                                showMore={showMore}
                              />
                            )}
                          </div>
                        )}
                        {showMore && overflowedButtons && (
                          <div className={styles.moreItems}>
                            <div className={styles.overflowedItems}>
                              {overflowedButtons.getButtonsElementsWithDataHook()}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </SizeCalculator>
              </ClickOutside>
            </div>
          );
        }}
      </SizeMe>
    ) : (
      <div dir="ltr" data-hook="toolbar-v3" className={cx(styles.toolbar, styles.mobileToolbar)}>
        <div className={styles.visibleItems}>{toolbarButtons.getButtonsElementsWithDataHook()}</div>
      </div>
    );
  }
}

export default ToolbarComponent;
