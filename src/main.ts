import { createApp } from 'vue'
import { store, storeKey } from './store';
import App from './App.vue'

const app = createApp(App)

app.use(store, storeKey);

app.mount('#app')

