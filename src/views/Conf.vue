<template>
  <div class="setting-container">
    <n-space justify="space-between" align="center" class="setting-header">
      <n-button class="node-header-l" text @click="handleGoBak">
        <n-icon><keyboard-arrow-left-round /></n-icon>
      </n-button>
      <n-button class="node-header-m" text @click="refresher">
        <n-p class="node-header-m">设置</n-p>
      </n-button>
      <n-button class="node-header-r" text @click="handleGoTop">
        <n-icon><arrow-upward-round /></n-icon>
      </n-button>
    </n-space>
    <div class="node-container-u">
      <n-card hoverable title="主题设置">
        <n-p>我们会根据时间选择颜色主题，您可以调整采用不同主题的时间范围，也可以直接指定主题。</n-p>
        <n-space vertical>
          <n-radio-group v-model:value="themes.type">
            <n-radio-button value="light" label="亮色" />
            <n-radio-button value="dark" label="暗色" />
            <n-radio-button value="auto" label="自动" />
          </n-radio-group>
          <n-space align="center">
            <n-p>开始时间</n-p>
            <n-input-number
              v-model:value="themes.range.upper"
              :disabled="themes.type !== 'auto'"
              :max="themes.range.lower"
              :min="0"
            />
          </n-space>
          <n-space align="center">
            <n-p>结束时间</n-p>
            <n-input-number
              v-model:value="themes.range.lower"
              :disabled="themes.type !== 'auto'"
              :min="themes.range.upper"
              :max="24"
            />
          </n-space>
        </n-space>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="游戏基础设置">
        <n-p>您可以在一定范围内自由调整：游戏内平台的数量、弹簧刷出的概率、炸弹刷出的概率。</n-p>
        <n-space vertical>
          <n-space align="center">
            <n-p>平台数量</n-p>
            <n-input-number v-model:value="config.platforms" :min="8" :max="12" />
          </n-space>
          <n-space align="center">
            <n-p>弹簧刷出率</n-p>
            <n-input-number v-model:value="config.spring" :min="0" :max="1" :step="0.01" :precision="2" />
          </n-space>
          <n-space align="center">
            <n-p>炸弹刷出率</n-p>
            <n-input-number v-model:value="config.bomber" :min="0" :max="1" :step="0.01" :precision="2" />
          </n-space>
        </n-space>
        <template #header-extra>
          <n-button secondary round type="warning" @click="reset.resetGameBasicConfig">重置</n-button>
        </template>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="操作基础设置">
        <n-p>您可以在“摇头操作”、“挥手操作”、“触控操作”中选择一个，您也可以启用或关闭方向键操作。</n-p>
        <n-space vertical>
          <n-radio :checked="config.operate.face" @change="handleFace">启用摇头操作</n-radio>
          <n-radio :checked="config.operate.hand" @change="handleHand">启用挥手操作</n-radio>
          <n-radio :checked="config.operate.mouse" @change="handleMouse">启用触控操作</n-radio>
          <n-checkbox v-model:checked="config.operate.keyboard">启用方向键操作</n-checkbox>
        </n-space>
        <template #header-extra>
          <n-button secondary round type="warning" @click="reset.resetSwitcherConfig">重置</n-button>
        </template>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="游戏敏感度设置">
        <n-p>您可以设置“场景重力加速度”、“玩家弹跳加速度”、“平台移速系数”以适应您的习惯。</n-p>
        <n-p>上述各个系数均在 0.5 到 2 的范围内，并通过乘法方式产生影响。</n-p>
        <n-space vertical>
          <n-p>场景重力加速度</n-p>
          <n-slider v-model:value="config.sensitive.gravity" :min="0.5" :max="2" :step="0.1" />
          <n-p>玩家弹跳加速度</n-p>
          <n-slider v-model:value="config.sensitive.strength" :min="0.5" :max="2" :step="0.1" />
          <n-p>平台移速系数</n-p>
          <n-slider v-model:value="config.sensitive.platform" :min="0.5" :max="2" :step="0.1" />
        </n-space>
        <template #header-extra>
          <n-button secondary round type="warning" @click="reset.resetAdapterConfig">重置</n-button>
        </template>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="操作敏感度设置">
        <n-p>您可以设置“方向键敏感度”、“摇头敏感度”、“挥手敏感度”、“触控敏感度”以适应您的习惯。</n-p>
        <n-p>上述各个系数均在 0.5 到 2 的范围内，并通过乘法方式产生影响。</n-p>
        <n-space vertical>
          <n-p>方向键敏感度</n-p>
          <n-slider v-model:value="config.sensitive.keyboard" :min="0.5" :max="2" :step="0.1" />
          <n-p>摇头敏感度</n-p>
          <n-slider v-model:value="config.sensitive.face" :min="0.5" :max="2" :step="0.1" />
          <n-p>挥手敏感度</n-p>
          <n-slider v-model:value="config.sensitive.hand" :min="0.5" :max="2" :step="0.1" />
          <n-p>触控敏感度</n-p>
          <n-slider v-model:value="config.sensitive.mouse" :min="0.5" :max="2" :step="0.1" />
        </n-space>
        <template #header-extra>
          <n-button secondary round type="warning" @click="reset.resetSensitivityConfig">重置</n-button>
        </template>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="高级设置">
        <n-space vertical>
          <n-p>“清除本地存储”会清空 localStorage 中的内容。</n-p>
          <n-popconfirm :show-icon="false" @positive-click="reset.resetStorage">
            <n-p>您确定进行这个操作吗</n-p>
            <template #trigger>
              <n-button round>清除本地存储</n-button>
            </template>
          </n-popconfirm>
          <n-p>“清除全部配置”会将上面各项设置全部重置。</n-p>
          <n-popconfirm :show-icon="false" @positive-click="reset.resetConfig">
            <n-p>您确定进行这个操作吗</n-p>
            <template #trigger>
              <n-button round>清除全部配置</n-button>
            </template>
          </n-popconfirm>
          <n-p>“开启判定渲染”将额外渲染游戏元素判定信息。</n-p>
          <n-popconfirm :show-icon="false" @positive-click="handleStrokeEnable">
            <n-p>您确定进行这个操作吗</n-p>
            <template #trigger>
              <n-button round :disabled="config.stroke.enabled">开启判定渲染</n-button>
            </template>
          </n-popconfirm>
          <n-p>“关闭判定渲染”将不再渲染游戏元素判定信息。</n-p>
          <n-popconfirm :show-icon="false" @positive-click="handleStrokeRemove">
            <n-p>您确定进行这个操作吗</n-p>
            <template #trigger>
              <n-button round :disabled="!config.stroke.enabled">关闭判定渲染</n-button>
            </template>
          </n-popconfirm>
        </n-space>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="隐私细节说明">
        <n-blockquote>
          我们非常重视您的隐私和数据安全，因此制定了以下隐私说明，以确保您对我们的数据处理方式有清晰的了解。
        </n-blockquote>
        <n-p v-for="(value, index) in privDetail" :key="index">{{ value }}</n-p>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-card hoverable title="技术细节说明">
        <n-blockquote>
          我们在开发过程中采用了一系列先进的技术，以打造一个强大而友好的应用，满足用户对现代化和创新性的期望。
        </n-blockquote>
        <n-p v-for="(value, index) in techDetail" :key="index">{{ value }}</n-p>
      </n-card>
    </div>
    <div class="node-container-d">
      <n-divider :style="{ height: states.height / 5 + 'px' }">
        <img v-if="egg" :src="woodFishUrl" :style="zooming" class="wood-fish" @click="handleEgg" />
        <div v-if="!egg" class="player-wrapper">
          <img v-if="lhs" :src="playerUrlA" class="player-egg-a" @click="handleEgg" />
          <img v-if="rhs" :src="playerUrlB" class="player-egg-b" @click="handleEgg" />
        </div>
      </n-divider>
    </div>
    <n-modal v-model:show="modal" preset="dialog" type="warning" icon-placement="top">
      <n-p v-for="(value, index) in wxApologize" :key="index" class="apologize-text">{{ value }}</n-p>
      <template #header>
        <div>警告</div>
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMessage } from 'naive-ui';
import { NModal } from 'naive-ui';
import { NSpace } from 'naive-ui';
import { NDivider } from 'naive-ui';
import { NCard } from 'naive-ui';
import { NCheckbox } from 'naive-ui';
import { NRadio } from 'naive-ui';
import { NRadioGroup } from 'naive-ui';
import { NRadioButton } from 'naive-ui';
import { NSlider } from 'naive-ui';
import { NInputNumber } from 'naive-ui';
import { NPopconfirm } from 'naive-ui';
import { NButton } from 'naive-ui';
import { NP } from 'naive-ui';
import { NIcon } from 'naive-ui';
import { NBlockquote } from 'naive-ui';
import { KeyboardArrowLeftRound } from '@vicons/material';
import { ArrowUpwardRound } from '@vicons/material';
import { useRouter } from 'vue-router';
import playerUrlA from '@/assets/player-a.png';
import playerUrlB from '@/assets/player-b.png';
import woodFishUrl from '@/assets/wood-fish.png';
import configStore from '@/stores/config';
import statesStore from '@/stores/states';
import themesStore from '@/stores/themes';
import * as mediapipe from '@/utils/mediapipe';
import * as reset from '@/utils/reset';

