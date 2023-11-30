<template>
  <div v-show="!loaded" class="load-wrap">
    <n-space vertical justify="space-evenly" class="space-load">
      <n-space vertical size="small">
        <n-p v-if="!loader" class="text-load">{{ text }}</n-p>
        <n-p v-if="loader" class="text-load">{{ loader }}</n-p>
        <n-progress type="line" processing indicator-placement="inside" :percentage="percent" />
      </n-space>
      <face v-if="config.operate.face" />
      <hand v-if="config.operate.hand" />
      <mouse v-if="config.operate.mouse" />
      <keyboard v-if="config.operate.keyboard" />
    </n-space>
  </div>
  <div v-show="loaded" class="game-wrap">
    <canvas ref="gaming" class="core-wrap" /><!-- doddle jump game kernel -->
    <n-space justify="space-between" align="center" class="game-header">
      <n-p class="node-header-m">{{ 'Score: ' + states.capture.score }}</n-p>
      <n-p v-if="false" class="node-header-l" />
      <n-p v-if="false" class="node-header-r" />
      <span class="button-group">
        <img v-show="!states.capture.stopped" :src="buttonPauseUrl" class="change-button" @click="gamePauseListener" />
        <img v-show="states.capture.stopped" :src="buttonStartUrl" class="change-button" @click="gamePauseListener" />
        <img :src="buttonStopUrl" class="stop-button" @click="gameStopListener" />
      </span>
    </n-space>
  </div>
</template>

<script setup>
import { ref, watch, onMounted as mounted, onUnmounted as removed } from 'vue';
import { useRouter } from 'vue-router';
import { useDialog } from 'naive-ui';
import { NProgress } from 'naive-ui';
import { NSpace } from 'naive-ui';
import { NP } from 'naive-ui';
import PlatformFactory from '@/utils/platform/factory';
import Ground from '@/utils/common/ground';
import Player from '@/utils/common/player';
import * as draw from '@/utils/draw';
import * as mediapipe from '@/utils/mediapipe';
import * as process from '@/utils/process';
import * as handler from '@/utils/handler';
import * as reset from '@/utils/reset';
import buttonPauseUrl from '@/assets/buttons/pause.png';
import buttonStartUrl from '@/assets/buttons/play.png';
import buttonStopUrl from '@/assets/buttons/stop.png';
import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import Keyboard from '@/components/Keyboard.vue';
import Face from '@/components/Face.vue';
import Hand from '@/components/Hand.vue';
import Mouse from '@/components/Mouse.vue';

const config = configStore();
const states = statesStore();
const router = useRouter();
const dialog = useDialog();

const status = { value: true, video: null };
const percent = ref(0);
const gaming = ref(null);
const loader = ref(null);
const loaded = ref(false);
const entrance = (id) => '启动成功，您将在 ' + id + ' 秒后进入游戏';
const backward = (id) => '启动失败，您将在 ' + id + ' 秒后返回主页';
const text = '游戏正在拼命加载，请耐心等待';

const gameStopListener = () => router.push('over'); // display player's current score
const keyboardListenerA = (event) => event && handler.keyboardHandler(event.key, true, false);
const keyboardListenerB = (event) => event && handler.keyboardHandler(event.key, false, true);
const mouseListener = (event) => event && handler.mouseHandler(event.screenX);
const gamePauseListener = () => (states.capture.stopped = !states.capture.stopped);

const touchStartListener = () => (states.capture.mouse = { location: null, movement: 0 });
const touchEndListener = () => (states.capture.mouse = { location: null, movement: 0 });
const touchListener = (event) => {
  const valid = event && event.touches && event.touches.length === 1;
  valid && handler.mouseHandler(event.touches[0].clientX);
};

const faceListener = () => {
  const result = mediapipe.detectFaceLandmarker(status.video);
  const valid = result && result.landmarks && result.landmarks.length > 0;
  valid && handler.faceHandler(result.landmarks[0][0].x * states.width);
  status.value && window.requestAnimationFrame(faceListener);
};

const handListener = () => {
  const result = mediapipe.detectHandLandmarker(status.video);
  const valid = result && result.landmarks && result.landmarks.length > 0;
  valid && handler.handHandler(result.landmarks[0][0].x * states.width);
  status.value && window.requestAnimationFrame(handListener);
};

