<template>
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">
    <!-- Header Section with Date and Weather -->
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <!-- Address and Status -->
      <div>
        <h2 class="text-xl font-semibold md:text-2xl">450 FASHION AVE, NY, USA</h2>
        <p class="text-sm text-gray-500">Total Panel: 16 units | ROI: 70%</p>
      </div>

      <!-- Date and Weather -->
      <div class="flex items-center space-x-4">
        <!-- Date -->
        <div>
          <p class="text-lg font-semibold">{{ formattedDate }}</p>
        </div>
        <!-- Weather -->
        <div class="flex items-center space-x-2" v-if="weather">
          <img :src="weatherIconUrl" alt="Weather Icon" class="w-8 h-8" />
          <p class="text-sm font-semibold">{{ weather.main.temp }}°C, {{ weather.weather[0].description }}</p>
        </div>
      </div>
    </div>

    <!-- Monthly Energy Usage in Boxed Format -->
    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- June -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h3 class="text-lg font-semibold">June</h3>
        <p class="text-xl font-bold">280 kWh</p>
      </div>
      <!-- July -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h3 class="text-lg font-semibold">July</h3>
        <p class="text-xl font-bold">301 kWh</p>
      </div>
      <!-- August -->
      <div class="p-4 bg-white rounded-lg shadow">
        <h3 class="text-lg font-semibold">August</h3>
        <p class="text-xl font-bold">189 kWh</p>
      </div>
    </div>

    <!-- Energy Production Chart -->
    <div class="p-6 mb-6 bg-white rounded-lg shadow">
      <h3 class="mb-4 text-lg font-semibold">Energy Produced</h3>
      <!-- Replace with chart component -->
      <div class="flex items-center justify-center h-48 text-gray-500 bg-gray-200 rounded-lg md:h-64">
        [Chart goes here]
      </div>
    </div>

    <!-- Current State and Home Energy Consumption -->
    <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
      <!-- Current State -->
      <div class="w-full p-6 bg-white rounded-lg shadow lg:w-1/2">
        <h3 class="mb-4 text-lg font-semibold">Current State</h3>
        <div class="flex justify-between mb-2">
          <span>Exported Energy - 7.5 kWh</span>
          <span>58%</span>
        </div>
        <div class="h-2 mb-4 bg-blue-200 rounded-full">
          <div class="h-2 bg-blue-500 rounded-full" style="width: 58%"></div>
        </div>
        <div class="flex justify-between mb-2">
          <span>Selfuse Energy - 6.5 kWh</span>
          <span>42%</span>
        </div>
        <div class="h-2 bg-orange-200 rounded-full">
          <div class="h-2 bg-orange-500 rounded-full" style="width: 42%"></div>
        </div>
      </div>

      <!-- Home Energy Consumption -->
      <div class="w-full p-6 bg-white rounded-lg shadow lg:w-1/2">
        <h3 class="mb-4 text-lg font-semibold">Home Energy Consumption</h3>
        <ul class="space-y-2">
          <li class="flex justify-between">
            <span>Maximal Used - 38%</span>
            <span>0.8 kWh</span>
          </li>
          <li class="flex justify-between">
            <span>Meter Energy - 27%</span>
            <span>2.358 kWh</span>
          </li>
          <!-- Add other data as needed -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardComponent',
  data() {
    return {
      weather: null,
      formattedDate: '',
    };
  },
  computed: {
    weatherIconUrl() {
      if (this.weather && this.weather.weather[0].icon) {
        return `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
      }
      return '';
    }
  },
  methods: {
    formatDate() {
      const today = new Date();
      const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
      this.formattedDate = today.toLocaleDateString('en-GB', options);
    },
    async fetchWeather() {
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
      const city = 'New York'; // Replace with the city you want to track
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          this.weather = await response.json();
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  },
  mounted() {
    this.formatDate();
    this.fetchWeather();
  }
};
</script>

<style scoped>
/* Add custom styling here if needed */
</style>
