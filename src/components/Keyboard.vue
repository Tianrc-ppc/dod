<template>
  <n-h4 class="title-wrapper">您可以使用方向键控制主角左右移动</n-h4>
  <div class="node-wrapper">
    <n-space align="center" justify="center">
      <n-icon size="350%"><arrow-circle-left-round /></n-icon>
      <n-icon size="700%"><keyboard-round /></n-icon>
      <n-icon size="350%"><arrow-circle-right-round /></n-icon>
    </n-space>
  </div>
</template>

<script setup>
import { NSpace } from 'naive-ui';
import { NH4 } from 'naive-ui';
import { NIcon } from 'naive-ui';
import { ArrowCircleRightRound } from '@vicons/material';
import { ArrowCircleLeftRound } from '@vicons/material';
import { KeyboardRound } from '@vicons/material';
</script>

<style scoped lang="scss">
.title-wrapper {
  width: 90%;
  margin: auto;
}

.node-wrapper {
  transform: scale(0.9, 0.9);
  animation: zooming 2s ease infinite;
}

@keyframes zooming {
  50% {
    transform: scale(1.1, 1.1);
  }
}
</style>
