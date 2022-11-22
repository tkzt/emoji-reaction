<template>
  <div id="app">
    <div class="container">
        <div class="col" v-for="i in 5" :key="i">
            <div class="card">
                <div class="card-title">
                    Card {{i}}
                </div>
                <div class="card-description">
                    Lorem ipsum dolor,
                    sit amet consectetur adipisicing elit. Sequi repellat minus omnis illum,
                    cum temporibus amet recusandae voluptatem?
                    Excepturi ipsa labore soluta doloribus quod
                    molestiae incidunt reiciendis voluptatibus iste fuga.
                </div>
                <EmojiReaction
                    :reactTo="'card-'+i"
                    :reactor="reactor"
                    lcAppId="ocLQI6JRaaujbK1uOEhqwMMy-MdYXbMMI"
                    lcAppKey="U65o7Va32y6dWshUhJHWrtUe"
                />
            </div>
        </div>
    </div>
    <div class="footer">
        &copy; {{new Date().getFullYear()}}&nbsp;<a href="https://github.com/boring-plans">Allen Tao</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeviceUUID } from 'device-uuid';
import EmojiReaction from '~/EmojiReaction.vue';

const reactor = ref(new DeviceUUID().get());
</script>

<style>
body {
    margin: 0;
    background-color: #f2f3f8;
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
    background-color: white;
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
    color: rgba(0, 0, 0, .87);
}

.card-title {
    font-weight: bold;
}

.card-description {
    font-size: small;
    margin: 8px 0;
}

.footer {
    position: fixed;
    bottom: 0;
    padding: 24px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: xx-small;
    color: rgba(0, 0, 0, .6);
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

    .footer {
        position: relative;
    }
}
</style>
