import { merge } from 'lodash';
import { RicosTheme } from 'ricos-common';

type WithStyle = (theme?: RicosTheme) => RicosTheme;
const bmActionColor = '#3899EC';

export const withWixStyle: WithStyle = theme =>
  merge<RicosTheme, RicosTheme>(
    {
      palette: {
        actionColor: bmActionColor,
        bgColor: '#FFFFFF',
        textColor: '#000000',
      },
      paletteConfig: {
        focusActionColor: bmActionColor,
        settingsActionColor: bmActionColor,
      },
      settingsStyles: {
        buttons: {
          borderRadius: '18px',
          textColor: '#FFFFFF',
        },
        dividers: {
          color: '#DFE5EB',
        },
        icons: {
          color: '#32536A',
        },
        inputs: {
          borderColor: '#C1E4FE',
          borderRadius: '6px',
          placeholderColor: '#7A92A5',
        },
        text: {
          color: '#32536A',
          fontFamily: 'Madefor',
        },
        whitebox: {
          borderRadius: '8px',
          boxShadow: '0 8px 8px 0 rgba(22, 45, 61, 0.12), 0 3px 24px 0 rgba(22, 45, 61, 0.18)',
        },
      },
    },
    theme || {}
  );
