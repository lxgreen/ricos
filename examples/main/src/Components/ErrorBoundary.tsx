/* eslint-disable jsx-a11y/accessible-emoji */
import type { ErrorInfo } from 'react';
import React, { PureComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export default class ErrorBoundary extends PureComponent<{}, { error?: Error; info?: ErrorInfo }> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info });
  }

  retry = () => {
    this.setState({ error: undefined });
  };

  render() {
    const { error, info } = this.state;
    if (error) {
      return (
        <div style={{ whiteSpace: 'pre-wrap', marginLeft: '5px' }}>
          <h1> Oh no 😿</h1>
          <button style={{ fontSize: '20px', background: 'aliceblue' }} onClick={this.retry}>
            Retry
          </button>
          <p>Look for more info in the console</p>
          <p>{error + info.componentStack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
