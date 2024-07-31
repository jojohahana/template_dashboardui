import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css' //TailwindCSS Declare
import axios from 'axios'


// Get the CSRF token from the meta tag
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
} else {
    console.error('CSRF token not found');
}

// Set the CSRF token as a default header for Axios
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

// Optionally, set the base URL for your API requests
// axios.defaults.baseURL = process.env.MIX_APP_URL || 'http://localhost:8000'

//Create Vue App
const app = createApp(App);
app.use(router);
app.mount('#app');
