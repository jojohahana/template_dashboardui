<template>
    <div class="flex items-center overflow-hidden bg-white border rounded-sm shadow w-80">
      <div :class="iconBgClass" class="p-4">
        <i class="text-4xl text-white material-icons">{{ iconName }}</i>
      </div>
      <div class="px-12 text-gray-700">
        <h3 class="text-sm tracking-wider">{{ title }}</h3>
        <p class="text-2xl">{{ value }}</p>
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
        type: [String, Number],
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
  