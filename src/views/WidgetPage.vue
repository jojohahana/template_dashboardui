<template>
    <div>
      <!-- Add other widgets here -->
      <TotalMemberWidget />
      <ServerLoadWidget />
      <TotalPostWidget />
    </div>
  </template>
  
  <script>
  import ServerLoadWidget from '@/components/ServerLoadWidget.vue';
  import TotalMemberWidget from '../components/TotalMemberWidget.vue';
  import TotalPostWidget from '@/components/TotalPostWidget.vue';
  
  export default {
    components: {
      TotalMemberWidget,
      ServerLoadWidget,
      TotalPostWidget
    },
    name: 'WidgetPage'
  }
  </script>
  
  <style scoped>
  /* Add any scoped styles if needed */
  </style>
  