<template>
  <n-h4 class="title-wrapper">您可以通过鼠标或触屏控制主角左右移动</n-h4>
  <div class="node-wrapper">
    <n-space align="center" justify="center">
      <n-icon size="350%"><arrow-back-round /></n-icon>
      <n-icon size="700%"><touch-app-round /></n-icon>
      <n-icon size="350%"><arrow-forward-round /></n-icon>
    </n-space>
  </div>
</template>

<script setup>
import { NSpace } from 'naive-ui';
import { NH4 } from 'naive-ui';
import { NIcon } from 'naive-ui';
import { ArrowForwardRound } from '@vicons/material';
import { ArrowBackRound } from '@vicons/material';
import { TouchAppRound } from '@vicons/material';
</script>

<style scoped lang="scss">
.title-wrapper {
  width: 90%;
  margin: auto;
}

.node-wrapper {
  transform: translate(-5%, 0%);
  animation: zooming 4s ease infinite;
}

@keyframes zooming {
  50% {
    transform: translate(5%, 0%);
  }
}
</style>
