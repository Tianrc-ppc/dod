<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted as mounted } from 'vue';
import { darkTheme, lightTheme, zhCN, dateZhCN } from 'naive-ui';
import { NConfigProvider } from 'naive-ui';
import { NDialogProvider } from 'naive-ui';
import { NMessageProvider } from 'naive-ui';
import moment from 'moment';
import screenStore from '@/stores/screen';
import themesStore from '@/stores/themes';

const screen = screenStore();
const themes = themesStore();

const activate = ref(-1);
const updates = ref(-1);

const theme = computed(() => {
  if (updates.value && themes.type === 'auto') {
    const lower = moment().hour() < themes.range.upper;
    const upper = moment().hour() > themes.range.lower;
    return lower || upper ? darkTheme : lightTheme;
  } /* update color theme directly */ else {
    const light = themes.type && themes.type === 'light';
    const dark = themes.type && themes.type === 'dark';
    return light ? lightTheme : dark ? darkTheme : null;
  }
});

const resizer = () => {
  const lhs = screen.height === document.body.clientHeight;
  const rhs = screen.width === document.body.clientWidth;
  screen.height = document.body.clientHeight;
  screen.width = document.body.clientWidth;
  screen.pc = document.body.clientWidth >= 1080;
  screen.mb = document.body.clientWidth <= 640;
  screen.resized = screen.resized === (lhs && rhs);
  activate.value = -1; // remove activate stall
};

const resized = () => activate.value === -1 && (activate.value = setTimeout(resizer, 200));
const flipped = () => updates.value && (updates.value = -updates.value);
const heartbeat = () => setInterval(flipped, 10000);

window.onresize = resized;
mounted(heartbeat);
</script>

<style lang="scss">
body {
  user-select: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
