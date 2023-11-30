import { defineStore } from 'pinia';

export default defineStore('screen', {
  persist: false,
  state: () => ({
    height: document.body.clientHeight,
    width: document.body.clientWidth,
    pc: document.body.clientWidth >= 1080,
    mb: document.body.clientWidth <= 640,
    resized: false
  })
});
