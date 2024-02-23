/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import { SnackbarService } from 'vue3-snackbar';
import 'vue3-snackbar/styles';

const app = createApp(App);

registerPlugins(app);

app.use(SnackbarService);

app.mount('#app');
