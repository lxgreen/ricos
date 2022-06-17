/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { MdClose, MdSettings, MdInvertColors } from 'react-icons/md';
import type { SectionSettings, OnVisibilityChanged } from '../types';
import { ExperimentsSetting } from './ExperimentsSetting';
export default class SectionHeader extends PureComponent<{
  title?: string;
  settings: SectionSettings[];
  onHide: OnVisibilityChanged;
  onClick?: () => void;
}> {
  static defaultProps = {
    settings: [],
  };

  onHideClick = () => {
    this.props.onHide(this.props.title.replace(' ', ''), false);
  };

  render() {
    const { title, settings, onClick } = this.props;
    const hasSettings = !!settings.length;

    return (
      <div className="header">
        <div className="title">
          <MdClose onClick={this.onHideClick} />
          <h3 className={onClick ? 'cursor' : ''} onClick={onClick || (() => {})}>
            {title}
          </h3>
        </div>
        {hasSettings && (
          <div className="settings">
            <MdSettings />
            <div className="dropdown">
              <ul>
                {settings.map(({ name, active, action, items, itemsType, getActive }) => (
                  <li
                    key={`${title}-settings-${name}`}
                    onClick={!items ? action : null}
                    className={!items && active ? 'active' : null}
                  >
                    <span>{name}</span>
                    {items && (
                      <ul className={itemsType || ''}>
                        {!itemsType ? (
                          items.map(item => (
                            <li
                              key={item}
                              onClick={() => action(item)}
                              className={item === active ? 'active' : null}
                            >
                              {item}
                            </li>
                          ))
                        ) : itemsType === 'experiments' ? (
                          <ExperimentsSetting items={items} active={getActive()} action={action} />
                        ) : itemsType === 'palettes' ? (
                          <Palettes items={items} active={getActive()} action={action} />
                        ) : (
                          itemsType === 'fonts' && (
                            <Fonts items={items} active={getActive()} action={action} />
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const Palettes = ({ items, active, action }) =>
  items.map(({ bgColor, textColor, actionColor }, i) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      key={i}
      className={`paletteContainer ${active === i ? 'active' : null}`}
      onClick={() => action(i)}
    >
      <div className="actionColor" style={{ backgroundColor: actionColor }}>
        <MdInvertColors />
      </div>
      {i < 6 ? <div>Light Mode</div> : <div>Dark Mode</div>}
      <div className="palette">
        <div style={{ backgroundColor: bgColor }} />
        <div style={{ backgroundColor: textColor }} />
        <div style={{ backgroundColor: actionColor }} />
      </div>
    </li>
  ));

const Fonts = ({ items, active, action }) =>
  items.map(({ h2, p }, i) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li onClick={() => action(i)} key={i} className={`fontContainer ${active === i && 'active'}`}>
      <div>
        <span>H2: </span>
        <span style={{ fontFamily: h2.fontFamily }}>{h2.fontFamily} </span>
      </div>
      <div>
        <span>P: </span>
        <span style={{ fontFamily: p.fontFamily }}>{p.fontFamily} </span>
      </div>
    </li>
  ));
