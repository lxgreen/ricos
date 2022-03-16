import React, { Component } from 'react';
import type { ToolbarSpec } from '../../types';
import { RicosToolbar } from '../../RicosToolbar';
import styles from './Toolbar.scss';
import cx from 'classnames';

type ToolbarProps = {
  toolbar: RicosToolbar;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolbarItemsRenders: any;
};

const visibleOnlySpec: ToolbarSpec = attributes => attributes.visible === true;

class ToolbarComponent extends Component<ToolbarProps, Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Record<string, any> = {};

  state = {
    dummyUpdate: 1,
  };

  constructor(props) {
    super(props);

    props.toolbar.on(RicosToolbar.EVENTS.UPDATED, () => {
      // force update
      this.setState({ dummyUpdate: this.state.dummyUpdate + 1 });
    });
  }

  render() {
    const toolbarButtons = this.props.toolbar.getToolbarItemsBy(visibleOnlySpec);
    const { toolbarItemsRenders } = this.props;
    return (
      <div className={cx(styles.toolbar, styles.staticContainer)}>
        {toolbarButtons.map(toolbarButton => {
          const ItemComponent = toolbarItemsRenders[toolbarButton.id](toolbarButton);

          return (
            <div key={toolbarButton.id} className="toolbarItem">
              {ItemComponent}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToolbarComponent;
