<template>
  <div class="p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl" :class="color" @click="toggleCollapse">
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

    <!-- Collapsible Section -->
    <div v-if="isCollapsed" class="p-4 mt-4 bg-white rounded-lg shadow">
      <h5 class="mb-2 font-bold text-gray-700 text-md">Details</h5>
      <ul class="space-y-2">
        <li
          v-for="(item, index) in detailData"
          :key="index"
          class="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
          @click="selectSubDetail(item)"
        >
          {{ item }}
        </li>
      </ul>

      <div v-if="selectedDetail" class="p-4 mt-4 bg-green-100 rounded-lg">
        <p class="font-semibold text-gray-700">Selected: {{ selectedDetail }}</p>
        <p class="text-gray-700">0 kWh</p>
        <p class="text-gray-700">Rp. 0</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: [String, Number],
    valueRupiah: [String, Number],
    color: String,
    iconClass: String,
    detailData: Array,
    isCollapsed: Boolean, // Passed from parent to toggle visibility
  },
  data() {
    return {
      selectedDetail: null, // Tracks which sub-area detail is selected
    };
  },
  computed: {
    formattedValue() {
      return this.value ? `${this.value} kWh` : "Loading...";
    },
    formattedValueRupiah() {
      return this.valueRupiah
        ? `Rp. ${Number(this.valueRupiah).toLocaleString("id-ID").replace(/,/g, ".")}`
        : "Loading...";
    },
  },
  methods: {
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    selectSubDetail(detail) {
      this.selectedDetail = detail;
    },
  },
};
</script>
