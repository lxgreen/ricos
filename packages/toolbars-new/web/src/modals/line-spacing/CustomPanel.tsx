import React from 'react';
import { ActionButtons, BUTTON_SIZE } from 'wix-rich-content-ui-components';
import styles from './custom-panel.scss';

const LabeledInput = ({
  label,
  name,
  unit = '',
  defaultValue = 0,
  spacing,
  onChange,
  min,
  max,
}) => {
  const value = spacing[name] === undefined ? defaultValue : parseFloat(spacing[name]);
  return (
    <label className={styles.customSpacingPanel_labeledInput}>
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={e => {
          onChange({ [name]: Number(e.target.value) + unit });
        }}
        onMouseDown={event => event.stopPropagation()}
      />
    </label>
  );
};

const CustomPanel = ({ spacing, onChange, onSave, onCancel, t }) => {
  return (
    <div className={styles.customSpacingPanel}>
      <LabeledInput
        label={t('LineSpacing_lineSpacing')}
        name="line-height"
        defaultValue={1.5}
        onChange={onChange}
        spacing={spacing}
        min={1}
        max={100}
      />
      <div className={styles.separator} />
      <LabeledInput
        label={t('LineSpacing_beforeParagraph')}
        name="padding-top"
        unit="px"
        onChange={onChange}
        spacing={spacing}
        min={0}
        max={250}
      />
      <LabeledInput
        label={t('LineSpacing_afterParagraph')}
        name="padding-bottom"
        unit="px"
        onChange={onChange}
        spacing={spacing}
        min={0}
        max={250}
      />
      <div className={styles.customSpacingPanel_buttons}>
        <ActionButtons
          size={BUTTON_SIZE.tiny}
          onCancel={onCancel}
          onSave={onSave}
          cancelText={t('LineSpacing_cancel')}
          saveText={t('LineSpacing_save')}
        />
      </div>
    </div>
  );
};

export default CustomPanel;
