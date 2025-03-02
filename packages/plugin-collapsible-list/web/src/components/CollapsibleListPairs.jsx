import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CollapsibleListPair from './CollapsibleListPair';
import { EXPANDED, FIRST_EXPANDED } from '../defaults';

const getPairsAllCollpased = pairs => pairs.map(() => false);

const getPairsAllExpanded = pairs => pairs.map(() => true);

const getDefaultPairsState = (pairs, defaultPairsExpandState) => {
  const pairsState =
    defaultPairsExpandState === EXPANDED ? getPairsAllExpanded(pairs) : getPairsAllCollpased(pairs);

  if (defaultPairsExpandState === FIRST_EXPANDED) {
    pairsState[0] = true;
  }

  return pairsState;
};

class CollapsibleListPairs extends Component {
  constructor(props) {
    super(props);
    this.pairsRefs = [];
    this.state = this.initState(props);
  }

  initState(props) {
    const { pairs, expandState, expandOnlyOne } = props;

    return {
      defaultPairsExpandState: expandState,
      expandOnlyOne,
      pairsState: getDefaultPairsState(pairs, expandState),
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pairs, expandState, expandOnlyOne } = props;

    if (
      state.defaultPairsExpandState !== expandState ||
      (expandOnlyOne && expandOnlyOne !== state.expandOnlyOne)
    ) {
      return {
        defaultPairsExpandState: expandState,
        expandOnlyOne,
        pairsState: getDefaultPairsState(pairs, expandState),
      };
    }

    return null;
  }

  focusPair = ({ idx, isTitle }) => {
    const pair = this.pairsRefs[idx];
    if (isTitle) {
      pair?.focusTitle();
    } else {
      // try focus content, if pair is collapsed, focus title instead
      pair?.focusContent() || pair?.focusTitle();
    }
  };

  expandPair = idx => {
    const { pairs, expandOnlyOne } = this.props;
    let { pairsState } = this.state;
    if (expandOnlyOne) {
      pairsState = getPairsAllCollpased(pairs);
    }
    pairsState[idx] = true;
    this.setState({ pairsState });
  };

  collapsePair = idx => {
    const pairsState = [...this.state.pairsState];
    pairsState[idx] = false;
    this.setState({ pairsState });
  };

  insertNewPair = () => {
    const { expandOnlyOne } = this.state;
    let { pairsState } = this.state;
    if (expandOnlyOne) {
      pairsState = getPairsAllCollpased(pairsState);
    }
    pairsState = [...pairsState, true];
    this.setState({ pairsState });
  };

  deletePair = idx => {
    const { pairsState } = this.state;
    pairsState.splice(idx, 1);
    this.setState({ pairsState });
  };

  reorderPairs = (startIdx, endIdx) => {
    const { pairsState } = this.state;
    const [pairToMove] = pairsState.splice(startIdx, 1);
    pairsState.splice(endIdx, 0, pairToMove);
    this.setState({ pairsState });
  };

  render() {
    const { pairs, PairWrapper, t, theme, renderTitle, renderContent, helpers, isInEditor } =
      this.props;
    const { pairsState } = this.state;

    return pairs.map((pair, idx) => (
      <PairWrapper key={pair.key} id={pair.key} index={idx}>
        <CollapsibleListPair
          ref={ref => (this.pairsRefs[idx] = ref)}
          t={t}
          key={pair.key}
          idx={idx}
          isExpanded={pairsState[idx]}
          onCollapseClick={this.collapsePair}
          onExpandClick={this.expandPair}
          theme={theme}
          renderTitle={renderTitle}
          renderContent={renderContent}
          helpers={helpers}
          isInEditor={isInEditor}
        />
      </PairWrapper>
    ));
  }
}

CollapsibleListPairs.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  pairs: PropTypes.array.isRequired,
  expandState: PropTypes.object,
  expandOnlyOne: PropTypes.object,
  renderTitle: PropTypes.func,
  renderContent: PropTypes.func,
  helpers: PropTypes.object,
  PairWrapper: PropTypes.object,
  isInEditor: PropTypes.bool,
};

CollapsibleListPairs.defaultProps = {
  PairWrapper: 'div',
};

export default CollapsibleListPairs;
