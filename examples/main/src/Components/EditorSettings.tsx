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

const Toggle = ({ onChange, checked, label }) => (
  <span style={{ display: 'flex' }}>
    <input tabIndex={0} type={'checkbox'} onChange={onChange} checked={checked} />
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

  return (
    <div style={{ padding: 20 }}>
      <h3>Plugins toolbar settings:</h3>
      <div style={{ display: 'grid', gridRowGap: 10 }}>
        <Toggle
          label="use horizontal menu"
          checked={editorSettings?.toolbarConfig?.addPluginMenuConfig?.horizontalMenuLayout}
          onChange={() =>
            setPluginMenuConfig({
              tablePluginMenu: false,
              horizontalMenuLayout: true,
              showSearch: false,
              splitToSections: false,
            })
          }
        />
        <Toggle
          label="use plugin menu"
          checked={!editorSettings?.toolbarConfig?.addPluginMenuConfig?.horizontalMenuLayout}
          onChange={() =>
            setPluginMenuConfig({ tablePluginMenu: true, horizontalMenuLayout: false })
          }
        />
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
              splitToSections: !editorSettings?.toolbarConfig?.addPluginMenuConfig?.splitToSections,
            })
          }
          checked={editorSettings?.toolbarConfig?.addPluginMenuConfig?.splitToSections}
        />
      </div>

      <h3>Plugins settings:</h3>
      <h4>Vertical Embed:</h4>
      <div style={{ display: 'grid', gridRowGap: 10 }}>
        <Toggle
          label="slimLayout"
          onChange={() =>
            setPluginSettings(VERTICAL_EMBED_TYPE, {
              slimLayout: !editorSettings?.pluginsConfig?.[VERTICAL_EMBED_TYPE]?.slimLayout,
            })
          }
          checked={editorSettings?.pluginsConfig?.[VERTICAL_EMBED_TYPE]?.slimLayout}
        />
      </div>

      <h4>Social Embed:</h4>
      <div style={{ display: 'grid', gridRowGap: 10 }}>
        <div>Expose buttons:</div>

        <Toggle
          label="instagram"
          onChange={() =>
            setPluginSettings(LINK_PREVIEW_TYPE, {
              exposeEmbedButtons: toggleSocialExposeButton(LINK_PREVIEW_TYPE, 'Instagram'),
            })
          }
          checked={isSocialExposeButtonCheck([LINK_PREVIEW_TYPE], 'Instagram')}
        />
        <Toggle
          label="tiktok"
          onChange={() =>
            setPluginSettings(LINK_PREVIEW_TYPE, {
              exposeEmbedButtons: toggleSocialExposeButton(LINK_PREVIEW_TYPE, 'TikTok'),
            })
          }
          checked={isSocialExposeButtonCheck([LINK_PREVIEW_TYPE], 'TikTok')}
        />

        <Toggle
          label="twitter"
          onChange={() =>
            setPluginSettings(LINK_PREVIEW_TYPE, {
              exposeEmbedButtons: toggleSocialExposeButton(LINK_PREVIEW_TYPE, 'Twitter'),
            })
          }
          checked={isSocialExposeButtonCheck([LINK_PREVIEW_TYPE], 'Twitter')}
        />
      </div>
      <h4>Video:</h4>
      <div style={{ display: 'grid', gridRowGap: 10 }}>
        <div>Expose buttons:</div>

        <Toggle
          label="video"
          onChange={() =>
            setPluginSettings(VIDEO_TYPE, {
              exposeButtons: toggleExposeButton(VIDEO_TYPE, 'video'),
            })
          }
          checked={isExposeButtonCheck([VIDEO_TYPE], 'video')}
        />

        <Toggle
          label="youtube"
          onChange={() =>
            setPluginSettings(VIDEO_TYPE, {
              exposeButtons: toggleExposeButton(VIDEO_TYPE, 'youTube'),
            })
          }
          checked={isExposeButtonCheck([VIDEO_TYPE], 'youTube')}
        />
      </div>
      <h4>Html:</h4>
      <div style={{ display: 'grid', gridRowGap: 10 }}>
        <div>Expose buttons:</div>

        <Toggle
          label="html"
          onChange={() =>
            setPluginSettings(HTML_TYPE, {
              exposeButtons: toggleExposeButton(HTML_TYPE, 'html'),
            })
          }
          checked={isExposeButtonCheck([HTML_TYPE], 'html')}
        />

        <Toggle
          label="adsense"
          onChange={() =>
            setPluginSettings(HTML_TYPE, {
              exposeButtons: toggleExposeButton(HTML_TYPE, 'adsense'),
            })
          }
          checked={isExposeButtonCheck([HTML_TYPE], 'adsense')}
        />
      </div>

      <h4>Audio:</h4>
      <div style={{ display: 'grid', gridRowGap: 10 }}>
        <div>Expose buttons:</div>

        <Toggle
          label="audio"
          onChange={() =>
            setPluginSettings(AUDIO_TYPE, {
              exposeButtons: toggleExposeButton(AUDIO_TYPE, 'audio'),
            })
          }
          checked={isExposeButtonCheck([AUDIO_TYPE], 'audio')}
        />

        <Toggle
          label="soundCloud"
          onChange={() =>
            setPluginSettings(AUDIO_TYPE, {
              exposeButtons: toggleExposeButton(AUDIO_TYPE, 'soundCloud'),
            })
          }
          checked={isExposeButtonCheck([AUDIO_TYPE], 'soundCloud')}
        />

        <Toggle
          label="spotify"
          onChange={() =>
            setPluginSettings(AUDIO_TYPE, {
              exposeButtons: toggleExposeButton(AUDIO_TYPE, 'spotify'),
            })
          }
          checked={isExposeButtonCheck([AUDIO_TYPE], 'spotify')}
        />
      </div>
    </div>
  );
};

export default EditorSettings;