const config = configStore();
const states = statesStore();
const themes = themesStore();
const router = useRouter();
const message = useMessage();

const modal = ref(false);
const counter = ref(1);
const zooming = ref(0);
const egg = computed(() => counter.value > 16);
const lhs = computed(() => counter.value <= 16 && (counter.value & 1) === 1);
const rhs = computed(() => counter.value <= 16 && (counter.value & 1) === 0);
const refresher = () => (counter.value = 1);
const increase = () => (zooming.value = { transform: 'scale(1.1, 1.1)' });
const decrease = () => (zooming.value = { transform: 'scale(1.0, 1.0)' });

const privDetail = [
  '我们的服务可能会使用摄像头功能，我们承诺摄像头采集的影像仅在您的设备使用。我们不会在服务端收集、存储或使用您的摄像头数据（服务器性能也扛不住）。',
  '您的所有设置都存储在您的设备的本地存储中；您的所有操作都将在您的设备上直接进行处理。我们承诺不会在服务端收集、存储或使用您的设置数据和操作数据。',
  '我们的服务端仅会收集与前端静态资源请求相关的信息，用于分析和改进服务性能。这些信息仅限于请求的资源类型、请求时间戳等技术性数据，不包含敏感信息。'
];

const techDetail = [
  '我们选择使用 Vite 作为项目的构建工具，并结合 Vue.js 作为 Web 前端页面框架。为了实现一致而美观的用户界面，我们选择使用 Naive UI 作为项目的组件库。',
  '为了增强页面的视觉效果，我们引入了 VFont 字体库以及 XIcons 图标库。VFont 字体库提供了丰富的字体选择，而 XIcons 图标库则为项目提供了一系列矢量图标。',
  '为了实现姿势识别和手势识别功能，我们集成了 MediaPipe 这一强大的开源框架。通过该框架，我们能够轻松地进行姿势和手势识别，为用户提供更丰富的交互体验。'
];

