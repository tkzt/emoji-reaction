import { App } from 'vue';
import EmojiReaction from './EmojiReaction.vue';

export default {
  install(Vue: App) {
    Vue.component(EmojiReaction.name, EmojiReaction);
  },
};

export {
  EmojiReaction,
};
