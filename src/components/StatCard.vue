<template>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
      <div :class="iconBgClass" class="p-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path :d="iconPath" />
        </svg>
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
      iconPath: {
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
  