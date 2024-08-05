import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css'; // TailwindCSS Declare
import axios from './axios'; // Import the configured axios
import '@mdi/font/css/materialdesignicons.css';

// Get the CSRF token default for Axios
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
} else {
  console.error('CSRF token not found');
}

// Set the Axios base URL
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// Set the CSRF token as a default header for Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Create Vue App
const app = createApp(App);
app.use(router);
app.mount('#app');
