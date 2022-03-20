import AudioModal from './toolbar/modals/AudioModal';
import AudioSettings from './toolbar/modals/AudioSettings';

const Modals = {
  AUDIO_SETTINGS: 'audio-settings',
  AUDIO_MODAL: 'audio',
};

const ModalsMap = {
  [Modals.AUDIO_SETTINGS]: AudioSettings,
  [Modals.AUDIO_MODAL]: AudioModal,
};

export { Modals, ModalsMap };
