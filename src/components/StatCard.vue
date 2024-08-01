<template>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div :class="iconBgClass" class="p-4">
        <i class="material-icons text-white text-4xl">{{ iconName }}</i>
      </div>
      <div class="px-4 text-gray-700">
        <h3 class="text-sm tracking-wider">{{ title }}</h3>
        <p class="text-3xl">{{ value }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StatCard',
    props: {
      iconName: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      iconBgClass: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  