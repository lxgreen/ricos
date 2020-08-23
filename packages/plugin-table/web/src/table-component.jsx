/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableViewer from './table-viewer';
import styles from '../statics/styles/table-component.scss';
import DragAndDropSection from './components/DragAndDropSection';
import CellToolbar from './components/CellToolbar';
import Table from './domain/table';
import { createEmptyCellContent, getRowNum, getColNum, getCellContent } from './tableUtils';
import AddNewSection from './components/AddNewSection';

class TableComponent extends React.Component {
  renderInnerRCE = (i, j) => {
    const { renderInnerRCE, componentData } = this.props;
    let contentState = getCellContent(componentData, i, j);
    if (!contentState) {
      contentState = createEmptyCellContent();
      contentState.blocks[0].text = 'blabla';
      this.table.updateCellContent(i, j, contentState);
    }
    return renderInnerRCE(
      contentState,
      newContentState => this.table.updateCellContent(i, j, newContentState),
      'table'
    );
  };

  selectRow = (i, colNum) =>
    this.setState({ selected: { start: { i, j: 0 }, end: { i, j: colNum - 1 } } });

  selectCol = (j, rowNum) =>
    this.setState({ selected: { start: { i: 0, j }, end: { i: rowNum - 1, j } } });

  onSelect = selected => this.setState({ selected });

  selectAll = () => {
    const rowNum = getRowNum(this.props.componentData);
    const colNum = getColNum(this.props.componentData);
    this.setState({ selected: { start: { i: 0, j: 0 }, end: { i: rowNum - 1, j: colNum - 1 } } });
  };

  updateComponentData1 = data => {
    const { setData } = this.props.blockProps;
    setData(data);
    this.props.store.set('componentData', { ...data }, this.props.block.getKey());
  };

  onResizeCol = (index, width) => this.table.setColumnWidth(index, width);

  onResizeRow = (index, height) => this.table.setRowHeight(index, height);

  setTableRef = ref => (this.tableRef = ref);

  setCellContentHeight = height => this.table.setCellsContentMaxHeight(height);

  handleCopy = ({ end, start, range }) => {
    const ranges = [];
    const copiedRows = range(start.i, end.i);
    const copiedColsNum = range(start.j, end.j);
    copiedRows.map(i => {
      return copiedColsNum.map(j => {
        return ranges.push({ i, j });
      });
    });
    this.setState({
      copiedCells: {
        ranges,
        copiedRowsNum: copiedRows.length,
        copiedColsNum: copiedColsNum.length,
      },
    });
  };

  onCellsChanged = changes => {
    const { copiedCells } = this.state;
    const cellsToDelete = [];
    changes.forEach(data => {
      if (data.value === '') {
        cellsToDelete.push({ i: data.row, j: data.col });
      } else if (copiedCells) {
        this.table.pasteCells(copiedCells, data.row, data.col);
      }
    });
    cellsToDelete.length > 0 && this.table.clearCellsContent(cellsToDelete);
  };

  render() {
    const { componentData, theme } = this.props;
    const { selected } = this.state || {};
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
    this.table = new Table(componentData, this.updateComponentData1);
    return (
      <div className={styles.tableEditorContainer}>
        <CellToolbar selected={selected} table={this.table} tableRef={this.tableRef} />
        <div className={styles.selectAll} onClick={this.selectAll} />
        <div className={styles.colsController}>
          <DragAndDropSection
            cellsNum={colNum}
            onDragClick={j => this.selectCol(j, rowNum)}
            onPlusClick={i => this.table.addColumn(i)}
            isCol
          />
        </div>
        <div className={styles.rowsController}>
          <DragAndDropSection
            cellsNum={rowNum}
            onDragClick={i => this.selectRow(i, colNum)}
            onPlusClick={i => this.table.addRow(i)}
          />
        </div>
        <div className={styles.rceTable}>
          <TableViewer
            componentData={componentData}
            renderInnerRCE={this.renderInnerRCE}
            selected={selected}
            onSelect={this.onSelect}
            theme={theme}
            onResizeCol={this.onResizeCol}
            onResizeRow={this.onResizeRow}
            setTableRef={this.setTableRef}
            setCellContentHeight={this.setCellContentHeight}
            tableRef={this.tableRef}
            handleCopy={this.handleCopy}
            onCellsChanged={this.onCellsChanged}
          />
        </div>
        <AddNewSection style={styles.addCol} onClick={() => this.table.addColumn(colNum)} />
        <AddNewSection style={styles.addRow} onClick={() => this.table.addRow(rowNum)} />
      </div>
    );
  }
}

TableComponent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  theme: PropTypes.object,
};

export { TableComponent as Component };
