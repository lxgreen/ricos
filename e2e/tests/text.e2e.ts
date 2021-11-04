import { INLINE_TOOLBAR_BUTTONS, ACTION_BUTTONS, FLOATING_TOOLBAR } from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS, DEFAULT_MOBILE_BROWSERS } from './settings';
import { usePlugins, usePluginsConfig, plugins, useExperiments } from '../cypress/testAppConfig';

const changeTextColor = (title: string) => {
  cy.loadRicosEditorAndViewer(
    'plain',
    useExperiments({
      newFormattingToolbar: { namespace: 'ricos', value: 'true', enabled: true },
    })
  );
  cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.COLOR, [20, 15]).openCustomColorModal();
  cy.eyesCheckWindow(title);
  cy.setColorByHex('d932c3');
  cy.updateTextColor();
  cy.eyesCheckWindow(title);
  if (!title.includes('mobile')) {
    cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.COLOR, [20, 5]).resetColor();
    cy.eyesCheckWindow(title);
  }
};

describe.only('text', () => {
  before(function() {
    cy.eyesOpen({
      appName: 'Text',
      testName: this.test.parent.title,
      browser: DEFAULT_DESKTOP_BROWSERS,
    });
  });

  const testAppConfig = {
    ...useExperiments({
      newFormattingToolbar: { namespace: 'ricos', value: 'true', enabled: true },
    }),
    ...usePlugins(plugins.textPlugins),
  };

  beforeEach('load editor', () => {
    cy.switchToDesktop();
    cy.loadRicosEditorAndViewer('empty', testAppConfig);
  });

  afterEach(() => cy.matchContentSnapshot());

  after(() => cy.eyesClose());

  it('allow to enter text', function() {
    // cy.loadRicosEditorAndViewer('empty', testAppConfig); //!No Experiment
    cy.enterParagraphs([
      'Leverage agile frameworks',
      'to provide a robust synopsis for high level overviews.',
    ])
      .setEditorSelection(0, 0)
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to change text color', function() {
    changeTextColor(this.test.title);
  });

  it('allow to apply inline styles and links', function() {
    cy.loadRicosEditorAndViewer(
      'plain',
      useExperiments({
        newFormattingToolbar: { namespace: 'ricos', value: 'true', enabled: true },
      })
    );
    cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [40, 10])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
      .setLineSpacing(1, [10, 50])
      .setColor(4, [200, 208])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_RIGHT)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_LEFT)
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_JUSTIFY)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [30, 170])
      .setLink([0, 10], 'https://www.wix.com/')
      .setLink([50, 65], 'https://www.one.co.il/')
      .setColor(1, [300, 305])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.TITLE, [250, 260])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.QUOTE, [250, 260])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST)
      .setLineSpacing(3, [100, 150])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [100, 300])
      .setLink([15, 30], 'https://www.sport5.co.il/')
      .setEditorSelection(0, 0)
      .enterParagraphs(['#LIVING THE DREAM\n'])
      .setLink([0, 17], 'https://www.sport5.co.il')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [0, 10])
      .setEditorSelection(0, 0)
      // TODO: should fix unstable behavior of mention
      // .enterParagraphs(['@NO_MORE\n'])
      .setLink([0, 10], 'https://www.wix.com/')
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.CODE_BLOCK, [0, 10])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to enter hashtag with link', function() {
    // cy.loadRicosEditorAndViewer()
    cy.enterParagraphs([
      '#wix.com wix.com #this_is_not_a_link #will_be_a_link thisislink#youknow.com ',
    ]).setLink([37, 15], 'https://www.wix.com/');
    cy.eyesCheckWindow(this.test.title);
  });

  it('remove hashtag inside quotes', function() {
    // cy.loadRicosEditorAndViewer()
    cy.enterParagraphs([
      'This is #hashtag! This #is not \'#hashtag\'! This is also not "#hashtag" ! hashtag #Test ',
    ]);
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to create lists', function() {
    cy.loadRicosEditorAndViewer('plain', testAppConfig)
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.ORDERED_LIST, [300, 100])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNORDERED_LIST, [550, 1])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('open link toolbar (InlinePluginToolbar)', function() {
    // set link
    cy.loadRicosEditorAndViewer('plain', testAppConfig)
      .setLink([0, 10], 'https://www.wix.com/')
      // set cursor on link
      .setEditorSelection(5, 0)
      .wait(200);
    // take snapshot of the toolbar
    cy.eyesCheckWindow(this.test.title);
    // edit link
    cy.get(`[data-hook=${FLOATING_TOOLBAR.TOOLBAR}] [data-hook=LinkButton]`)
      .click()
      .get(`[data-hook=linkPanelContainer] [data-hook=linkPanelInput]`)
      .type('https://www.google.com/')
      .get(`[data-hook=${ACTION_BUTTONS.SAVE}]`)
      .click();
    // check url button
    cy.setEditorSelection(5, 0)
      .get(`[data-hook=GoToLinkButton]`)
      .contains('https://www.google.com/');
    // remove link
    cy.get(`[data-hook=${FLOATING_TOOLBAR.TOOLBAR}] [data-hook=RemoveLinkButton]`).click();
    cy.blurEditor();
  });

  it('should insert custom link', function() {
    //!compare with master isCustomModal
    const testAppConfig = {
      ...usePluginsConfig({
        link: {
          isCustomModal: true,
        },
      }),
      ...useExperiments({
        newFormattingToolbar: { namespace: 'ricos', value: 'true', enabled: true },
      }),
    };
    const selection: [number, number] = [0, 11];
    cy.loadRicosEditorAndViewer('empty', testAppConfig);
    cy.enterParagraphs(['Custom link.']).setTextStyle(INLINE_TOOLBAR_BUTTONS.LINK, selection);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should enter text without linkify links (disableAutoLink set to true)', function() {
    //!No Experiment
    const testAppConfig = {
      ...usePluginsConfig({
        link: {
          disableAutoLink: true,
        },
      }),
    };
    cy.loadRicosEditorAndViewer('empty', testAppConfig);
    cy.enterParagraphs(['www.wix.com\nwww.wix.com ']);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should break the link when enter new soft line', function() {
    // cy.loadRicosEditorAndViewer('empty')
    cy.enterParagraphs(['www.thisIs\nseperateLink.com ']);
    cy.eyesCheckWindow(this.test.title);
  });

  it('should paste plain text', function() {
    // cy.loadRicosEditorAndViewer()
    cy.focusEditor().paste('This is pasted text');
    cy.eyesCheckWindow(this.test.title);
  });

  it('should paste html correctly', function() {
    // cy.loadRicosEditorAndViewer()
    cy.focusEditor().paste(
      // eslint-disable-next-line max-len
      `<meta charset='utf-8'><span style="color: rgb(32, 33, 34); font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">called<span> </span></span><a href="https://en.wikipedia.org/wiki/Anchor_text" title="Anchor text" style="text-decoration: none; color: rgb(11, 0, 128); background: none rgb(255, 255, 255); font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px;">anchor text</a><span style="color: rgb(32, 33, 34); font-family: sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">.<span> </span></span>`
    );
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to enter tab character', function() {
    // cy.loadRicosEditorAndViewer()
    cy.focusEditor()
      .tab()
      .enterParagraphs(['How to eat healthy is a good question.'])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('allow to enter tab character and delete it using shift+tab', function() {
    // cy.loadRicosEditorAndViewer()
    cy.focusEditor()
      .tab()
      .moveCursorToStart()
      .type('{rightarrow}')
      .tab({ shift: true })
      .enterParagraphs(['Text should not include tab.'])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('Enter click should create new block with the same alignment', function() {
    // cy.loadRicosEditorAndViewer()
    cy.enterParagraphs(['Hey, next line should be centered!'])
      .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [0, 33])
      .setAlignment(INLINE_TOOLBAR_BUTTONS.TEXT_ALIGN_CENTER)
      .setEditorSelection(33, 0)
      .type('{enter}')
      .type('{enter}')
      .enterParagraphs(['I am centered!'])
      .blurEditor();
    cy.eyesCheckWindow(this.test.title);
  });

  it('esc key event should make editor blurred', function() {
    // cy.loadRicosEditorAndViewer()
    cy.enterParagraphs(['Magic! I am blurred.']).type('{esc}');
    cy.eyesCheckWindow(this.test.title);
  });

  it('should enter link and further text in current block has no inline style', function() {
    // cy.loadRicosEditorAndViewer()
    cy.enterParagraphs(['wix.com '])
      .enterParagraphs(['no inline style'])
      .blurEditor(); //! No EXPERIMENTS REFACTOR
    cy.eyesCheckWindow(this.test.title);
  });

  it('should enter link and further text in next block has no inline style', function() {
    cy.loadRicosEditorAndViewer(
      'empty',
      useExperiments({
        newFormattingToolbar: { namespace: 'ricos', value: 'true', enabled: true },
      })
    );
    cy.enterParagraphs(['wix.com'])
      .type('{enter}')
      .enterParagraphs(['no inline style'])
      .blurEditor(); //! No EXPERIMENTS REFACTOR
    cy.eyesCheckWindow(this.test.title);
  });

  it('should not allow applying link to atomic blocks in selection', function() {
    cy.loadRicosEditorAndViewer(
      //! BUG Should be Resolved
      'content-with-video',
      useExperiments({
        newFormattingToolbar: { namespace: 'ricos', value: 'true', enabled: true },
      })
    );
    cy.waitForVideoToLoad();
    cy.setEditorSelection(0, 5);
    cy.getInlineButton(INLINE_TOOLBAR_BUTTONS.LINK).should('not.be.disabled');
    cy.eyesCheckWindow(this.test.title);
    cy.setEditorSelection(0, 40)
      .getInlineButton(INLINE_TOOLBAR_BUTTONS.LINK)
      .should('be.disabled');
    cy.eyesCheckWindow(this.test.title);
  });

  context.only('indentation', () => {
    it('allow to apply indent on a single block with inline styling', function() {
      cy.loadRicosEditorAndViewer('plain', testAppConfig);
      cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [40, 10])
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.UNDERLINE, [10, 5])
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.ITALIC, [20, 5])
        .setTextStyle(INLINE_TOOLBAR_BUTTONS.BOLD, [30, 5])
        .increaseIndent([0, 100])
        .increaseIndent([0, 100])
        .increaseIndent([0, 100])
        .increaseIndent([0, 100])
        .increaseIndent([200, 100])
        .increaseIndent([200, 100])
        .decreaseIndent([200, 100])
        .decreaseIndent([200, 100])
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent on multiple text blocks', function() {
      cy.loadRicosEditorAndViewer('text-blocks', testAppConfig);
      cy.increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .decreaseIndent([0, 550])
        .moveCursorToStart()
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent only on text blocks', function() {
      cy.loadRicosEditorAndViewer('non-text-only-blocks', testAppConfig);
      cy.increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .increaseIndent([0, 550])
        .moveCursorToStart()
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    it('allow to apply indent and delete it when clicking backspace where cursor is at start of block', function() {
      // cy.loadRicosEditorAndViewer('', usePlugins(plugins.textPlugins))
      cy.enterParagraphs(['Text should have depth 1.'])
        .increaseIndent([0, 20])
        .increaseIndent([0, 20])
        .moveCursorToStart()
        .type('{backspace}')
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });

    // TODO: figure out how to test keyboard combinations of command/ctrl keys in cypress ci
    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('allow to apply indent when clicking CMD+M on selected block', function() {
      // cy.loadRicosEditorAndViewer('', usePlugins(plugins.textPlugins))
      cy.focusEditor()
        .enterParagraphs(['Text should not include indentation.'])
        .type('{selectall}')
        .type('{command+m}')
        .moveCursorToStart()
        .type('{command+shift+m}')
        .blurEditor();
      cy.eyesCheckWindow(this.test.title);
    });
  });
});

describe('text color mobile', () => {
  before(function() {
    cy.eyesOpen({
      appName: 'Text',
      testName: this.test.parent.title,
      browser: DEFAULT_MOBILE_BROWSERS,
    });
  });
  beforeEach(() => cy.switchToMobile());

  after(() => cy.eyesClose());

  it('allow to change text color on mobile', function() {
    changeTextColor(this.test.title);
  });
});
