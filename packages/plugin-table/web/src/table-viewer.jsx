import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSheet from 'react-datasheet/lib';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';
import 'react-datasheet/lib/react-datasheet.css';
import { isEqual } from 'lodash';
import CellRenderer from './components/CellRenderer';
import TableRenderer from './components/TableRenderer';
import RowRenderer from './components/RowRenderer';
import Table from './domain/table';
import ValueViewer from './components/ValueViewer';

class TableViewer extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.table = props.table || new Table(componentData, () => {});
    this.state = {
      grid: [...Array(this.table.rowNum).fill(0)].map((row, i) =>
        this.createRow(i, this.table.colNum)
      ),
    };
  }

  cellCreator = (i, j) => {
    const { setDragsVisibility, setCellContentHeight } = this.props;
    const editorContainerProps = setDragsVisibility
      ? {
          onMouseOver: () => setDragsVisibility(i, j),
        }
      : {};
    return {
      key: `${i}-${j}`,
      component: (
        //eslint-disable-next-line
        <div {...editorContainerProps}>{this.renderCell(i, j)}</div>
      ),
      valueViewer: props => <ValueViewer setCellContentHeight={setCellContentHeight} {...props} />,
    };
  };

  renderCell = (i, j) => {
    const { renderInnerRCE, viewerForInnerRCE, componentData } = this.props;
    return renderInnerRCE
      ? renderInnerRCE(i, j)
      : componentData && viewerForInnerRCE(componentData.config.cells[i][j].content);
  };

  createEmptyRow = columnsNumber => [...Array(columnsNumber).fill(createEmpty())];

  createRow = (i, columnsNumber) =>
    [...Array(columnsNumber).fill(0)].map((cell, j) => this.cellCreator(i, j));

  componentWillReceiveProps(nextProps) {
    this.table = nextProps.table || new Table(nextProps.componentData, () => {});
    if (!isEqual(nextProps.componentData.config.cells, this.props.componentData.config.cells)) {
      this.setState({
        grid: [...Array(this.table.rowNum).fill(0)].map((row, i) =>
          this.createRow(i, this.table.colNum)
        ),
      });
    }
  }

  sheetRenderer = props => (
    <TableRenderer
      {...props}
      rowNum={this.table.rowNum}
      colNum={this.table.colNum}
      setTableRef={this.props.setTableRef}
    />
  );

  render() {
    const { grid } = this.state;
    const { selected, onSelect, componentData, onResizeCol, onResizeRow, tableRef } = this.props;
    this.table = this.props.table || new Table(componentData, () => {});

    const dataSheetProps = {
      data: grid,
      valueRenderer: cell => cell.component,
      onSelect,
      selected,
      cellRenderer: CellRenderer,
      rowRenderer: RowRenderer,
      sheetRenderer: this.sheetRenderer,
      attributesRenderer: (cell, row, col) => ({
        cellData: this.table.getCellData(row, col),
        table: tableRef,
        onResize: { onResizeCol, onResizeRow },
      }),
    };

    return <DataSheet {...dataSheetProps} />;
  }
}

TableViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  renderInnerRCE: PropTypes.func,
  viewerForInnerRCE: PropTypes.func,
  componentData: PropTypes.object,
  selected: PropTypes.any,
  setDragsVisibility: PropTypes.func,
  table: PropTypes.any,
  onSelect: PropTypes.func,
  onResizeCol: PropTypes.func,
  onResizeRow: PropTypes.func,
  setTableRef: PropTypes.func,
  tableRef: PropTypes.any,
  setCellContentHeight: PropTypes.func,
};

export default TableViewer;
