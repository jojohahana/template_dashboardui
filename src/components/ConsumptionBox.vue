<template>
  <div class="flex items-center p-4 space-x-4 bg-white rounded-lg shadow">
    <div :class="`p-3 text-white ${iconColor} rounded-full`">
      <i :class="iconClass"></i>
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <div class="flex flex-wrap items-baseline space-x-2">
        <!-- Adjust text size and add responsive styling to fit within the box -->
        <p class="text-2xl font-bold leading-tight text-gray-900">{{ formattedValue }} kWh</p>
        <p class="text-xl font-semibold leading-tight text-green-600">{{ formattedValueRupiah }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConsumptionBox',
  props: {
    title: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    valueRupiah: {
      type: Number,
      required: true
    }
  },
  computed: {
  // Format value (gap) to kWh with 3 decimal places
  formattedValue() {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(this.value / 1000); // Convert from Wh to kWh
  },
  // Format valueRupiah with currency symbol for IDR
  formattedValueRupiah() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0 // Use 0 decimals for rounded values
    }).format(this.valueRupiah);
  }
}
,
  mounted() {
    axios.get('/api/getvaltoday')
      .then(response => {
        this.wbpLwbpSum = response.data.wbp_lwbp_sum;
        this.costInRupiah = response.data.cost_in_rupiah;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
};
</script>

<style scoped>
/* Additional styling, if needed */
</style>
