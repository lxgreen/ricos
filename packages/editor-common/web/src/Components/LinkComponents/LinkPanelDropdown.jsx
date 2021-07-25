import React, { Component, PureComponent, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../statics/styles/link-panel.scss';
import { TextInput } from 'wix-rich-content-ui-components';
import { mergeStyles } from 'wix-rich-content-common';
import { isUndefined } from 'lodash';

const List = lazy(() =>
  import('react-window').then(({ FixedSizeList }) => ({
    default: FixedSizeList,
  }))
);
const Downshift = lazy(() => import('downshift'));

function isSubString(str, subStr) {
  return str.toLowerCase().includes(subStr.toLowerCase());
}

function filterItems(items, str) {
  return str
    ? items.filter(({ value, label }) => isSubString(value, str) || isSubString(label, str))
    : items;
}

class ItemRenderer extends PureComponent {
  render() {
    const {
      items,
      getItemProps,
      highlightedIndex,
      selectedItem,
      formatMenuItem,
      inputValue,
    } = this.props.data;
    const { index, style } = this.props;
    const item = items[index];
    return (
      <div
        {...getItemProps({
          item,
          index,
          key: item.value,
          style: {
            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
            fontWeight: selectedItem === item ? 'bold' : 'normal',
            ...style,
          },
        })}
      >
        {formatMenuItem(item, inputValue)}
      </div>
    );
  }

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    style: PropTypes.object,
  };
}

export class LinkPanelDropdown extends Component {
  state = {
    selectedItem: { value: this.props.value },
    items: this.props.getItems(),
    fallbackChanged: false,
  };

  styles = mergeStyles({ styles, theme: this.props.theme });

  handleDropDownStateChange = changes => {
    if (!isUndefined(changes.selectedItem)) {
      this.setState({ selectedItem: changes.selectedItem });
    }
    if (!isUndefined(changes.inputValue)) {
      const { inputValue } = changes;
      if (!this.state.selectedItem || this.state.selectedItem.value !== inputValue) {
        this.setState({ selectedItem: { value: inputValue } });
      }
      this.setState({
        items: filterItems(this.props.getItems(), inputValue),
        inputValue,
      });
      this.props.onChange(inputValue);
    }
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    this.textInput?.focus();
    if (!this.state.fallbackChanged) {
      this.textInput?.select(); //select the link in case of edit
    } else {
      this.textInput.selectionStart = this.textInput?.value.length;
      this.textInput.selectionEnd = this.textInput?.value.length;
    }
  }

  render() {
    const { itemToString, formatMenuItem, itemHeight, textInputProps, value } = this.props;
    const { selectedItem, items } = this.state;
    return (
      <Suspense
        fallback={
          <TextInput
            {...textInputProps}
            inputRef={ref => (this.textInput = ref)}
            value={value}
            onChange={value => {
              this.props.onChange(value);
              this.setState({ fallbackChanged: true });
            }}
          />
        }
      >
        <Downshift
          selectedItem={selectedItem}
          onStateChange={this.handleDropDownStateChange}
          itemToString={itemToString}
          initialInputValue={value}
        >
          {({
            getInputProps,
            getItemProps,
            // getLabelProps,
            getMenuProps,
            isOpen,
            highlightedIndex,
            inputValue,
          }) => {
            const textInputProps = getInputProps({
              ...textInputProps,
            });
            return (
              <div>
                {/*<label {...getLabelProps()}>Enter a fruit</label>*/}
                <TextInput
                  {...getInputProps({ ...textInputProps })}
                  onChange={value => textInputProps.onChange({ target: { value } })}
                  inputRef={ref => (this.textInput = ref)}
                />
                {(isOpen || this.props.isOpen) && List && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <List
                      className={styles.linkPanel_dropdownList}
                      style={{ borderTop: '0', position: 'absolute' }}
                      height={Math.min(items.length * itemHeight + 1, 200)}
                      itemCount={items.length}
                      itemSize={itemHeight}
                      itemData={{
                        items,
                        getItemProps,
                        highlightedIndex,
                        selectedItem,
                        formatMenuItem,
                        inputValue,
                      }}
                      {...getMenuProps()}
                    >
                      {ItemRenderer}
                    </List>
                  </Suspense>
                )}
              </div>
            );
          }}
        </Downshift>
      </Suspense>
    );
  }

  static propTypes = {
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    getItems: PropTypes.func,
    itemToString: PropTypes.func,
    value: PropTypes.string,
    formatMenuItem: PropTypes.func,
    itemHeight: PropTypes.number,
    textInputProps: PropTypes.object,
    isOpen: PropTypes.bool,
  };
}
