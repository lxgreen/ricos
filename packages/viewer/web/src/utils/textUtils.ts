import { ReactElement } from 'react';

const kebabToCamel = (s: string): string =>
  s.replace(/-([a-z])/, (_, p1: string) => p1.toUpperCase());

export const kebabToCamelObjectKeys = (obj: Record<string, unknown> = {}) =>
  Object.keys(obj).reduce((result, key: string) => {
    result[kebabToCamel(key)] = obj[key];
    return result;
  }, {} as Record<string, unknown>);

export const hasText = (child?: string | ReactElement | unknown[]): boolean => {
  if (!child) {
    return false;
  }
  if (typeof child === 'string') {
    return child.trim().length > 0;
  }
  if (Array.isArray(child)) {
    return hasText(child[0] as string | ReactElement) || hasText(child[1] as string | ReactElement);
  } else if (typeof child === 'object') {
    return hasText(child.props.children);
  } else {
    return false;
  }
};
