<template>
  <div class="p-4 rounded-lg shadow-lg" :class="color">
    <div class="flex items-center">
      <div class="w-10 h-10 mr-4 text-white">
        <i :class="iconClass" class="text-xl"></i>
      </div>
      <div>
        <h4 class="text-lg font-semibold text-white">{{ title }}</h4>
        <p>{{ formattedValue }}</p>
        <p>{{ formattedValueRupiah }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: 0, // Default value if prop is not provided
    },
    valueRupiah: {
      type: [String, Number],
      default: 0, // Default value if prop is not provided
    },
    color: {
      type: String,
      default: "bg-gray-500", // Default background color
    },
    iconClass: {
      type: String,
      default: "fas fa-info-circle", // Default icon
    },
  },
  computed: {
    formattedValue() {
      return this.value ? `${this.value} kWh` : "0 kWh";
    },
    formattedValueRupiah() {
      return this.valueRupiah
        ? `Rp. ${Number(this.valueRupiah).toLocaleString("id-ID").replace(/,/g, ".")}`
        : "Rp. 0";
    },
  },
};
</script>
