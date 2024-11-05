<template>
    <div class="w-full p-6 bg-white rounded-lg shadow">
      <h3 class="mb-4 text-lg font-semibold">Current State</h3>
      <div class="flex justify-between mb-2" v-for="(state, index) in states" :key="index">
        <span>{{ state.label }} - {{ state.value }} kWh</span>
        <span>{{ state.percentage }}%</span>
      </div>
      <div v-for="(state, index) in states" :key="index" class="h-2 mb-4 rounded-full" :class="state.bgClass">
        <div :class="state.fillClass" :style="{ width: `${state.percentage}%` }"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      states: Array
    }
  };
  </script>
  