import { defineStore } from 'pinia';

export default defineStore('states', {
  persist: false,
  state: () => ({
    frame: null,
    logout: null,
    height: null,
    width: null,
    platforms: null,
    ground: null,
    player: null,
    factory: null,
    capture: {
      direction: 0,
      stopped: 0,
      score: 0,
      keyboard: { location: null, movement: 0 },
      face: { location: null, movement: 0 },
      hand: { location: null, movement: 0 },
      mouse: { location: null, movement: 0 }
    },
    variable: {
      dimension: {
        platform: { w: null, h: null },
        broken: { w: null, h: null },
        spring: { w: null, h: null },
        bomber: { w: null, h: null },
        player: { w: null, h: null },
        ground: { w: null, h: null }
      },
      vertical: {
        gravity: null,
        upper: null,
        lower: null,
        falling: null
      },
      horizontal: {
        platform: null,
        activate: null,
        keyboard: null,
        face: null,
        hand: null,
        mouse: null
      }
    }
  })
});
