import React, { Component } from 'react';
import type { ToolbarSpec } from '../types';
import { RicosToolbar } from '../RicosToolbar';

type ToolbarProps = {
  toolbar: RicosToolbar;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolbarItemsRenders: any;
};

const visibleOnlySpec: ToolbarSpec = toolbarItem => toolbarItem.attributes.visible === true;

//RicosToolbar

class ToolbarComponent extends Component<ToolbarProps, Record<string, unknown>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Record<string, any> = {};

  state = {
    dummyUpdate: 1,
  };

  constructor(props) {
    super(props);

    props.toolbar.on(RicosToolbar.EVENTS.toolbarItemsCreated, () => {
      // force update
      this.setState({ dummyUpdate: this.state.dummyUpdate + 1 });
    });
  }

  render() {
    const toolbarButtons = this.props.toolbar.getItemsBy(visibleOnlySpec);
    const { toolbarItemsRenders } = this.props;
    return (
      <div className="toolbar">
        {toolbarButtons.map((toolbarButton, index) => {
          const ItemComponent = toolbarItemsRenders[toolbarButton.type](toolbarButton);

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
