<template>
  <n-layout ref="outer" :embedded="true" :style="{ width: '100vw', height: '100vh' }" class="outer-layout">
    <n-layout ref="inner" :native-scrollbar="false" :style="{ width: width, height: height }" class="inner-layout">
      <router-view />
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref, watch, onMounted as mounted } from 'vue';
import { NLayout } from 'naive-ui';
import screenStore from '@/stores/screen';
import statesStore from '@/stores/states';

const screen = screenStore();
const states = statesStore();

const outer = ref(undefined);
const inner = ref(undefined);
const height = ref('');
const width = ref('');

const update = (heights, widths) => {
  const high = heights * 42 >= widths * 55; // 100% w size
  const wide = heights * 42 < widths * 55; // 100% h size
  states.height = wide ? heights : (widths * 55) / 42;
  states.width = high ? widths : (heights * 42) / 55;
  height.value = wide ? '100vh' : (100 * 55) / 42 + 'vw';
  width.value = high ? '100vw' : (100 * 42) / 55 + 'vh';
};

const initial = () => update(document.body.clientHeight, document.body.clientWidth);
const watched = () => update(screen.height, screen.width);
const watches = () => screen.resized;

window.$scroll = (config) => inner.value && inner.value.scrollTo(config);
watch(watches, watched, { deep: true });
mounted(initial);
</script>

<style scoped lang="scss">
.inner-layout {
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
