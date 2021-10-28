import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { hasText } from './utils/textUtils';
import { isPaywallSeo, getPaywallSeoClass } from './utils/paywallSeo';
import { getDirectionFromAlignmentAndTextDirection } from 'wix-rich-content-common';
import styles from '../statics/rich-content-viewer.scss';
import { withInteraction } from './withInteraction';
import { ViewerContextType } from '../../../common/web/src';

const draftPublic = 'public-DraftStyleDefault';
const draftClassNames = (listType, depth, textDirection) =>
  `${draftPublic}-${listType}ListItem
   ${draftPublic}-depth${depth}
   ${draftPublic}-list-${textDirection}`;

const getBlockClassName = (isNewList, direction, listType, depth) => {
  let className = draftClassNames(listType, depth, direction);
  if (isNewList) {
    className += ` ${draftPublic}-reset`;
  }
  return className;
};

const List: FC<ListProps> = ({
  ordered,
  items,
  mergedStyles,
  textDirection,
  blockProps,
  getBlockStyleClasses,
  blockDataToStyle,
  context,
}) => {
  const Component = ordered ? 'ol' : 'ul';
  const listType = ordered ? 'ordered' : 'unordered';
  const containerClassName = `${draftPublic}-${Component}`;
  const listItemTypeClassName = `${listType}List`;
  let prevDepth = 0;
  return (
    <Component className={containerClassName}>
      {items.map((children, childIndex) => {
        // NOTE: list block data is an array of data entries per list item
        const dataEntry = blockProps.data.length > childIndex ? blockProps.data[childIndex] : {};

        const { interactions } = blockProps.data[childIndex];

        let paragraphGroup = [];
        const result = [];
        const alignment = dataEntry?.textAlignment || context.textAlignment;
        const textClassName = getBlockStyleClasses(
          mergedStyles,
          textDirection || dataEntry.textDirection,
          alignment
        );
        const hasJustifyText = alignment === 'justify' && hasText(children);
        const elementProps = key => ({
          className: classNames(mergedStyles.elementSpacing, textClassName, {
            [styles.hasJustifyText]: hasJustifyText,
            [styles.contentCenterAlignment]: alignment === 'center',
          }),
          key,
        });
        React.Children.forEach(children, (child, i) => {
          if (child) {
            if (typeof child.type === 'string' && /h\d/.exec(child.type)) {
              if (paragraphGroup.length) {
                result.push(<p {...elementProps(i)}>{paragraphGroup}</p>);
                paragraphGroup = [];
              }
              result.push(React.cloneElement(child, elementProps(i)));
            } else {
              paragraphGroup.push(child);
            }
          }
        });
        if (paragraphGroup.length) {
          result.push(<p {...elementProps('just_some_key')}>{paragraphGroup}</p>);
        }

        const depth = dataEntry.depth;
        const isNewList = childIndex === 0 || depth > prevDepth;
        const listItemDirection = getDirectionFromAlignmentAndTextDirection(
          alignment,
          textDirection || dataEntry.textDirection
        );
        const className = getBlockClassName(isNewList, listItemDirection, listType, depth);
        prevDepth = depth;
        const blockIndex = dataEntry.index;
        const wrappedBlock = withInteraction(
          result.length === 0 ? ' ' : result,
          interactions,
          context
        );
        return (
          <li
            id={`viewer-${blockProps.keys[childIndex]}`}
            className={classNames(
              context.theme[listItemTypeClassName],
              styles[listItemTypeClassName],
              styles[alignment],
              getBlockStyleClasses(mergedStyles, listItemDirection, alignment, className, true),
              isPaywallSeo(context.seoMode) &&
                getPaywallSeoClass(context.seoMode.paywall, blockIndex)
            )}
            key={blockProps.keys[childIndex]}
            style={blockDataToStyle(blockProps.data[childIndex])}
          >
            {wrappedBlock}
          </li>
        );
      })}
    </Component>
  );
};

type ListProps = {
  blockDataToStyle: () => void;
  blockProps: Record<string, unknown>;
  getBlockStyleClasses: () => string;
  items: string[];
  mergedStyles: Record<string, string>;
  ordered?: boolean;
  textDirection?: 'rtl' | 'ltr';
  context: ViewerContextType;
};

export default List;
