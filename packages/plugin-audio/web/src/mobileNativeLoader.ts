import { pluginAudio, AUDIO_TYPE } from './viewer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __ricosPlugins: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __notifyRicosPluginLoaded: any;
  }
}
window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[AUDIO_TYPE] = pluginAudio;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(AUDIO_TYPE);
}
