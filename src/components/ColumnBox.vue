<template>
    <div :class="`p-6 rounded-lg shadow text-white ${color}`">
      <div class="flex items-center space-x-3">
        <div class="text-3xl">
          <i :class="iconClass"></i>
        </div>
        <h3 class="text-lg font-medium">{{ title }}</h3>
      </div>
      <p class="mt-2 text-sm">{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "ColumnBox",
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: "bg-blue-500",
      },
      iconClass: {
        type: String,
        default: "fas fa-icons",
      },
    },
  };
  </script>
  