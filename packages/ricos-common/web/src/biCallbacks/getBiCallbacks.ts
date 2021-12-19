import { BICallbacks } from 'wix-rich-content-common';

export function getBiCallback<T extends keyof BICallbacks>(key: T): BICallbacks[T] | undefined {
  const { children, _rcProps } = this.props;
  return children?.props.helpers?.[key] || _rcProps?.helpers?.[key];
}
