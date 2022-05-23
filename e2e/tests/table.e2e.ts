import { TABLE_PLUGIN } from '../cypress/dataHooks';
import { usePlugins, plugins } from '../cypress/testAppConfig';

describe('plugins', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('table', () => {
    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    it('should open table modal and create table by the settings', function () {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.table));
      cy.openTableModal();
      cy.percySnapshot(this.test.title + ' - table modal');
      cy.addTableFromModal(2, 2);
      cy.percySnapshot(this.test.title + ' - final');
    });

    it('should limit cells number', () => {
      cy.loadRicosEditorAndViewer('empty', usePlugins(plugins.table));
      cy.openTableModal();
      cy.setTableRowNumAndColNum(100, 100);
      cy.percySnapshot();
    });

    it('should select/unSelect all cells', function () {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.table));
      cy.focusTable();
      cy.selectAllTableCells();
      cy.percySnapshot(this.test.title + ' - select all');
      cy.selectAllTableCells();
      cy.percySnapshot(this.test.title + ' - select all 2');
    });

    it('should add rows and columns from table entry points', function () {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.table));
      cy.focusTable();
      cy.clickOnAddRow();
      cy.percySnapshot(this.test.title + ' - add row');
      cy.clickOnAddCol();
      cy.percySnapshot(this.test.title + ' - final');
    });

    it('should open table toolbars in different positions', function () {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.focusCell(0);
      cy.percySnapshot(this.test.title + ' - focus cell 0');
      cy.goToTextStyle();
      cy.percySnapshot(this.test.title + ' - text style 1');
      cy.focusCell(3);
      cy.percySnapshot(this.test.title + ' - focus cell 3');
      cy.goToTextStyle();
      cy.percySnapshot(this.test.title + ' - text style 2');
      cy.focusCell(4);
      cy.percySnapshot(this.test.title + ' - focus 4');
      cy.clickOnColDrag(1);
      cy.percySnapshot(this.test.title + ' - row drag 1');
      cy.clickOnRowDrag(2);
      cy.percySnapshot(this.test.title + ' - row drag 2');
    });

    it('should edit cell', function () {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.table));
      cy.focusTable();
      cy.editCell(0);
      cy.percySnapshot(this.test.title + ' - edit cell');
      cy.setTableCellEditingSelection(1, 2, 0);
      cy.percySnapshot(this.test.title + ' - final');
    });

    it('should use table toolbars', function () {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.clickOnRowDrag(0);
      cy.paintBG();
      cy.goToTextStyle();
      cy.paintTableTextColor();
      cy.paintTableHighlightColor();
      cy.clickOnRowDrag(2);
      cy.goToTextStyle();
      cy.get(`[data-hook*=textInlineStyleButton_BOLD]`).click();
      cy.clickOnColDrag(2);
      cy.paintBorder(TABLE_PLUGIN.BORDER_COLOR_AROUND, 3);
      cy.clickOnColDrag(3);
      cy.paintBorder(TABLE_PLUGIN.BORDER_COLOR_ALL, 4);
      cy.percySnapshot(this.test.title + ' - border color');
      cy.clickOnColDrag(0);
      cy.setColHeader();
      cy.clickOnRowDrag(0);
      cy.setRowHeader();
      cy.percySnapshot(this.test.title + ' - final');
    });

    it('should use cell alignment', function () {
      cy.loadRicosEditorAndViewer('table-alignment', usePlugins(plugins.all));
      cy.focusTable();
      cy.focusCell(0);
      cy.alignCell(TABLE_PLUGIN.ALIGN_BOTTOM);
      cy.alignCell(TABLE_PLUGIN.ALIGN_TOP);
      cy.focusCell(1);
      cy.alignCell(TABLE_PLUGIN.ALIGN_MIDDLE);
      cy.focusCell(2);
      cy.alignCell(TABLE_PLUGIN.ALIGN_BOTTOM);
      cy.percySnapshot(this.test.title + ' - align bottom');
      cy.editCell(0);
      cy.percySnapshot(this.test.title + ' - edit 0 ');
      cy.editCell(1);
      cy.percySnapshot(this.test.title + ' - edit 1');
      cy.editCell(2);
      cy.percySnapshot(this.test.title + ' - final');
    });

    it('should use table toolbar context menu', function () {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.clickOnRowDrag(1);
      cy.clickOnTableToolbarContextMenuInsertAbove();
      cy.clickOnRowDrag(2);
      cy.clickOnTableToolbarContextMenuDeleteRow();
      cy.percySnapshot(this.test.title + ' - delete row');
      cy.clickOnRowDrag(0);
      cy.clickOnTableToolbarContextMenuInsertBelow();
      cy.percySnapshot(this.test.title + ' - insert below');
      cy.clickOnRowDrag(0);
      cy.clickOnTableToolbarContextMenuClear();
      cy.clickOnColDrag(0);
      cy.clickOnTableToolbarContextMenuInsertRight();
      cy.clickOnColDrag(0);
      cy.clickOnTableToolbarContextMenuInsertLeft();
      cy.clickOnTableToolbarContextMenuDeleteCol();
      cy.percySnapshot(this.test.title + ' - final');
    });

    it('should test the first and last block logic', function () {
      cy.loadRicosEditorAndViewer('table-with-images', usePlugins(plugins.all));
      cy.focusTable();
      cy.percySnapshot(this.test.title + ' - table focus');
      cy.enterEditingCell(0);
      cy.percySnapshot(this.test.title + ' - cell edit');
    });

    it('should select all cell content after go out from edit', () => {
      cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
      cy.focusTable();
      cy.editCellAndGoOut(0);
      cy.goToTextStyle();
      cy.percySnapshot();
    });

    // it('should use table toolbar context menu', function() {
    //   cy.loadRicosEditorAndViewer('table', usePlugins(plugins.all));
    //   cy.focusTable();
    //   cy.clickOnRowDrag(0);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.percySnapshot();
    //   cy.clickOnTableToolbarContextMenuSplit();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(1);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(1);
    //   cy.clickOnTableToolbarContextMenuInsertAbove();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(2);
    //   cy.clickOnTableToolbarContextMenuDeleteRow();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(0);
    //   cy.clickOnTableToolbarContextMenuInsertBelow();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(0);
    //   cy.clickOnTableToolbarContextMenuClear();
    //   cy.percySnapshot();
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuInsertRight();
    //   cy.percySnapshot();
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuInsertLeft();
    //   cy.percySnapshot();
    //   cy.clickOnTableToolbarContextMenuDeleteCol();
    //   cy.percySnapshot();
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.percySnapshot();
    //   cy.clickOnColDrag(0);
    //   cy.clickOnTableToolbarContextMenuDeleteCol();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(4);
    //   cy.clickOnTableToolbarContextMenuMerge();
    //   cy.percySnapshot();
    //   cy.clickOnRowDrag(4);
    //   cy.clickOnTableToolbarContextMenuDeleteRow();
    //   cy.percySnapshot();
    // });
  });
});
