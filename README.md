<p align="center">
    <img width="180" src="https://tkzt.cn/emoji-reaction/logo.svg" alt="Emoji Reaction logo" />
</p>
<p align="center">
  <a href="https://npmjs.com/package/emoji-reaction"><img src="https://badgen.net/npm/v/emoji-reaction" alt="npm package"></a>
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
            reactTo="whom-to-react-to"
            reactor="who-react"
            lcAppId="leancloud-app-id"
            lcAppKey="leancloud-app-key"
            :emojis="['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀']"
        />
    </div>
</template>
<script lang="ts" setup>
import { EmojiReaction } from 'emoji-reaction';
import 'emoji-reaction/lib/index.css';
</script>
```

Or globally register:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import EmojiReaction from 'emoji-reaction';
import 'emoji-reaction/lib/index.css';

createApp(App).use(EmojiReaction).mount('#app');
```


## Customization

```css
:root {
    --er-primary: #5E35B137;
    --er-primary-light: #5E35B125;
    --er-primary-dark: #5E35B1a6;
}
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
