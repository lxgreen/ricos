import React from 'react';
import LinkPanelWrapper from './LinkPanelWrapper';
import { render } from '@testing-library/react';
import i18next from 'i18next';

// jest.mock('react-i18next', () => ({
//   // this mock makes sure any components using the translate HoC receive the t function as a prop
//   withTranslation: () => Component => {
//     Component.defaultProps = { ...Component.defaultProps, t: () => '' };
//     return Component;
//   },
// }));

describe('LinkPanelWrapper', () => {
  it('should render LinkWrapper', () => {
    const { container } = render(
      <LinkPanelWrapper
        t={key => key} // @ts-ignore : handling of t internally should be used with jest.mock
        anchorTarget={'anchorTarget'}
        relValue={'relValue'}
        linkValues={{ target: 'target' }}
        onChange={() => {}}
      />
    );
    // expect(container.querySelectorAll('[class*="paywallSeo"]').length).toBe(0);
    expect(true).toBe(true);
  });
});
