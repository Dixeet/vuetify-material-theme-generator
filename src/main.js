import { createApp } from 'vue';
import App from './App.vue';
import '~/assets/styles/main.scss';
import vuetify from './plugins/vuetify.js';
import consoleVlog from '@rodrive/console-vlog';

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    /* eslint-disable-next-line no-console */
    console.clear();
  });
}

const app = createApp(App).use(vuetify);

if (import.meta.env.MODE === 'development') {
  app.use(consoleVlog, { override: false });
}

app.mount('#app');
