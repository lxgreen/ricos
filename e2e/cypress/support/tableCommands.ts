import 'cypress-plugin-snapshots/commands';
import { PLUGIN_COMPONENT, TABLE_PLUGIN } from '../dataHooks';
import { setSelection } from './commands';

export const TABLE_COMMANDS = {
  setTableCellEditingSelection: (start: number, offset: number, cellIndex: number) => {
    setSelection(start, offset, cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`).eq(cellIndex));
  },

  openTableModal: () => {
    cy.clickOnStaticButton(TABLE_PLUGIN.STATIC_TOOLBAR_BUTTON);
  },

  addTableFromModal: (rowNum: number, colNum: number) => {
    cy.setTableRowNumAndColNum(rowNum, colNum);
    cy.get(`[data-hook*=${TABLE_PLUGIN.SUBMIT}]`).click({ force: true });
  },

  setTableRowNumAndColNum: (rowNum: number, colNum: number) => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.ROW_COUNT_INPUT}]`).type(rowNum.toString());
    cy.get(`[data-hook*=${TABLE_PLUGIN.COL_COUNT_INPUT}]`).type(colNum.toString());
  },

  focusTable: () => {
    cy.get(`[data-hook*=${PLUGIN_COMPONENT.TABLE}]`).first().parent().click();
  },

  focusCell: (cellIndex: number) => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`)
      .eq(cellIndex)
      .trigger('mousedown')
      .trigger('mouseup');
  },

  editCell: (cellIndex: number, text = 'table!!') => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`).eq(cellIndex).click().type(text);
  },

  editCellAndGoOut: (cellIndex: number) => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`).eq(cellIndex).click().type('table!!{enter}');
  },

  enterEditingCell: (cellIndex: number) => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.CELL}]`).eq(cellIndex).dblclick();
  },

  paintBG: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.BG_COLOR}]`).click({ force: true });
    cy.get(`[data-scheme-color]`).eq(2).click();
  },

  alignCell: (alignTo: string) => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.ALIGNMENT}]`).click({ force: true });
    cy.get(`[data-hook*=${alignTo}]`).click({ force: true });
  },

  setRowHeader: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.ROW_HEADER}]`).click({ force: true });
  },

  setColHeader: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.COL_HEADER}]`).click({ force: true });
  },

  clickOnTableToolbarContextMenu: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.CONTEXT_MENU}]`).click({ force: true });
  },

  clickOnTableToolbarContextMenuClear: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.CLEAR}]`).click();
  },

  clickOnTableToolbarContextMenuDeleteCol: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.DELETE_COLUMN}]`).click();
  },

  clickOnTableToolbarContextMenuDeleteRow: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.DELETE_ROW}]`).click();
  },

  clickOnTableToolbarContextMenuInsertRight: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.INSERT_RIGHT}]`).click();
  },

  clickOnTableToolbarContextMenuInsertLeft: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.INSERT_LEFT}]`).click();
  },

  clickOnTableToolbarContextMenuInsertAbove: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.INSERT_ABOVE}]`).click();
  },

  clickOnTableToolbarContextMenuInsertBelow: () => {
    cy.clickOnTableToolbarContextMenu().get(`[data-hook*=${TABLE_PLUGIN.INSERT_BELOW}]`).click();
  },

  clickOnTableToolbarContextMenuMerge: () => {
    cy.clickOnTableToolbarContextMenu()
      .get(`[data-hook*=${TABLE_PLUGIN.MERGE}]`)
      .click({ force: true });
  },

  clickOnTableToolbarContextMenuSplit: () => {
    cy.clickOnTableToolbarContextMenu()
      .get(`[data-hook*=${TABLE_PLUGIN.SPLIT}]`)
      .click({ force: true });
  },

  paintBorder: (type: string, colorIndex: number) => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.BORDER_COLOR_BUTTONS}]`).click({ force: true });
    cy.get(`[data-hook*=${type}]`).click();
    cy.get(`[data-scheme-color]`).eq(colorIndex).click({ force: true });
  },

  paintTableTextColor: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.TEXT_COLOR}]`).click({ force: true });
    cy.get(`[data-scheme-color=color1]`).click();
  },

  paintTableHighlightColor: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.HIGHLIGHT_COLOR}]`).click({ force: true });
    cy.get(`[data-scheme-color=color4]`).click();
  },

  goToTextStyle: () => {
    cy.get(`[data-hook*=${TABLE_PLUGIN.TEXT_STYLE_BUTTON}]`).click({ force: true });
  },

  selectAllTableCells: () => {
    cy.get(`[data-hook*=selectAllTableCells]`).click();
  },

  clickOnRowDrag: (index: number) => {
    cy.get(`[data-hook*=rowDrag-${index}]`).click();
  },

  clickOnColDrag: (index: number) => {
    cy.get(`[data-hook*=colDrag-${index}]`).click();
  },

  clickOnAddRow: () => {
    cy.get(`[data-hook*=addRow]`).click();
  },

  clickOnAddCol: () => {
    cy.get(`[data-hook*=addCol]`).click();
  },
};