const asyncLoadGameResources = async () => {
  status.value && (loader.value = '正在加载道具资源');
  status.value &= await draw.loadSpringA();
  status.value &= await draw.loadSpringB();
  status.value &= await draw.loadBomberA();
  status.value &= await draw.loadBomberB();
  status.value && (percent.value += 10);
  status.value && (loader.value = '正在加载玩家资源');
  status.value &= await draw.loadPlayerA();
  status.value &= await draw.loadPlayerB();
  status.value &= await draw.loadPlayerC();
  status.value &= await draw.loadPlayerD();
  status.value && (percent.value += 10);
};

const asyncLoadGamePlatforms = async () => {
  status.value && (loader.value = '正在加载平台资源');
  status.value &= await draw.loadGround();
  status.value &= await draw.loadPlatformA();
  status.value &= await draw.loadPlatformB();
  status.value &= await draw.loadPlatformC();
  status.value &= await draw.loadPlatformD();
  status.value &= await draw.loadPlatformE();
  status.value &= await draw.loadPlatformF();
  status.value &= await draw.loadPlatformG();
  status.value && (percent.value += 10);
};

const asyncSetGameEnvironmentA = async () => {
  const faceGetter = async () => await mediapipe.createWebCamera(mediapipe.getFaceActivator, console.log);
  const handGetter = async () => await mediapipe.createWebCamera(mediapipe.getHandActivator, console.log);
  status.value && reset.resetStates();
  status.value && (config.operate.face || config.operate.hand) && (loader.value = '正在请求模型参数');
  status.value && config.operate.face && (await mediapipe.createFaceDetector());
  status.value && config.operate.hand && (await mediapipe.createHandDetector());
  status.value && (percent.value += 20);
  status.value && (config.operate.face || config.operate.hand) && (loader.value = '正在启动图像采集');
  status.value && config.operate.face && (status.video = await faceGetter());
  status.value && config.operate.hand && (status.video = await handGetter());
  status.value && (percent.value += 20);
  status.value && config.operate.face && !status.video && (status.value = false);
  status.value && config.operate.hand && !status.video && (status.value = false);
};

const asyncSetGameEnvironmentB = async () => {
  const generator = (i) => states.factory && states.factory.generatePlatform(i);
  status.value && (loader.value = '正在注册回调方法');
  status.value && config.operate.keyboard && (document.onkeydown = keyboardListenerA);
  status.value && config.operate.keyboard && (document.onkeyup = keyboardListenerB);
  status.value && config.operate.face && status.video && faceListener();
  status.value && config.operate.hand && status.video && handListener();
  status.value && config.operate.mouse && document.addEventListener('mousemove', mouseListener);
  status.value && config.operate.mouse && document.addEventListener('touchstart', touchStartListener);
  status.value && config.operate.mouse && document.addEventListener('touchmove', touchListener);
  status.value && config.operate.mouse && document.addEventListener('touchend', touchEndListener);
  status.value && (percent.value += 20);
  status.value && (loader.value = '正在生成游戏实例');
  status.value && (states.factory = new PlatformFactory());
  status.value && (states.ground = new Ground());
  status.value && (states.player = new Player());
  status.value && (states.platforms = new Array());
  status.value && Array.from(Array(config.platforms).keys()).forEach((i) => !states.platforms[i] && generator(i));
  status.value && Array.from(Array(config.platforms).keys()).forEach((i) => !states.platforms[i] && generator(i));
  status.value && (percent.value += 10);
};

const requestGame = () => {
  const running = !states.capture.stopped;
  running && status.value && process.processMovementA();
  running && status.value && process.processMovementB();
  running && status.value && process.processCollision();
  running && status.value && process.processScrolling();
  running && status.value && process.processRefreshes();
  running && status.value && process.processVisualize();
  status.value && window.requestAnimationFrame(requestGame);
};

const prepareGame = async () => {
  states.logout = () => router.push('over');
  states.frame = gaming.value;
  (await asyncLoadGameResources()) || (await asyncLoadGamePlatforms());
  (await asyncSetGameEnvironmentA()) || (await asyncSetGameEnvironmentB());
  // --------------------------------
  loader.value = status.value ? entrance(3) : backward(3);
  await mediapipe.waitForBeginning(1000);
  loader.value = status.value ? entrance(2) : backward(2);
  await mediapipe.waitForBeginning(1000);
  loader.value = status.value ? entrance(1) : backward(1);
  await mediapipe.waitForBeginning(1000);
  // --------------------------------
  status.value ? requestGame() : router.push('home');
  loaded.value = status.value;
};

