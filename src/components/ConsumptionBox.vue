<template>
    <div class="flex items-center p-4 space-x-4 bg-white rounded-lg shadow">
      <div :class="`p-6 text-white ${iconColor} rounded-full`">
        <i :class="iconClass"></i>
      </div>
      <div>
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="text-xl font-bold">{{ value }} kWh</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      value: Number,
      iconClass: String,
      iconColor: String
    }
  };
  </script>
  