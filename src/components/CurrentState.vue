<template>
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
    <!-- <div class="w-full p-6 bg-white rounded-lg shadow">
      <h3 class="mb-4 text-lg font-semibold">Current State</h3>
      <div class="flex justify-between mb-2" v-for="(state, index) in states" :key="index">
        <span>{{ state.label }} - {{ state.value }} kWh</span>
        <span>{{ state.percentage }}%</span>
      </div>
      <div v-for="(state, index) in states" :key="index" class="h-2 mb-4 rounded-full" :class="state.bgClass">
        <div :class="state.fillClass" :style="{ width: `${state.percentage}%` }"></div>
      </div>
    </div> -->
  </template>
  
  <script>
  export default {
    props: {
      states: Array
    }
  };
  </script>
  