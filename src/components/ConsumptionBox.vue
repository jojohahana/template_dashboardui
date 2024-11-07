<template>
  <div class="flex items-center p-4 space-x-4 bg-white rounded-lg shadow">
    <div :class="`p-6 text-white ${iconColor} rounded-full`">
      <i :class="iconClass"></i>
    </div>
    <div>
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <p class="text-xl font-bold">{{ displayValue }} kWh</p> <!-- Display computed value -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsumptionBox',
  props: {
    title: {
      type: String, 
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    iconClass: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: true
    }
  },
  computed: {
    displayValue() {
      return this.value !== null && this.value !== undefined && this.value !== 'N/A'
        ? this.value
        : 'N/A';
    }
  }
};
</script>
