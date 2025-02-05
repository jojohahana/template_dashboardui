<template>
  <div class="flex items-center p-4 space-x-4 bg-white rounded-lg shadow">
    <div :class="`p-4 text-white ${iconColor} rounded-full`">
      <i :class="iconClass"></i>
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <div class="flex flex-wrap items-baseline space-x-2">
        <p class="text-2xl font-bold leading-tight text-gray-900">{{ formattedValue }} kWh</p>
        <p class="text-xl font-semibold leading-tight text-blue-800">{{ formattedValueRupiah }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsumptionBox',
  props: {
    title: { type: String, required: true },
    iconClass: { type: String, required: true },
    iconColor: { type: String, required: true },
    value: { type: Number, required: true, default: 0 },
    valueRupiah: { type: Number, required: true }
  },
  computed: {
    formattedValue() {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(this.value);
    },
    formattedValueRupiah() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
      }).format(this.valueRupiah);
    }
  }
};
</script>

<style scoped>
/* Additional styling, if needed */
</style>
