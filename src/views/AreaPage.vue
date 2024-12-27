<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      <ColumnBox
        v-for="(data, index) in rowData"
        :key="'row-' + index"
        :title="data.title"
        :value="data.value"
        :valueRupiah="data.valueRupiah"
        :color="data.color"
        :iconClass="data.iconClass"
        :detailData="data.details"
        @toggleCollapse="toggleCollapse(index)"
        :isCollapsed="collapsedIndex === index"
      />
    </div>
  </div>
</template>

<script>
import ColumnBox from "../components/ColumnBox.vue";
import axios from "axios";

export default {
  components: {
    ColumnBox,
  },
  data() {
    return {
      rowData: [
        { title: "HVAC", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#49958C", iconClass: "fas fa-wind", details: ["HVAC 1", "HVAC 2", "HVAC 3"] },
        { title: "Injection", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#10b981", iconClass: "fas fa-syringe", details: ["Injection 1", "Injection 2", "Injection 3", "Injection 4"] },
        { title: "LVMDP", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#facc15", iconClass: "fas fa-box", details: ["LVMDP 1", "LVMDP 2"] },
        { title: "Compressor", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#ef4444", iconClass: "fas fa-warehouse", details: ["Compressor 1", "Compressor 2", "Compressor 3"] },
        { title: "Cubical", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#a855f7", iconClass: "fas fa-building", details: ["Floor 1", "Floor 2"] },
        { title: "E-Beam", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#6b7280", iconClass: "fas fa-tools", details: ["Area 1", "Area 2"] },
        { title: "ETO", api: "http://127.0.0.1:8000/api/getdayebeam", color: "#4CA9CB", iconClass: "fas fa-tools", details: ["Area 1", "Area 2"] },
      ],
      collapsedIndex: null, // Tracks which column is collapsed
    };
  },
  mounted() {
    this.fetchAllData();
  },
  methods: {
    async fetchAllData() {
      const promises = this.rowData.map((item, index) => this.fetchDataForItem(item.api, index));
      await Promise.all(promises);
    },
    async fetchDataForItem(apiUrl, index) {
      try {
        const response = await axios.get(apiUrl);
        const totalConsumption = response.data?.total_cons ?? 0;
        const totalCost = response.data?.total_cost ?? 0;
        this.rowData[index].value = totalConsumption;
        this.rowData[index].valueRupiah = totalCost;
      } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error);
        this.rowData[index].value = 0;
        this.rowData[index].valueRupiah = 0;
      }
    },
    toggleCollapse(index) {
      this.collapsedIndex = this.collapsedIndex === index ? null : index;
    },
  },
};
</script>
