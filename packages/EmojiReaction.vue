<template>
  <div class="emoji-reaction" :id="containerId">
    <div class="er-trigger-icon" @click="popUp = !popUp">
      <progress-circular v-if="loading.includes('all')" />
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#757575" v-else>
        <path
          d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,
          0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,
          2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,
          9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,
          11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,
          17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,
          15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,
          17.23Z"
        />
      </svg>
      <div class="er-pop-up" v-if="popUp">
        <template v-for="(item, index) in emojis">
          <div
            class="er-pop-up-item reacted"
            v-if="checkReacted(item)"
            @click.stop="unreact(POPUP_PREFIX + item)"
            :key="'reacted-' + index"
          >
            {{ item }}
          </div>
          <div
            class="er-pop-up-item"
            v-else
            @click.stop="react(POPUP_PREFIX + item)"
            :key="index"
          >
            <span
              class="er-pop-up-item-emoji"
              :class="{ loading: loading.includes(POPUP_PREFIX + item) }"
            >
              {{ item }}
            </span>
          </div>
        </template>
      </div>
    </div>
    <div class="er-reactions">
      <template v-for="({ reaction, reactors }, index) in reactions">
        <div
          :key="'reacted-' + index"
          v-if="reactors.includes(reactor)"
          class="er-reaction reacted"
          @click="unreact(reaction)"
        >
          <span class="er-reaction-emoji">{{ reaction }}</span>
          <span class="er-reaction-sum">{{ formatSum(reactors.length) }}</span>
        </div>
        <div v-else :key="index" class="er-reaction" @click="react(reaction)">
          <span class="er-reaction-emoji" :class="{ loading: loading.includes(reaction) }">{{
            reaction
          }}</span>
          <span class="er-reaction-sum">{{ formatSum(reactors.length) }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup name="EmojiReaction">
import {
  ref, onMounted, onBeforeUnmount, Ref,
} from 'vue';
import { nanoid } from 'nanoid';
import ProgressCircular from './ProgressCircular.vue';

interface Reaction {
  reaction: string;
  reactors: string[];
}

export interface Props {
  emojis?: string[];
  reactor: string;
  react: (reaction: string)=>Promise<unknown>;
  unreact: (reaction: string)=>Promise<unknown>;
  getReactions: ()=>Promise<Reaction[]>;
}

const props = withDefaults(defineProps<Props>(), {
  reactTo: '',
  reactor: '',
  emojis: () => ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀'],
});

const loading: Ref<string[]> = ref([]);
const reactions: Ref<Reaction[]> = ref([]);
const popUp = ref(false);
const containerId = ref(`er-${nanoid()}`);
const POPUP_PREFIX = 'popup-';

function formatSum(sum: number) {
  const kSum = sum / 1000;
  const mSum = sum / 10000;
  if (mSum > 1000) {
    return '999m+';
  }
  if (mSum > 1) {
    return `${mSum.toFixed(1).replace(/[.0]*$/g, '')}m`;
  }
  if (kSum > 1) {
    return `${kSum.toFixed(1).replace(/[.0]*$/g, '')}k`;
  }
  return `${sum}`;
}

function clickOutside(ev: MouseEvent) {
  const container = document.querySelector(`#${containerId.value}`);
  const target = ev.target as HTMLTextAreaElement;
  if (container && container.contains(target)) {
    const { classList } = target;
    if (
      !['er-pop-up', 'er-pop-up-item', 'er-trigger-icon'].some((c) => classList.contains(c))
      && popUp.value
    ) {
      popUp.value = false;
    }
  } else {
    popUp.value = false;
  }
}

async function getReactions() {
  loading.value.push('all');
  reactions.value = (await props.getReactions()).filter(
    (r) => r.reaction && props.emojis.includes(r.reaction),
  );
  loading.value = loading.value.filter((l) => l !== 'all');
}

function afterReact(reaction: string) {
  const existedReaction = reactions.value.find((r) => r.reaction === reaction);
  if (existedReaction) {
    existedReaction.reactors.push(props.reactor);
  } else {
    reactions.value.push({
      reaction,
      reactors: [props.reactor],
    });
  }
}

function afterUnreact(reaction: string) {
  const existedReaction = reactions.value.find((r) => r.reaction === reaction);
  if (existedReaction) {
    existedReaction.reactors = existedReaction.reactors.filter((r) => r !== props.reactor);
    if (existedReaction.reactors.length === 0) {
      reactions.value = reactions.value.filter((r) => r.reaction !== reaction);
    }
  }
}

async function react(reaction: string) {
  if (!loading.value.includes(reaction)) {
    loading.value.push(reaction);

    const pureReaction = reaction.replace(POPUP_PREFIX, '');
    await props.react(pureReaction);

    setTimeout(() => {
      loading.value = loading.value.filter((l) => l !== reaction);
      if (popUp.value) {
        popUp.value = false;
      }
      afterReact(pureReaction);
    }, 370);
  }
}

async function unreact(reaction: string) {
  if (!loading.value.includes(reaction)) {
    const pureReaction = reaction.replace(POPUP_PREFIX, '');
    await props.unreact(pureReaction);
    afterUnreact(pureReaction);

    if (popUp.value) {
      popUp.value = false;
    }
  }
}

function checkReacted(reaction: string) {
  return reactions.value.some((r) => r.reaction === reaction && r.reactors.includes(props.reactor));
}

onMounted(() => {
  getReactions();
  window.addEventListener('click', clickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', clickOutside);
});
</script>

<style scoped>
.emoji-reaction {
  width: 100%;
  min-height: 28px;
  display: flex;
  align-items: center;
  position: relative;
}

.er-trigger-icon {
  position: relative;
  cursor: pointer;
  display: flex;
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
}

.er-trigger-icon::after {
  position: absolute;
  width: 26px;
  height: 26px;
  display: inline-block;
  content: '';
  top: -3px;
  left: -3px;
  border-radius: 50%;
}

.er-trigger-icon:hover::after {
  background-color: rgba(0, 0, 0, 0.06);
}

.er-reactions {
  display: flex;
  flex-wrap: wrap;
  margin-left: 4px;
}

.er-reaction {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 0 8px 0 4px;
  cursor: pointer;
}

.er-reaction:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

.er-reaction.reacted {
  background-color: var(--er-primary-light);
}

.er-reaction.reacted:hover {
  background-color: var(--er-primary);
}

.er-reaction-emoji {
  height: 23px;
  font-size: 16px;
}

.er-reaction-sum {
  margin-left: 2px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.81);
}

.er-pop-up {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  bottom: 26px;
  left: 0;
  padding: 4px;
  background-color: white;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  animation: pop-up 0.2s ease-out;
}

.er-pop-up-item {
  width: 26px;
  height: 26px;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.er-pop-up-item:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

.er-pop-up-item.reacted {
  background-color: var(--er-primary-light);
}

.er-pop-up-item.reacted:hover {
  background-color: var(--er-primary);
}

.er-reaction-emoji.loading,
.er-pop-up-item-emoji.loading {
  animation: bounce 0.8s ease-in;
}

.er-pop-up-item,
.er-reaction {
  user-select: none;
}

@keyframes pop-up {
  from {
    width: 0;
    height: 0;
    bottom: 20px;
  }
  to {
    width: fit-content;
    height: fit-content;
    bottom: 26px;
  }
}

@keyframes bounce {
  50% { transform: scale(1.2); }
  60% { transform: scale(1.3); }
  70% { transform: scale(.9); }
  80% { transform: scale(1.2); }
  0%, 100% { transform: scale(1) }
}
</style>
<style>
:root {
  --er-primary: #5e35b137;
  --er-primary-light: #5e35b125;
  --er-primary-dark: #5e35b1a6;
}
</style>
