import React, { Component } from 'react';
import { SizeMe } from 'react-sizeme';
import cx from 'classnames';
import type { ToolbarSpec } from '../../types';
import styles from './Toolbar.scss';
import { RicosToolbar } from '../../RicosToolbar';
import { SizeCalculator } from '../SizeCalculator';
import { ClickOutside } from '../Clickoutside/ClickOutside';
import { MoreButton } from '../buttons';

type ToolbarProps = {
  toolbar: RicosToolbar;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolbarItemsRenders: any;
  isMobile: boolean;
};

const visibleOnlySpec: ToolbarSpec = attributes => attributes.visible === true;
const MORE_BUTTON_WIDTH = 200;
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
    const { toolbarItemsRenders, toolbar, isMobile } = this.props;
    const toolbarButtons = toolbar.getToolbarItemsBy(visibleOnlySpec);
    const toolbarItems = toolbarButtons.map(toolbarButton => {
      return toolbarItemsRenders[toolbarButton.id](toolbarButton);
    });

    return !isMobile ? (
      <SizeMe refreshRate={100}>
        {({ size }) => {
          if (!size.width) {
            return <div />;
          }
          return (
            <div
              dir="ltr"
              data-hook="toolbar-v3"
              className={cx(styles.toolbar, styles.staticToolbar)}
            >
              <ClickOutside onClickOutside={this.onClickOutside} wrapper="div">
                <SizeCalculator width={size.width - MORE_BUTTON_WIDTH} components={toolbarItems}>
                  {({ visible, overflowed }) => {
                    return (
                      <div>
                        {visible && (
                          <div className={styles.visibleItems}>
                            {visible.map((component, index) => (
                              <div key={index}>{component}</div>
                            ))}
                            {overflowed.length > 0 && (
                              <MoreButton onClick={this.toggleMoreItems} showMore={showMore} />
                            )}
                          </div>
                        )}

                        {showMore && overflowed && (
                          <div className={styles.moreItems}>
                            <div className={styles.overflowedItems}>
                              {overflowed.map((component, index) => (
                                <div key={index}>{component}</div>
                              ))}
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
      <div
        dir="ltr"
        data-hook="toolbar-v3"
        className={cx(styles.toolbar, styles.staticToolbar, styles.mobileToolbar)}
      >
        <div className={styles.visibleItems}>
          {toolbarItems.map((component, index) => (
            <div key={index}>{component}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default ToolbarComponent;
