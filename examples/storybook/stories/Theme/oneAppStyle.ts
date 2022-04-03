import { merge } from 'lodash';
import type { RicosTheme } from 'ricos-common';

type WithStyle = (theme?: RicosTheme) => RicosTheme;

export const withOneAppStyle: WithStyle = theme =>
  merge<RicosTheme, RicosTheme>(
    {
      oneAppStyles: {
        text: {
          fontFamily: 'Madefor',
          color: '#20303C',
        },
        primaryText: {
          fontWeight: 700,
        },
        bgColor: {
          backgroundColor: '#F8F9FA',
        },
        secondary: {
          backgroundColor: '#E8ECF0',
        },
        whitebox: {
          borderRadius: '5px',
        },
        coverImage: {
          height: '70px',
          width: '70px',
          margin: '8px',
          border: '1px solid rgba(110, 120, 129, 0.1)',
        },
      },
    },
    theme || {}
  );
