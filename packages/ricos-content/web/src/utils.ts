import styles from './version.scss';

export const a = styles;

export function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}
