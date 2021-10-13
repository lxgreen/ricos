import React, { FunctionComponent, ReactElement } from 'react';
import classNames from 'classnames';
import styles from '../statics/hashtag.scss';
import { RichContentTheme } from 'wix-rich-content-common';

export interface HashtagProps {
  decoratedText: string;
  createHref: (decoratedText: string) => string;
  onClick: (event, text: string) => void;
  target: '_top' | '_blank';
  theme: RichContentTheme;
}

const Hashtag: FunctionComponent<HashtagProps> = props => {
  const { children, decoratedText, createHref, onClick, target = '_self', theme = {} } = props;
  const text = decoratedText.slice(1);
  const href = createHref ? createHref(text) : null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = href ? 'a' : 'span';
  const className = classNames(styles.hashtag, theme && theme.hashtag, {
    [styles.hashtag_hover]: !!href,
    [theme.hashtag_hover]: theme && theme.hashtag_hover && !!href,
  });

  const decoratedOnClick = onClick ? event => onClick(event, text) : null;
  const cProps = href ? { className, href, target, onClick: decoratedOnClick } : { className };
  return (
    <Component {...cProps}>
      {React.Children.toArray(children).some((child: ReactElement) => child.type === 'span') ? (
        children
      ) : (
        <span>{children}</span>
      )}
    </Component>
  );
};

export default Hashtag;
