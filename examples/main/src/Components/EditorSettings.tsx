/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import type { FC } from 'react';
import type { TestAppConfig } from '../types';
import {
  HTML_TYPE,
  VIDEO_TYPE,
  AUDIO_TYPE,
  LINK_PREVIEW_TYPE,
  VERTICAL_EMBED_TYPE,
} from 'ricos-content';

interface Props {
  editorSettings?: TestAppConfig;
  setEditorSettings: (settings: TestAppConfig) => void;
}

const Toggle = ({ onChange, checked, label, type = 'checkbox' }) => (
  <span className="checkbox">
    <input tabIndex={0} type={type} onChange={onChange} checked={checked} />
    {label}
  </span>
);

const EditorSettings: FC<Props> = ({ editorSettings = {}, setEditorSettings }) => {
  const setPluginMenuConfig = config =>
    setEditorSettings({
      ...editorSettings,
      toolbarConfig: {
        ...(editorSettings?.toolbarConfig || {}),
        addPluginMenuConfig: {
          ...(editorSettings?.toolbarConfig?.addPluginMenuConfig || {}),
          ...config,
        },
      },
    });

  const setPluginSettings = (type, config) =>
    setEditorSettings({
      ...editorSettings,
      pluginsConfig: {
        ...(editorSettings?.pluginsConfig || {}),
        [type]: {
          ...(editorSettings?.pluginsConfig?.[type] || {}),
          ...config,
        },
      },
    });

  const toggleExposeButton = (type, buttonName) =>
    editorSettings?.pluginsConfig?.[type]?.exposeButtons?.includes(buttonName)
      ? editorSettings?.pluginsConfig?.[type]?.exposeButtons.filter(b => b !== buttonName)
      : [...(editorSettings?.pluginsConfig?.[type]?.exposeButtons || []), buttonName];

  const isExposeButtonCheck = (type, buttonName) =>
    editorSettings?.pluginsConfig?.[type]?.exposeButtons?.includes(buttonName);

  const toggleSocialExposeButton = (type, buttonName) =>
    editorSettings?.pluginsConfig?.[type]?.exposeEmbedButtons?.includes(buttonName)
      ? editorSettings?.pluginsConfig?.[type]?.exposeEmbedButtons.filter(b => b !== buttonName)
      : [...(editorSettings?.pluginsConfig?.[type]?.exposeEmbedButtons || []), buttonName];

  const isSocialExposeButtonCheck = (type, buttonName) =>
    editorSettings?.pluginsConfig?.[type]?.exposeEmbedButtons?.includes(buttonName);

  const isHorizontalMenu = editorSettings?.toolbarConfig?.addPluginMenuConfig?.horizontalMenuLayout;

  return (
    <div className="editorSettings">
      <div>
        <div className="sectionHeader">Plugin Menu</div>
        <div className="pluginMenuToggle">
          <div
            className={`option ${!isHorizontalMenu && 'selected'}`}
            onClick={() =>
              setPluginMenuConfig({ tablePluginMenu: true, horizontalMenuLayout: false })
            }
          >
            Plugin Menu
          </div>
          <div
            className={`option ${isHorizontalMenu && 'selected'}`}
            onClick={() =>
              setPluginMenuConfig({
                tablePluginMenu: false,
                horizontalMenuLayout: true,
                showSearch: false,
                splitToSections: false,
              })
            }
          >
            Horizontal Menu
          </div>
        </div>
        <div className="checkboxWrapper" style={{ height: 48 }}>
          {!isHorizontalMenu && (
            <>
              <Toggle
                label="show search"
                onChange={() =>
                  setPluginMenuConfig({
                    showSearch: !editorSettings?.toolbarConfig?.addPluginMenuConfig?.showSearch,
                  })
                }
                checked={editorSettings?.toolbarConfig?.addPluginMenuConfig?.showSearch}
              />
              <Toggle
                label="split to section"
                onChange={() =>
                  setPluginMenuConfig({
                    splitToSections:
                      !editorSettings?.toolbarConfig?.addPluginMenuConfig?.splitToSections,
                  })
                }
                checked={editorSettings?.toolbarConfig?.addPluginMenuConfig?.splitToSections}
              />
            </>
          )}
        </div>
      </div>
      <div>
        <div className="sectionHeader">Plugin Layout</div>
        <div className="checkboxWrapper">
          <div className="pluginType">Vertical Embed</div>
          <Toggle
            type="radio"
            label="Default Layout"
            onChange={() => setPluginSettings(VERTICAL_EMBED_TYPE, { slimLayout: false })}
            checked={!editorSettings?.pluginsConfig?.[VERTICAL_EMBED_TYPE]?.slimLayout}
          />
          <Toggle
            type="radio"
            label="Slim Layout"
            onChange={() => setPluginSettings(VERTICAL_EMBED_TYPE, { slimLayout: true })}
            checked={editorSettings?.pluginsConfig?.[VERTICAL_EMBED_TYPE]?.slimLayout}
          />
        </div>
      </div>
      <div>
        <div className="sectionHeader">Plugin Expose Buttons</div>
        <div className="checkboxWrapper">
          <div className="pluginType">Social Embed</div>
          {['Instagram', 'TikTok', 'Twitter'].map(buttonName => (
            <Toggle
              key={buttonName}
              label={buttonName}
              onChange={() =>
                setPluginSettings(LINK_PREVIEW_TYPE, {
                  exposeEmbedButtons: toggleSocialExposeButton(LINK_PREVIEW_TYPE, buttonName),
                })
              }
              checked={isSocialExposeButtonCheck([LINK_PREVIEW_TYPE], buttonName)}
            />
          ))}

          <div className="pluginType">Video</div>
          {['video', 'youTube'].map(buttonName => (
            <Toggle
              key={buttonName}
              label={buttonName}
              onChange={() =>
                setPluginSettings(VIDEO_TYPE, {
                  exposeButtons: toggleExposeButton(VIDEO_TYPE, buttonName),
                })
              }
              checked={isExposeButtonCheck([VIDEO_TYPE], buttonName)}
            />
          ))}

          <div className="pluginType">Html</div>
          {['html', 'adsense'].map(buttonName => (
            <Toggle
              key={buttonName}
              label={buttonName}
              onChange={() =>
                setPluginSettings(HTML_TYPE, {
                  exposeButtons: toggleExposeButton(HTML_TYPE, buttonName),
                })
              }
              checked={isExposeButtonCheck([HTML_TYPE], buttonName)}
            />
          ))}

          <div className="pluginType">Audio</div>
          {['audio', 'soundCloud', 'spotify'].map(buttonName => (
            <Toggle
              key={buttonName}
              label={buttonName}
              onChange={() =>
                setPluginSettings(AUDIO_TYPE, {
                  exposeButtons: toggleExposeButton(AUDIO_TYPE, buttonName),
                })
              }
              checked={isExposeButtonCheck([AUDIO_TYPE], buttonName)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSettings;