const wxApologize = [
  '微信或 QQ 自带的浏览器不支持“摇头操作”和“挥手操作”，请使用系统浏览器体验相关功能。',
  '如果您正在使用手机访问此页面，请点击右上角的三个点，选择在默认浏览器中打开。',
  '如果您正在使用电脑访问此页面，请复制网址并粘贴到 Chrome 或 Firefox 浏览器中打开。',
  '由此带来的使用上的诸多不便，您应该让腾讯公司微信及 QQ 开发团队向您深表歉意。'
];

const handleGoTop = () => {
  window.$scroll({ top: 0, behavior: 'smooth' });
};

const handleGoBak = () => {
  router.push('/');
};

const handleStrokeEnable = () => {
  config.stroke.enabled = true;
};

const handleStrokeRemove = () => {
  config.stroke.enabled = false;
};

const handleFace = () => {
  config.operate.mouse = false;
  config.operate.hand = false;
  config.operate.face = true;
  modal.value = mediapipe.unsupportedUserAgent(navigator.userAgent);
  modal.value && handleMouse();
};

const handleHand = () => {
  config.operate.mouse = false;
  config.operate.face = false;
  config.operate.hand = true;
  modal.value = mediapipe.unsupportedUserAgent(navigator.userAgent);
  modal.value && handleMouse();
};

