<p align="center">
    <img width="180" src="https://tkzt.cn/emoji-reaction/logo.svg" alt="Emoji Reaction logo" />
</p>
<p align="center">
  <a href="https://github.com/boring-plans/emoji-reaction/blob/main/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/boring-plans/emoji-reaction?color=blue"></a>
  <a href="https://npmjs.com/package/emoji-reaction"><img alt="npm package" src="https://img.shields.io/npm/v/emoji-reaction?color=royalblue"></a>
  <a href="https://github.com/boring-plans/emoji-reaction/actions/workflows/cd.yml?query=branch%3Amain"><img src="https://img.shields.io/github/workflow/status/boring-plans/emoji-reaction/cd/main" alt="build status"></a>
</p>

# Emoji Reaction

`Emoji Reaction` is an emoji reaction component based on [Leancloud](https://www.leancloud.cn/) and [Vue3](https://vuejs.org/).

![App Screenshot](https://tkzt.cn/emoji-reaction/Snipaste_2022-07-15_14-42-05.png)


# Demo

[Here](https://tkzt.cn/emoji-reaction) is a demo.


## Before Everything

- A Vue3 project
- A Leancloud App (For more, visit [here](https://github.com/boring-plans/boring-days#%E6%B3%A8%E5%86%8C))
## Installation

Install `Emoji Reaction` with npm:

```bash
npm install emoji-reaction
```


## Usage/Examples

```html
<template>
    <div class="card">
        <emoji-reaction
            react-to="whom-to-react-to"
            reactor="who-react"
            lc-app-id="leancloud-app-id"
            lc-app-key="leancloud-app-key"
            :emojis="['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀']"
        />
    </div>
</template>
<script lang="ts" setup>
import { EmojiReaction } from 'emoji-reaction';
</script>
```

Or globally register:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import EmojiReaction from 'emoji-reaction';

createApp(App).use(EmojiReaction).mount('#app');
```

Or a cdn-way to import:

```
<script src="https://cdn.jsdelivr.net/npm/emoji-reaction@latest/lib/index.min.js"></script>
```

For details, check [this](https://github.com/boring-plans/boring-plans.github.io/blob/main/index.html) out.


## Customization

```css
:root {
    --er-primary: #5E35B137;
    --er-primary-light: #5E35B125;
    --er-primary-dark: #5E35B1a6;
}
```
