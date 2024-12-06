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
      default: null, // Default to null if no value is provided
    },
    valueRupiah: {
      type: [String, Number],
      default: null, // Default to null if no value is provided
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
      if (this.value === null || this.value === undefined) {
        return "Loading..."; // Fallback if the value is not provided
      }
      return `${this.value} kWh`;
    },
    formattedValueRupiah() {
      if (this.valueRupiah === null || this.valueRupiah === undefined) {
        return "Loading..."; // Fallback if the valueRupiah is not provided
      }
      return `Rp. ${Number(this.valueRupiah)
        .toLocaleString("id-ID")
        .replace(/,/g, ".")}`;
    },
  },
};
</script>
