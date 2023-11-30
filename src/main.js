import App from '@/App.vue';
import { createApp } from 'vue';

import { history, routes } from '@/router/routes';
import { createRouter } from '@/router/wrap';
import { createPinia } from '@/stores/wrap';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// font for naive-ui
import 'vfonts/FiraCode.css';
// font for naive-ui
import 'vfonts/Lato.css';
// extra index font
import '@fontsource/satisfy';
// extra score font
import '@fontsource/kalam';

const router = createRouter({ history, routes });

const pinia = createPinia();

router.beforeEach((to) => {
  const buf = to.matched.map((i) => i.meta['title']).filter((i) => i);
  document.title = ['Loading', ...buf, '...'].join(' ');
});

router.afterEach((to) => {
  const buf = to.matched.map((i) => i.meta['title']).filter((i) => i);
  document.title = ['Doddle', 'Jump', ...buf].join(' ');
});

pinia.use(
  createPersistedState({
    storage: localStorage,
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse
    }
  })
);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
