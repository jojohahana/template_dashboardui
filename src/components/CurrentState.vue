<template>
    <!-- Current State and Home Energy Consumption -->
    <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
      <!-- 1st State  -->
      <div class="w-full p-4 bg-white rounded-lg shadow lg:w-1/2">
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

      <!-- 2nd State  -->
      <div class="w-full p-4 bg-white rounded-lg shadow lg:w-1/2">
        <h3 class="mb-4 text-lg font-semibold">LWBP - WBP Consumption</h3>
        <ul class="space-y-2">
          <li class="flex justify-between">
            <span>LWBP (22:01 - 17:59) - 38%</span>
            <span>0.8 kWh</span>
          </li>
          <li class="flex justify-between">
            <span>WBP (18:00 - 22:00) - 27%</span>
            <span>2.358 kWh</span>
          </li>
          <!-- Add other data as needed -->
        </ul>
      </div>
      
      <!-- 3rd State  -->
      <div class="w-full p-4 bg-white rounded-lg shadow lg:w-1/2">
        <h3 class="mb-4 text-lg font-semibold">Consumption Percentage</h3>
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
    </div>
</template>

<script>
// export default {
//   name: 'DashboardComponent',
//   data() {
//     return {
//       weather: null,
//       formattedDate: '',
//     };
//   },
//   computed: {
//     weatherIconUrl() {
//       if (this.weather && this.weather.weather[0].icon) {
//         return `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
//       }
//       return '';
//     }
//   },
//   methods: {
//     formatDate() {
//       const today = new Date();
//       const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
//       this.formattedDate = today.toLocaleDateString('en-GB', options);
//     },
//     async fetchWeather() {
//       const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
//       const city = 'New York'; // Replace with the city you want to track
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//       try {
//         const response = await fetch(url);
//         if (response.ok) {
//           this.weather = await response.json();
//         } else {
//           console.error('Failed to fetch weather data');
//         }
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//       }
//     }
//   },
//   mounted() {
//     this.formatDate();
//     this.fetchWeather();
//   }
// };
</script>

<style scoped>
/* Add custom styling here if needed */
</style>
