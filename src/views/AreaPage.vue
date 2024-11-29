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
          value: null, // Placeholder for future data
          valueRupiah: null,
          color: "bg-blue-500",
          iconClass: "fas fa-wind",
        },
        {
          title: "Injection",
          value: null,
          valueRupiah: null,
          color: "bg-green-500",
          iconClass: "fas fa-syringe",
        },
        {
          title: "Compressor",
          value: null,
          valueRupiah: null,
          color: "bg-red-500",
          iconClass: "fas fa-compress",
        },
        {
          title: "E-Beam", // E-Beam data to be updated from API
          value: "Loading...", // Default until API data arrives
          valueRupiah: "Loading...",
          color: "bg-yellow-500",
          iconClass: "fas fa-bolt",
        },
        {
          title: "ETO",
          value: null,
          valueRupiah: null,
          color: "bg-purple-500",
          iconClass: "fas fa-vial",
        },
        {
          title: "Blood Bag",
          value: null,
          valueRupiah: null,
          color: "bg-indigo-500",
          iconClass: "fas fa-heartbeat",
        },
      ],
    };
  },
  mounted() {
    this.fetchEbeamData();
  },
  methods: {
    async fetchEbeamData() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/getdayebeam");
    console.log("API Response:", response.data); // Debugging line

    // Check if response.data is valid and contains expected properties
    const total_cons_ebeam = response.data?.total_cons_ebeam ?? 0;
    const total_cost_ebeam = response.data?.total_cost_ebeam ?? 0;

    const ebeamIndex = this.row1Data.findIndex((item) => item.title === "E-Beam");
    if (ebeamIndex !== -1) {
      this.row1Data[ebeamIndex].value = `${total_cons_ebeam} kWh`;
      this.row1Data[ebeamIndex].valueRupiah = `Rp. ${total_cost_ebeam
        .toLocaleString("id-ID")
        .replace(/,/g, ".")}`;
    }
  } catch (error) {
    console.error("Error fetching E-Beam data:", error);

    // Handle error case
    const ebeamIndex = this.row1Data.findIndex((item) => item.title === "E-Beam");
    if (ebeamIndex !== -1) {
      this.row1Data[ebeamIndex].value = "Error fetching data";
      this.row1Data[ebeamIndex].valueRupiah = "Error";
    }
  }
}
,
  },
};
</script>
