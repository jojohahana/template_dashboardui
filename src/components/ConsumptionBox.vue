<template>
  <div class="flex items-center p-4 space-x-4 bg-white rounded-lg shadow">
    <div :class="`p-6 text-white ${iconColor} rounded-full`">
      <i :class="iconClass"></i>
    </div>
    <div>
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <div class="flex space-x-4">
        <p class="text-xl font-bold">{{ formattedValue }} kWh</p>
        <p class="text-xl font-bold">{{ formattedValueRupiah }}</p>
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
    // Format total_value as "24.818 kWh" with thousand separators and rounding
    formattedValue() {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      }).format(this.value / 1000);
    },
    // Format total_value_in_rupiah as "Rp. 28.381.407,78" with thousand separators and currency symbol
    formattedValueRupiah() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2
      }).format(this.valueRupiah);
    }
  },
  mounted() {
    axios.get('/api/getCostRupiah')
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
