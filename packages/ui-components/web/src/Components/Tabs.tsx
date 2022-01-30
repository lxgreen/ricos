import React, { Component } from 'react';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/tabs.scss';

interface CommonTabProps {
  theme: RichContentTheme;
  value: string;
  className?: string;
  headersStyle?: string;
  onTabSelected?: (value: string) => void;
}

interface TabProps extends CommonTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
  selected?: boolean;
}

export class Tab extends Component<TabProps> {
  styles: Record<string, string>;

  constructor(props: TabProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render = () =>
    this.props.selected && (
      <div
        role="tabpanel"
        key={this.props.value}
        aria-labelledby={`${this.props.value}_header`}
        id={`${this.props.value}_panel`}
      >
        {this.props.children}
      </div>
    );
}
interface TabsProps extends CommonTabProps {}
export class Tabs extends Component<TabsProps, { activeTab: string }> {
  styles: Record<string, string>;

  constructor(props: TabsProps) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { activeTab: props.value };
  }

  componentWillReceiveProps = (nextProps: TabsProps) => {
    if (nextProps.value !== this.state.activeTab) {
      this.setState({ activeTab: nextProps.value });
    }
  };

  getTabHeaders = tabs =>
    React.Children.map<{ label: string; value: string }, Tab>(tabs, tab => ({
      label: tab.props.label,
      value: tab.props.value,
    }));

  renderTabs = () =>
    React.Children.map(this.props.children, tab =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      React.cloneElement(tab, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        selected: this.state.activeTab === tab.props.value,
      })
    );

  render() {
    const { styles, props } = this;
    const headers = this.getTabHeaders(props.children);
    return (
      <div role="tablist" className={styles.tabs} aria-orientation="horizontal">
        <div className={classNames(styles.tabs_headers, this.props?.headersStyle)}>
          {headers.map(({ label, value }) => {
            const isSelected = value === this.state.activeTab;
            return (
              <button
                id={`${value}_header`}
                role="tab"
                tabIndex={0}
                name={`tabs`}
                key={value}
                className={classNames(styles.tabs_headers_option, {
                  [styles.tabs_headers_option_selected]: isSelected,
                })}
                data-hook={`${value}_Tab`}
                aria-controls={`${value}_panel`}
                aria-label={label}
                aria-selected={isSelected}
                onClick={() => {
                  this.setState({ activeTab: value });
                  if (this.props.onTabSelected) {
                    this.props.onTabSelected(value);
                  }
                  this.renderTabs();
                }}
              >
                <span className={this.styles.tabs_headers_option_label}>{label}</span>
              </button>
            );
          })}
        </div>
        {this.renderTabs()}
      </div>
    );
  }
}
