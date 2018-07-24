/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import pickBy from 'lodash/pickBy';
import Separator from '../Components/Separator';
import BaseToolbarButton from './baseToolbarButton';
import {
  BUTTONS,
  BUTTONS_BY_KEY,
  BlockLinkButton,
  DeleteButton,
} from './buttons';
import Panel from '../Components/Panel';
import toolbarStyles from '../../statics/styles/plugin-toolbar.scss';
import buttonStyles from '../../statics/styles/plugin-toolbar-button.scss';

const toolbarOffset = 12;

const getInitialState = () => (
  {
    position: { transform: 'translate(-50%) scale(0)' },
    showLeftArrow: false,
    showRightArrow: false,
    componentData: {},
    componentState: {},
    overrideContent: undefined,
    tabIndex: -1
  }
);

const getStructure = (buttons, isMobile) => {
  const { all, hidden } = buttons;
  let structure = all;
  if (!isEmpty(hidden)) {
    structure = structure.filter(button => !includes(hidden, button.keyName));
  }
  return structure.filter(isMobile ?
    button => button.mobile :
    button => button.desktop !== false);
};

export default function createToolbar({ buttons, theme, pubsub, helpers, isMobile, anchorTarget, relValue, t, name }) {
  class BaseToolbar extends Component {
    constructor(props) {
      super(props);
      this.structure = getStructure(buttons, isMobile);
      this.state = getInitialState();
    }

    componentDidMount() {
      pubsub.subscribe('visibleBlock', this.onVisibilityChanged);
      pubsub.subscribe('componentState', this.onComponentStateChanged);
      pubsub.subscribe('componentData', this.onComponentDataChanged);
      pubsub.subscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.subscribe('componentSize', this.onComponentSizeChange);
      pubsub.subscribe('componentTextWrap', this.onComponentTextWrapChange);
      pubsub.subscribe('componentLink', this.onComponentLinkChange);
      pubsub.subscribe('editorBounds', this.onEditorBoundsChange);
      this.handleToolbarScroll();
    }

    componentWillUnmount() {
      pubsub.unsubscribe('visibleBlock', this.onVisibilityChanged);
      pubsub.unsubscribe('componentState', this.onComponentStateChanged);
      pubsub.unsubscribe('componentData', this.onComponentDataChanged);
      pubsub.unsubscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.unsubscribe('componentSize', this.onComponentSizeChange);
      pubsub.unsubscribe('componentTextWrap', this.onComponentTextWrapChange);
      pubsub.unsubscribe('componentLink', this.onComponentLinkChange);
      pubsub.unsubscribe('editorBounds', this.onEditorBoundsChange);
      this.buttons && this.buttons.removeEventListener('scroll', this.handleToolbarScroll);
      window && window.removeEventListener('resize', this.handleToolbarScroll);
      window && window.removeEventListener('orientationchange', this.handleToolbarScroll);
    }

    onEditorBoundsChange = editorBounds => {
      this.setState({ editorBounds });
    };

    onOverrideContent = overrideContent => {
      this.setState({ overrideContent }, () => {
        this.handleToolbarScroll();
      });
    };

    onComponentStateChanged = contentState => {
      this.setState({ contentState });
    };

    onComponentDataChanged = componentData => {
      this.setState({ componentData });
    };

    onComponentLinkChange = linkData => {
      const { url, targetBlank, nofollow } = linkData || {};
      const link = url ? {
        url,
        target: targetBlank ? '_blank' : (anchorTarget || '_self'),
        rel: nofollow ? 'nofollow' : (relValue || 'noopener')
      } : null;

      pubsub.update('componentData', { config: { link } });
    };

    setLayoutProps = ({ alignment: componentAlignment, size: componentSize, textWrap: componentTextWrap }) => {
      pubsub.set(pickBy({ componentAlignment, componentSize, componentTextWrap }));
    };

    onComponentSizeChange = size => {
      this.setState({ size });
    };

    onComponentAlignmentChange = alignment => {
      this.setState({ alignment }, () => {
        this.onVisibilityChanged(pubsub.get('visibleBlock'));
      });
    };

    onComponentTextWrapChange = textWrap => {
      this.setState({ textWrap });
    };

    onVisibilityChanged = visibleBlock => {
      if (visibleBlock) {
        this.showToolbar();
      } else {
        this.hideToolbar();
      }

      if (visibleBlock !== this.visibleBlock) {
        this.hidePanels();
      }

      this.visibleBlock = visibleBlock;
    };

    hideToolbar = () => {
      this.setState(getInitialState());
    };

    showToolbar = () => {
      const toolbarNode = findDOMNode(this);
      const toolbarHeight = this.buttons.offsetHeight;
      const offsetParentRect = toolbarNode.offsetParent.getBoundingClientRect();
      const offsetParentTop = offsetParentRect.top;
      const offsetParentLeft = offsetParentRect.left;

      const boundingRect = pubsub.get('boundingRect');
      const position = {
        top: boundingRect.top - toolbarHeight - toolbarOffset - offsetParentTop,
        left: boundingRect.left + boundingRect.width / 2 - offsetParentLeft,
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      };
      const componentData = pubsub.get('componentData') || {};
      const componentState = pubsub.get('componentState') || {};
      this.setState({
        position,
        componentData,
        componentState,
        tabIndex: 0
      });
    };

    handleButtonsRef = node => {
      this.buttons = node;
      if (this.buttons) {
        this.buttons.addEventListener('scroll', this.handleToolbarScroll);
        window && window.addEventListener('resize', this.handleToolbarScroll);
        window && window.addEventListener('orientationchange', this.handleToolbarScroll);
        this.handleToolbarScroll();
      }
    };

    scrollToolbar(event, direction) {
      event.preventDefault();
      switch (direction) {
        case 'right':
          this.buttons.scrollLeft += 200;
          break;
        case 'left':
          this.buttons.scrollLeft -= 200;
          break;
        default:
          break;
      }
    }

    handleToolbarScroll = () => {
      if (this.state.overrideContent) {
        this.setState({
          showLeftArrow: false,
          showRightArrow: false
        });
        return;
      }

      if (this.buttons) {
        const spaceLeft = this.buttons.scrollLeft;
        const eleWidth = this.buttons.clientWidth;
        const fullWidth = this.buttons.scrollWidth;

        const spaceRight = fullWidth - eleWidth - spaceLeft;

        this.setState({
          showLeftArrow: (spaceLeft > 2),
          showRightArrow: (spaceRight > 26)
        });
      }
    };

    renderButton = (button, key, themedStyle, separatorClassNames, tabIndex) => {
      const { alignment, size } = this.state;
      const Button = BUTTONS_BY_KEY[button.type] || BaseToolbarButton;
      const buttonProps = this.mapComponentDataToButtonProps(button, this.state.componentData);
      switch (button.type) {
        case BUTTONS.ALIGNMENT_LEFT:
        case BUTTONS.ALIGNMENT_CENTER:
        case BUTTONS.ALIGNMENT_RIGHT:
          return (
            <Button
              alignment={alignment}
              setLayoutProps={this.setLayoutProps}
              theme={themedStyle}
              isMobile={isMobile}
              key={key}
              t={t}
              tabIndex={tabIndex}
              {...buttonProps}
            />
          );
        case BUTTONS.SIZE_SMALL:
        case BUTTONS.SIZE_MEDIUM:
        case BUTTONS.SIZE_LARGE:
          return (
            <Button
              size={size}
              setLayoutProps={this.setLayoutProps}
              theme={themedStyle}
              isMobile={isMobile}
              key={key}
              t={t}
              tabIndex={tabIndex}
              {...buttonProps}
            />
          );
        case BUTTONS.SIZE_ORIGINAL:
        case BUTTONS.SIZE_CONTENT:
        case BUTTONS.SIZE_FULL_WIDTH:
        case BUTTONS.SIZE_SMALL_LEFT:
        case BUTTONS.SIZE_SMALL_CENTER:
        case BUTTONS.SIZE_SMALL_RIGHT:
          return (
            <Button
              size={size}
              alignment={alignment}
              setLayoutProps={this.setLayoutProps}
              theme={themedStyle}
              key={key}
              t={t}
              tabIndex={tabIndex}
              {...buttonProps}
            />
          );
        case BUTTONS.SEPARATOR:
          return <Separator className={separatorClassNames} key={key} />;
        case BUTTONS.HORIZONTAL_SEPARATOR:
          return (
            <Separator className={separatorClassNames} horizontal key={key} />
          );
        case BUTTONS.LINK:
          return (
            <BlockLinkButton
              tabIndex={tabIndex}
              pubsub={pubsub}
              onOverrideContent={this.onOverrideContent}
              theme={themedStyle}
              key={key}
              helpers={helpers}
              isMobile={isMobile}
              componentState={this.state.componentState}
              closeModal={helpers.closeModal}
              anchorTarget={anchorTarget}
              relValue={relValue}
              t={t}
            />
          );
        case BUTTONS.DELETE:
          return (
            <DeleteButton
              tabIndex={tabIndex}
              onClick={pubsub.get('deleteBlock')}
              theme={themedStyle}
              key={key}
              t={t}
              {...buttonProps}
            />
          );
        default:
          return (
            <Button
              tabIndex={tabIndex}
              theme={themedStyle}
              componentData={this.state.componentData}
              componentState={this.state.componentState}
              pubsub={pubsub}
              helpers={helpers}
              key={key}
              t={t}
              isMobile={isMobile}
              displayPanel={this.displayPanel}
              displayInlinePanel={this.displayInlinePanel}
              hideInlinePanel={this.hidePanels}
              {...buttonProps}
            />
          );
      }
    };

    mapComponentDataToButtonProps = (button, componentData) => {
      if (!button.mapComponentDataToButtonProps) {
        return button;
      }
      return {
        ...button,
        ...button.mapComponentDataToButtonProps(componentData)
      };
    };

    hidePanels = () => this.setState({ panel: null, inlinePanel: null });

    displayPanel = panel => {
      this.hidePanels();
      this.setState({ panel });
    };

    displayInlinePanel = inlinePanel => {
      this.hidePanels();
      this.setState({ inlinePanel });
    };

    renderInlinePanel() {
      const { inlinePanel, componentData, componentState } = this.state;
      const { PanelContent, keyName } = inlinePanel || {};

      return inlinePanel ? (
        <div className={toolbarStyles.pluginToolbar_inlinePanel} data-hook="baseToolbar_InlinePanel">
          <PanelContent
            key={keyName}
            theme={theme}
            store={pubsub}
            helpers={helpers}
            t={t}
            componentData={componentData}
            componentState={componentState}
            close={this.hidePanels}
          />
        </div>
      ) : null;
    }

    renderPanel() {
      const { panel, componentData, componentState } = this.state;

      return panel ? (
        <div className={toolbarStyles.pluginToolbar_panel}>
          <Panel
            key={panel.keyName}
            theme={theme}
            store={pubsub}
            helpers={helpers}
            t={t}
            componentData={componentData}
            componentState={componentState}
            content={panel.PanelContent}
            keyName={panel.keyName}
            close={this.hidePanels}
          />
        </div>
      ) : null;
    }

    render = () => {
      const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, tabIndex } = this.state;
      const hasArrow = showLeftArrow || showRightArrow;
      const { toolbarStyles: toolbarTheme } = theme || {};
      const { buttonStyles: buttonTheme, separatorStyles: separatorTheme } = theme || {};
      const containerClassNames = classNames(toolbarStyles.pluginToolbar, toolbarTheme && toolbarTheme.pluginToolbar);
      const buttonContainerClassnames = classNames(toolbarStyles.pluginToolbar_buttons, toolbarTheme && toolbarTheme.pluginToolbar_buttons, {
        [toolbarStyles.pluginToolbar_overrideContent]: !!OverrideContent,
        [toolbarTheme.pluginToolbar_overrideContent]: !!OverrideContent,
      });
      const themedButtonStyle = {
        buttonWrapper: classNames(buttonStyles.pluginToolbarButton_wrapper, buttonTheme && buttonTheme.pluginToolbarButton_wrapper),
        button: classNames(buttonStyles.pluginToolbarButton, buttonTheme && buttonTheme.pluginToolbarButton),
        icon: classNames(buttonStyles.pluginToolbarButton_icon, buttonTheme && buttonTheme.pluginToolbarButton_icon),
        active: classNames(buttonStyles.pluginToolbarButton_active, buttonTheme && buttonTheme.pluginToolbarButton_active),
        disabled: classNames(buttonStyles.pluginToolbarButton_disabled, buttonTheme && buttonTheme.pluginToolbarButton_disabled),
        ...theme
      };
      const separatorClassNames = classNames(toolbarStyles.pluginToolbarSeparator, separatorTheme && separatorTheme.pluginToolbarSeparator);
      const overrideProps = { onOverrideContent: this.onOverrideContent };

      return (
        <div style={this.state.position} className={containerClassNames} data-hook={name ? `${name}PluginToolbar` : null}>
          <div
            className={buttonContainerClassnames}
            ref={this.handleButtonsRef}
          >
            {
              showLeftArrow &&
              <button
                className={classNames(toolbarStyles.pluginToolbar_responsiveArrow, toolbarStyles.pluginToolbar_responsiveArrowLeft,
                  toolbarTheme.pluginToolbar_responsiveArrow, toolbarTheme.pluginToolbar_responsiveArrowLeft)}
                data-hook="baseToolbarLeftArrow" onMouseDown={e => this.scrollToolbar(e, 'left')} tabIndex={tabIndex}
              >
                <i />
              </button>
            }
            {OverrideContent ?
              <OverrideContent {...overrideProps} /> :
              this.structure.map((button, index) => (
                this.renderButton(button, index, themedButtonStyle, separatorClassNames, tabIndex)
              ))
            }
            {hasArrow && <div className={toolbarStyles.pluginToolbar_responsiveSpacer} />}
            {
              showRightArrow &&
              <button
                className={classNames(toolbarStyles.pluginToolbar_responsiveArrow, toolbarStyles.pluginToolbar_responsiveArrowRight,
                  toolbarTheme.pluginToolbar_responsiveArrow, toolbarTheme.pluginToolbar_responsiveArrowRight)}
                data-hook="baseToolbarRightArrow" onMouseDown={e => this.scrollToolbar(e, 'right')} tabIndex={tabIndex}
              >
                <i />
              </button>
            }
          </div>
          {this.renderInlinePanel()}
          {this.renderPanel()}
        </div>
      );
    };
  }
  return BaseToolbar;
}
