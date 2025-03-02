import type { MouseEventHandler } from 'react';
import React, { Component } from 'react';
import { FileInput } from 'wix-rich-content-ui-components';
import { BUTTON_TYPES, INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import PhotoCamera from 'wix-ui-icons-common/PhotoCamera';
import VideoCamera from 'wix-ui-icons-common/VideoCamera';
import styles from './InitialIntentToolbar.scss';

class InitialIntentToolbar extends Component<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttons?: any;
  onClick: MouseEventHandler;
}> {
  iconsByName = {
    [INSERT_PLUGIN_BUTTONS.IMAGE]: PhotoCamera,
    [INSERT_PLUGIN_BUTTONS.VIDEO]: VideoCamera,
  };

  clickHandler = onPluginButtonClick => e => {
    onPluginButtonClick(e);
    this.props.onClick(e);
  };

  render() {
    const { buttons } = this.props;

    return (
      <div className={styles.toolbar}>
        {buttons &&
          Object.values(buttons).map(
            ({
              type,
              name,
              getIcon,
              tooltip,
              onClick,
              isDisabled = () => false,
              accept,
              multiple,
              onChange,
            }) => {
              const Icon = this.iconsByName[name] || getIcon();
              if (type === BUTTON_TYPES.BUTTON) {
                return (
                  <Tooltip content={tooltip} key={name}>
                    <button onClick={this.clickHandler(onClick)} disabled={isDisabled()}>
                      <Icon />
                    </button>
                  </Tooltip>
                );
              } else if (type === BUTTON_TYPES.FILE) {
                return (
                  <FileInput
                    onChange={this.clickHandler(onChange)}
                    accept={accept}
                    multiple={multiple}
                    key={name}
                  >
                    <Tooltip content={tooltip}>
                      <Icon />
                    </Tooltip>
                  </FileInput>
                );
              }
              return null;
            }
          )}
      </div>
    );
  }
}

export default InitialIntentToolbar;
