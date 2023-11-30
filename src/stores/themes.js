import { defineStore } from 'pinia';

export default defineStore('themes', {
  persist: true,
  state: () => ({
    type: 'auto',
    range: {
      upper: 7,
      lower: 22
    }
  })
});
