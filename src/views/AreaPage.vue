<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Row 1: 6 Columns -->
    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-6">
      <ColumnBox
        v-for="(data, index) in row1Data"
        :key="'row1-' + index"
        :title="data.title"
        :value="data.value"
        :valueRupiah="data.valueRupiah"
        :color="data.color"
        :iconClass="data.iconClass"
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
      row1Data: [
        {
          title: "HVAC",
          api: "http://127.0.0.1:8000/api/getdayebeam",
          value: "Loading...", // Default value until data is fetched
          valueRupiah: "Loading...",
          color: "bg-blue-500",
          iconClass: "fas fa-wind",
        },
        {
          title: "Injection",
          api: "http://127.0.0.1:8000/api/getdayebeam",
          value: "Loading...",
          valueRupiah: "Loading...",
          color: "bg-green-500",
          iconClass: "fas fa-syringe",
        },
        {
          title: "Compressor",
          api: "http://127.0.0.1:8000/api/getdayebeam",
          value: "Loading...",
          valueRupiah: "Loading...",
          color: "bg-red-500",
          iconClass: "fas fa-compress",
        },
        {
          title: "E-Beam",
          api: "http://127.0.0.1:8000/api/getdayebeam",
          value: "Loading...",
          valueRupiah: "Loading...",
          color: "bg-yellow-500",
          iconClass: "fas fa-bolt",
        },
        {
          title: "ETO",
          api: "http://127.0.0.1:8000/api/getdayeto",
          value: "Loading...",
          valueRupiah: "Loading...",
          color: "bg-purple-500",
          iconClass: "fas fa-vial",
        },
        {
          title: "Blood Bag",
          api: "http://127.0.0.1:8000/api/getdayebeam",
          value: "Loading...",
          valueRupiah: "Loading...",
          color: "bg-indigo-500",
          iconClass: "fas fa-heartbeat",
        },
      ],
    };
  },
  mounted() {
    this.fetchAllData();
    console.log("Received props:", this.value, this.valueRupiah);
  },
  methods: {
    async fetchAllData() {
      const promises = this.row1Data.map((item, index) =>
        this.fetchDataForItem(item.api, index)
      );

      // Wait for all API calls to complete
      await Promise.all(promises);
    },
    async fetchDataForItem(apiUrl, index) {
      try {
        const response = await axios.get(apiUrl);

        // Extract data safely
        const totalConsumption = response.data?.total_cons ?? 0; // Default to 0 if not found
        const totalCost = response.data?.total_cost ?? 0; // Default to 0 if not found

        // Update the specific item in `row1Data`
        this.row1Data[index].value = totalConsumption;
        this.row1Data[index].valueRupiah = totalCost;
      } catch (error) {
        console.error(`Error fetching data from ${apiUrl}:`, error);

        // Handle error case by setting fallback values
        this.row1Data[index].value = 0;
        this.row1Data[index].valueRupiah = 0;
      }
    },
  },
};
</script>