const destroyGame = async () => {
  status.value = false;
  document.removeEventListener('mousemove', mouseListener);
  document.removeEventListener('touchstart', touchStartListener);
  document.removeEventListener('touchmove', touchListener);
  document.removeEventListener('touchend', touchEndListener);
  document.onkeydown && (document.onkeydown = null);
  document.onkeyup && (document.onkeyup = null);
  // when not status.value, face detector will stop itself
  // when not status.value, hand detector will stop itself
  states.frame && (states.frame = null);
  states.logout && (states.logout = null);
  status.video && status.video.remove();
};

const refreshGame = async () => {
  const closing = { closable: false, closeOnEsc: false, maskClosable: false };
  const instance = dialog.warning({ title: '警告', iconPlacement: 'top', ...closing });
  status.value = false; // terminate current game
  instance.content = '渲染分辨率发生变化，页面将在 5 秒后刷新！';
  await mediapipe.waitForBeginning(1000);
  instance.content = '渲染分辨率发生变化，页面将在 4 秒后刷新！';
  await mediapipe.waitForBeginning(1000);
  instance.content = '渲染分辨率发生变化，页面将在 3 秒后刷新！';
  await mediapipe.waitForBeginning(1000);
  instance.content = '渲染分辨率发生变化，页面将在 2 秒后刷新！';
  await mediapipe.waitForBeginning(1000);
  instance.content = '渲染分辨率发生变化，页面将在 1 秒后刷新！';
  await mediapipe.waitForBeginning(1000);
  location.reload(); // refresh page for resize
};

const watched = (dst, src) => src[0] && src[1] && dst[0] && dst[1] && status.value && refreshGame();
const watches = () => [states.height, states.width]; // not screen.resized here

watch(watches, watched, { deep: true });
mediapipe.unsupportedUserAgent(navigator.userAgent) && (config.operate.face = false);
mediapipe.unsupportedUserAgent(navigator.userAgent) && (config.operate.hand = false);
mediapipe.unsupportedUserAgent(navigator.userAgent) && (config.operate.mouse = true);
mounted(prepareGame);
removed(destroyGame);
</script>

<style scoped lang="scss">
.load-wrap {
  position: absolute;
  left: 0; // fill page
  right: 0; // fill page
  top: 0; // fill page
  bottom: 0; // fill page
  background-image: url('@/assets/background.png');
}

.core-wrap {
  position: absolute;
  left: 0; // fill page
  right: 0; // fill page
  top: 0; // fill page
  bottom: 0; // fill page
  background-image: url('@/assets/background.png');
}

.text-load {
  margin-top: 2px;
  margin-bottom: 2px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 18px;
}

.space-load {
  margin: auto;
  padding-top: 0px;
  padding-bottom: 0px;
  width: 90%;
  height: 100%;
}

// ----------------------------------------------------------------

.game-header {
  opacity: 0.9;
  background-color: var(--n-color);
  z-index: 1; // show upper
  right: 0; // full width
  left: 0; // full width
  position: absolute;
  height: 44px;
}

.node-header-m {
  margin-left: 10px;
  margin-right: 10px;
  font-family: 'Kalam', sans-serif;
  margin-top: 6px;
  font-size: 24px;
}

.node-header-l {
  margin-left: 10px;
  font-family: 'Kalam', sans-serif;
  margin-top: 6px;
  font-size: 24px;
}

.node-header-r {
  margin-right: 10px;
  font-family: 'Kalam', sans-serif;
  margin-top: 6px;
  font-size: 24px;
}

// ----------------------------------------------------------------

.change-button {
  filter: drop-shadow(0 0 4px #7f7f7f);
  transition: all 0.6s ease;
  margin-top: 6px;
  margin-right: 10px;
  width: 32px;
}

.stop-button {
  filter: drop-shadow(0 0 4px #7f7f7f);
  transition: all 0.6s ease;
  margin-top: 6px;
  margin-right: 10px;
  width: 32px;
}

.change-button:hover {
  cursor: pointer;
  transform: scale(1.1, 1.1);
}

.stop-button:hover {
  cursor: pointer;
  transform: scale(1.1, 1.1);
}
</style>
