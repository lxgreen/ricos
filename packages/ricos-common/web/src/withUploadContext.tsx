import React, { Component } from 'react';
import type { EditorCommands, UploadContextType, Helpers, IUploadObserver } from 'ricos-types';
import { UploadServiceContext } from 'wix-rich-content-common';
import ErrorNotifier from './UploadContext/ErrorNotifier';

const uploadInputID = 'ricos-file-upload-input';

type UploadContextWrapperProps = {
  locale?: string;
  localeResource?: Record<string, string>;
  editorCommands?: EditorCommands;
  helpers?: Helpers;
  UploadObserver?: IUploadObserver;
  isMobile?: boolean;
};

type UploadContextWrapperState = {
  uploadContextValue?: UploadContextType;
};

export default class UploadContextWrapper extends Component<
  UploadContextWrapperProps,
  UploadContextWrapperState
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ErrorNotifier: React.RefObject<any>;

  uploadInput: HTMLInputElement | null;

  constructor(props: UploadContextWrapperProps) {
    super(props);
    this.ErrorNotifier = React.createRef();
    this.uploadInput = null;
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => this.setUploadContext());
  }

  async setUploadContext() {
    const { editorCommands, helpers } = this.props;
    const { onMediaUploadStart, onMediaUploadEnd } = helpers || {};
    const { createUploadServiceContextValue } = await import('./UploadContext/UploadContext');
    const uploadContextValue = createUploadServiceContextValue(
      this.ErrorNotifier.current,
      this.uploadInput as HTMLInputElement,
      editorCommands,
      { onMediaUploadStart, onMediaUploadEnd },
      this.props.UploadObserver
    );
    this.setState({ uploadContextValue });
  }

  render() {
    const { locale, children, localeResource } = this.props;

    return (
      <>
        <UploadServiceContext.Provider value={this.state.uploadContextValue || {}}>
          {children}
        </UploadServiceContext.Provider>
        <input
          ref={ref => (this.uploadInput = ref)}
          id={uploadInputID}
          key="ricosUploadInput"
          type="file"
          style={{ display: 'none' }}
          tabIndex={-1}
          multiple
        />
        <ErrorNotifier
          ref={this.ErrorNotifier}
          isMobile={this.props.isMobile}
          locale={locale}
          localeResource={localeResource}
        />
      </>
    );
  }
}