const handleMouse = () => {
  config.operate.face = false;
  config.operate.hand = false;
  config.operate.mouse = true;
};

const handleEgg = () => {
  counter.value > 16 && counter.value % 10 === 6 && increase() && setTimeout(decrease, 100);
  counter.value > 16 && counter.value % 10 !== 6 && increase() && setTimeout(decrease, 100);
  counter.value > 16 && counter.value % 10 === 6 && message.success('再接再厉！', { duration: 1500, max: 6 });
  counter.value > 16 && counter.value % 10 !== 6 && message.success('功德加一！', { duration: 1500, max: 6 });
  counter.value === 4 && message.info('再点 12 次会发生什么呢？', { duration: 3000, max: 6 });
  counter.value === 8 && message.info('再点 8 次会发生什么呢？', { duration: 3000, max: 6 });
  counter.value === 12 && message.info('再点 4 次会发生什么呢？', { duration: 3000, max: 6 });
  counter.value++ === 16 && message.info('赛博木鱼已开启！', { duration: 3000, max: 6 });
};

mediapipe.unsupportedUserAgent(navigator.userAgent) && (config.operate.face = false);
mediapipe.unsupportedUserAgent(navigator.userAgent) && (config.operate.hand = false);
mediapipe.unsupportedUserAgent(navigator.userAgent) && (config.operate.mouse = true);
</script>

<style scoped lang="scss">
.setting-container {
  display: block;
  height: 100%;
  width: 100%;
  background-image: url('@/assets/background.png');
}

.apologize-text {
  text-align: left;
}

// ----------------------------------------------------------------

.setting-header {
  opacity: 0.9;
  background-color: var(--n-color);
  z-index: 1; // show upper
  right: 0; // full width
  left: 0; // full width
  position: absolute;
}

.node-header-m {
  margin-bottom: 2.5px;
  margin-top: 2.5px;
  font-size: 18px;
}

.node-header-l {
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 24px;
}

.node-header-r {
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 24px;
}

// ----------------------------------------------------------------

.node-container-u {
  opacity: 0.9;
  padding-top: 60px; // beginning
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  text-align: left;
}

.node-container-d {
  opacity: 0.9;
  padding-top: 0px; // following
  padding-bottom: 5%;
  padding-left: 5%;
  padding-right: 5%;
  text-align: left;
}

.player-wrapper {
  margin-top: 300%;
  animation: jumping 2s ease-in-out infinite;
}

@keyframes jumping {
  50% {
    margin-top: -300%;
  }
}

// ----------------------------------------------------------------

.wood-fish {
  width: 100%;
  filter: drop-shadow(0 0 6px #7f7f7f);
  transition: all 0.3s ease;
}

.player-egg-a {
  width: 140%;
  transition: all 0.6s ease;
}

.player-egg-b {
  width: 140%;
  transition: all 0.6s ease;
}

.wood-fish:hover {
  cursor: pointer;
  filter: drop-shadow(0 0 12px #7f7f7f);
}

.player-egg-a:hover {
  cursor: pointer;
  transform: scale(1.1, 1.1);
}

.player-egg-b:hover {
  cursor: pointer;
  transform: scale(1.1, 1.1);
}
</style>
