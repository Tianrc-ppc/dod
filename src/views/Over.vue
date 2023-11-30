<template>
  <div class="main-container">
    <n-p class="upper-title" :style="{ fontSize: states.width / 8.4 + 'px' }">Game Over</n-p>
    <n-p class="lower-title" :style="{ fontSize: states.width / 7.6 + 'px' }">You Got {{ states.capture.score }} !</n-p>
    <img :src="playerUrl" class="player" />
    <img :src="platformUrlA" class="platform-stable" />
    <img :src="platformUrlB" class="platform-moving-a" />
    <img :src="platformUrlB" class="platform-moving-b" />
    <img :src="platformUrlB" class="platform-moving-c" />
    <img :src="platformUrlC" class="platform-fake" />
    <img :src="platformUrlE" class="platform-once" />
    <img :src="buttonRestartUrl" class="game-button" @click="$router.push('game')" />
    <img :src="buttonSettingUrl" class="conf-button" @click="$router.push('conf')" />
  </div>
</template>

<script setup>
import playerUrl from '@/assets/player-a.png';
import platformUrlA from '@/assets/platforms/platform-a.png';
import platformUrlB from '@/assets/platforms/platform-b.png';
import platformUrlC from '@/assets/platforms/platform-c.png';
import platformUrlE from '@/assets/platforms/platform-e.png';
import buttonRestartUrl from '@/assets/buttons/restart.png';
import buttonSettingUrl from '@/assets/buttons/setting.png';
import { NP } from 'naive-ui';
import configStore from '@/stores/config';
import statesStore from '@/stores/states';

const config = configStore();
const states = statesStore();
config || states;
</script>

<style scoped lang="scss">
.main-container {
  position: absolute;
  left: 0; // fill page
  right: 0; // fill page
  top: 0; // fill page
  bottom: 0; // fill page
  background-image: url('@/assets/background.png');
}

// ----------------------------------------------------------------

.upper-title {
  margin-top: 4%;
  font-family: 'Kalam', sans-serif;
  color: transparent;
  filter: drop-shadow(0 0 6px #7f7f7f);
  background-image: linear-gradient(90deg, transparent, #fa541c, transparent);
  background-color: #ad2102;
  background-repeat: no-repeat;
  background-position: -10% -10%;
  background-size: 15% 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: light1 8s infinite linear;
  transition: all 0.6s ease;
}

.lower-title {
  margin-top: -5%;
  font-family: 'Kalam', sans-serif;
  color: transparent;
  filter: drop-shadow(0 0 6px #7f7f7f);
  background-image: linear-gradient(90deg, transparent, #fa541c, transparent);
  background-color: #ad2102;
  background-repeat: no-repeat;
  background-position: -20% -20%;
  background-size: 15% 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  animation: light2 8s infinite linear;
  transition: all 0.6s ease;
}

.upper-title:hover {
  cursor: default;
  transform: scale(1.1, 1.1);
  transition: all 0.6s ease;
}

.lower-title:hover {
  cursor: default;
  transform: scale(1.1, 1.1);
  transition: all 0.6s ease;
}

@keyframes light1 {
  100% {
    background-position: 110% 110%;
  }
}

@keyframes light2 {
  100% {
    background-position: 120% 120%;
  }
}

// ----------------------------------------------------------------

.game-button {
  position: absolute;
  filter: drop-shadow(0 0 6px #7f7f7f);
  left: 67%; // fixed position
  top: 62%; // fixed position
  animation: zooming 1.5s ease infinite;
  width: 15%;
}

.conf-button {
  position: absolute;
  filter: drop-shadow(0 0 6px #7f7f7f);
  left: 67%; // fixed position
  top: 80%; // fixed position
  animation: zooming 1.5s ease infinite;
  width: 15%;
}

.game-button:hover {
  cursor: pointer;
}

.conf-button:hover {
  cursor: pointer;
}

@keyframes zooming {
  50% {
    transform: scale(1.1, 1.1);
  }
}

// ----------------------------------------------------------------

.player {
  position: absolute;
  left: 20%; // fixed position
  top: 78%; // fixed position
  animation: jumping 2s ease-in-out infinite;
  width: 13%;
}

.platform-stable {
  position: absolute;
  left: 20%; // fixed position
  top: 85%; // fixed position
  width: 14%;
}

.platform-fake {
  position: absolute;
  left: 35%; // fixed position
  top: 65%; // fixed position
  width: 14%;
}

.platform-once {
  position: absolute;
  left: 5%; // fixed position
  top: 75%; // fixed position
  width: 14%;
}

.platform-moving-a {
  position: absolute;
  left: 86%; // fixed position
  top: 55%; // fixed position
  animation: moving1 6s linear infinite;
  width: 14%;
}

.platform-moving-b {
  position: absolute;
  left: 0%; // fixed position
  top: 45%; // fixed position
  animation: moving2 6s linear infinite;
  width: 14%;
}

.platform-moving-c {
  position: absolute;
  left: 43%; // fixed position
  top: 35%; // fixed position
  animation: moving3 6s linear infinite;
  width: 14%;
}

@keyframes jumping {
  50% {
    top: 58%;
  }
}

@keyframes moving1 {
  50% {
    left: 0%;
  }
}

@keyframes moving2 {
  50% {
    left: 86%;
  }
}

@keyframes moving3 {
  25% {
    left: 0%;
  }

  75% {
    left: 86%;
  }
}
</style>
