import React, { Component, Suspense } from 'react';
import type { IMessage, INotifier } from 'ricos-types';
import { RicosTranslate } from 'wix-rich-content-common';
import { getLangDir } from '../utils';
const ErrorToast = React.lazy(() => import('wix-rich-content-editor/libs/ErrorToast'));

type ErrorNotifierState = {
  error: IMessage;
  errorCount: number;
  englishResource?: Record<string, string>;
};

type ErrorNotifierProps = {
  isMobile?: boolean;
  locale?: string;
  localeResource?: Record<string, string>;
};

class ErrorNotifier extends Component<ErrorNotifierProps, ErrorNotifierState> implements INotifier {
  timer?: NodeJS.Timeout;

  constructor(props) {
    super(props);
    this.state = { error: {}, errorCount: 0 };
  }

  closeToastAfterDelay = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(this.close, 4000);
  };

  notify = (error: IMessage) => {
    this.setState(state => ({ error, errorCount: state.errorCount + 1 }));
    this.closeToastAfterDelay();
  };

  close = () => {
    this.setState({ errorCount: 0 });
  };

  setEnglishResource = () => {
    import(
      /* webpackChunkName: "messages_[request]" */
      `wix-rich-content-common/dist/statics/locale/messages_en.json`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ).then((englishResource: any) => this.setState({ englishResource }));
  };

  render() {
    const { error, errorCount, englishResource } = this.state;
    const { isMobile, locale, localeResource } = this.props;
    if (errorCount <= 0) {
      return null;
    }
    if (!localeResource && !englishResource) {
      this.setEnglishResource();
      return null;
    }
    return (
      <RicosTranslate locale={locale} localeResource={localeResource || englishResource}>
        {() => (
          <div style={{ display: 'contents' }} dir={getLangDir(locale)}>
            <Suspense fallback={<div />}>
              <ErrorToast {...{ error, errorCount, onClose: this.close, isMobile }} />;
            </Suspense>
          </div>
        )}
      </RicosTranslate>
    );
  }
}

export default ErrorNotifier;
