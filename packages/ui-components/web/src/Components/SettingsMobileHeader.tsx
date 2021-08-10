import React from 'react';
import { ActionButtons } from '..';
import { RichContentTheme } from 'wix-rich-content-common';

import styles from '../../statics/styles/settings-mobile-header.scss';

export interface SettingsMobileHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  cancelLabel: string;
  saveLabel: string;
  theme: RichContentTheme;
  title?: string;
}

const SettingsMobileHeader: React.FC<SettingsMobileHeaderProps> = ({
  theme,
  onSave,
  onCancel,
  saveLabel,
  cancelLabel,
  title,
}) => {
  // const [menuVisible, toggleMenu] = useState(false);
  // const _styles = mergeStyles({ styles, theme });

  return (
    <div className={styles.setting_mobile_header}>
      {title && <div className={styles.setting_mobile_header_title}>title</div>}
      <ActionButtons
        isMobile
        onCancel={onCancel}
        onSave={onSave}
        cancelText={cancelLabel}
        saveText={saveLabel}
        theme={theme}
      />
    </div>
    // <div role="menu" className={classNames(_styles.root)}>
    //   {!isMediaSettingsModal && <div className={_styles.headerPlaceholder} />}
    //   <div
    //     className={classNames(_styles.header, {
    //       [styles.media]: isMediaSettingsModal,
    //     })}
    //   >
    //     <button
    //       data-hook={dataHookPrefix + 'Cancel'}
    //       role="menuitem"
    //       aria-label={cancelLabel}
    //       onClick={() => cancel()}
    //       className={classNames(_styles.button, _styles.cancel)}
    //     >
    //       {cancelLabel}
    //     </button>
    //     {otherTab ? (
    //       <button
    //         role="menuitem"
    //         aria-label="More"
    //         data-hook={dataHookPrefix + 'More'}
    //         onClick={() => toggleMenu(!menuVisible)}
    //         className={classNames(_styles.button, _styles.menuIcon)}
    //       >
    //         <MoreIcon />
    //       </button>
    //     ) : null}
    //     <button
    //       data-hook={dataHookPrefix + 'Done'}
    //       onClick={() => save()}
    //       role="menuitem"
    //       aria-label={saveLabel}
    //       className={classNames(_styles.button, _styles.done)}
    //     >
    //       {saveLabel}
    //     </button>
    //   </div>
    //   {menuVisible && (
    //     <div className={_styles.menu}>
    //       <SelectionList
    //         theme={theme}
    //         dataSource={[otherTab]}
    //         value={''}
    //         onChange={() => {
    //           toggleMenu(false);
    //           switchTab();
    //         }}
    //       />
    //     </div>
    //   )}
    // </div>
  );
};

export default SettingsMobileHeader;
