<template>
  <div id="app" :class="{ dark: isDark }">
    <div class="container">
      <div class="col" v-for="i in 5" :key="i">
        <div class="card">
          <div class="card-title">
            Card {{ i }}
          </div>
          <div class="card-description">
            Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Sequi repellat minus omnis illum,
            cum temporibus amet recusandae voluptatem?
            Excepturi ipsa labore soluta doloribus quod
            molestiae incidunt reiciendis voluptatibus iste fuga.
          </div>
          <EmojiReaction :reactor="reactor" :react="(reaction) => react(reaction, 'card-' + i)"
            :unreact="(reaction) => unreact(reaction, 'card-' + i)"
            :getReactions="() => getReactions('card-' + i)" :dark="isDark" />
        </div>
      </div>
    </div>
    <footer>
      &copy; 2022-Present
      <a href="https://tkzt.cn" style="margin-left: .5rem;" target="_blank">Allen Tao<span
          style="transform: scale(.7); display: inline-block;">↗</span>
      </a>
      <div style="transform: scale(.5); margin: 0 .7rem;">|</div>
      <div style="cursor: pointer; user-select: none;" @click="toggleDark.call({})">
        <span v-if="isDark">☀️</span>
        <span v-else>🌛</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeviceUUID } from 'device-uuid';
import leancloud from 'leancloud-storage';
import EmojiReaction from '~/EmojiReaction.vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)

const reactor = ref(new DeviceUUID().get());
if (!leancloud.applicationId) {
  leancloud.init({
    appId: 'ocLQI6JRaaujbK1uOEhqwMMy-MdYXbMMI',
    appKey: 'U65o7Va32y6dWshUhJHWrtUe',
  });
}

function react(reaction: string, reactTo: string) {
  const reactionObj = new leancloud.Object('Reaction');
  reactionObj.set('reaction', reaction);
  reactionObj.set('reactor', reactor.value);
  reactionObj.set('reactTo', reactTo);
  return reactionObj.save();
}

function unreact(reaction: string, reactTo: string) {
  const query = new leancloud.Query('Reaction');
  return query.equalTo('reaction', reaction).equalTo('reactor', reactor.value).equalTo('reactTo', reactTo).destroyAll();
}

async function getReactions(reactTo: string) {
  const query = new leancloud.Query('Reaction');
  return query.equalTo('reactTo', reactTo).find().then((records) => records.reduce((pre: { reaction: string, reactors: string[] }[], curr) => {
    const { reaction, reactor: _reactor } = curr.toJSON() as { reaction: string, reactor: string };
    const existedReaction = pre.find((p) => p.reaction === reaction);
    if (existedReaction) {
      if (!existedReaction.reactors.includes(_reactor)) {
        existedReaction.reactors.push(_reactor);
      }
    } else {
      pre.push({
        reaction,
        reactors: [_reactor],
      });
    }
    return pre;
  }, []));
}
</script>

<style>
:root {
  --bg-color: #f2f3f8;
  --card-bg-color: white;
  --card-color: rgba(0, 0, 0, .87);
  --footer-color: rgba(0, 0, 0, .6);
}

html.dark {
  --bg-color: #272727;
  --card-bg-color: black;
  --card-color: white;
  --footer-color: rgba(255, 255, 255, .5);
}

body {
  margin: 0;
  background-color: var(--bg-color);
}

#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
}

.container {
  margin: auto;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
}

.col {
  flex: 0 0 25%;
  box-sizing: border-box;
  padding: 8px;
  overflow: hidden;
}

.card {
  width: 100%;
  border-radius: 8px;
  background-color: var(--card-bg-color);
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.card-title,
.card-description {
  flex: 0 0 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--card-color);
}

.card-title {
  font-weight: bold;
}

.card-description {
  font-size: small;
  margin: 8px 0;
}

footer {
  position: fixed;
  bottom: 0;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: xx-small;
  color: var(--footer-color);
}

footer a {
  color: inherit;
  text-decoration: unset;
}

footer a:hover {
  text-decoration: underline;
}

@media screen and (min-width: 1400px) {
  .container {
    width: 60%;
  }
}

@media screen and (max-width: 1000px) {
  .col {
    flex-basis: 50%;
  }
}

@media screen and (max-width: 600px) {
  .col {
    flex-basis: 100%;
  }

  footer {
    position: relative;
  }
}
</style>
