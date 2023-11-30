import { defineStore } from 'pinia';

export default defineStore('config', {
  persist: true,
  state: () => ({
    platforms: 10, // enable config
    spring: 8 / 100, // enable config
    bomber: 1 / 100, // enable config
    generator: [
      { limit: 0 * 500, kinds: [1, 1, 1, 1, 1, 1] },
      { limit: 1 * 500, kinds: [1, 1, 1, 1, 2, 2] },
      { limit: 2 * 500, kinds: [1, 1, 1, 2, 2, 3] },
      { limit: 3 * 500, kinds: [2, 2, 2, 2, 3, 3] },
      { limit: 5 * 500, kinds: [2, 2, 2, 3, 3, 4] },
      { limit: 6 * 500, kinds: [2, 2, 3, 3, 4, 4] },
      { limit: 7 * 500, kinds: [2, 3, 3, 4, 4, 4] },
      { limit: 8 * 500, kinds: [2, 3, 4, 4, 4, 4] }
    ],
    operate: {
      keyboard: !0, // enable config
      face: !0, // enable config
      hand: !1, // enable config
      mouse: !1 // enable config
    },
    sensitive: {
      gravity: 1.0, // enable config
      strength: 1.0, // enable config
      platform: 1.0, // enable config
      keyboard: 1.0, // enable config
      face: 1.0, // enable config
      hand: 1.0, // enable config
      mouse: 1.0 // enable config
    },
    zooming: {
      dimension: {
        platform: { w: 0.165877, h: 0.030797 },
        broken: { w: 0.165877, h: 0.054348 },
        spring: { w: 0.061611, h: 0.054348 },
        bomber: { w: 0.061611, h: 0.054348 },
        player: { w: 0.130332, h: 0.072464 },
        ground: { w: 0.999999, h: 0.009058 }
      },
      vertical: {
        gravity: 3.62319e-4,
        upper: 2.89855e-2,
        lower: 1.44928e-2,
        falling: 1.44928e-2
      },
      horizontal: {
        platform: 2.36967e-3,
        activate: 2.36967e-3,
        keyboard: 2.36967e-2,
        face: 5.92417e-3,
        hand: 5.92417e-3,
        mouse: 3.55451e-3
      }
    },
    stroke: {
      enabled: false,
      current: 0,
      colors: [
        '#f5222d',
        '#faad14',
        '#52c41a',
        '#2f54eb',
        '#fa541c',
        '#fadb14',
        '#13c2c2',
        '#722ed1',
        '#fa8c16',
        '#a0d911',
        '#1677ff',
        '#eb2f96'
      ]
    }
  })
});
