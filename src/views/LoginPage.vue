<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-16 w-auto" src="/ojilogo-removebg-preview.png" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :style="{ backgroundColor: '#4CA9CB' }"
            >
              Sign in
            </button>
          </div>
        </form>
        <p v-if="error" class="mt-4 text-center text-sm text-red-500">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Import the configured axios
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async login() {
        try {
          console.log('Login attempt with', { email: this.email, password: this.password });
          const response = await axios.post('http://127.0.0.1:8000/login', { //post to route laravel 
            email: this.email,
            password: this.password,
          });
          console.log('Login responese', response);
          if (response.status === 200) {
            this.$router.push('/home');
          }
        } catch (error) {
          console.error(error); //to show error in console
          if (error.response && error.response.status === 401) {
            this.error = 'Invalid credentials. Please try again.';
          } else {
            this.error = 'An error occurred. Please try again.';
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles for your component here */
  </style>
  