<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <!-- Row 1: 6 Columns -->
    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-6">
      <ColumnBox
        v-for="(data, index) in row1Data"
        :key="'row1-' + index"
        :title="data.title"
        :description="data.description"
        :color="data.color"
        :iconClass="data.iconClass"
      />
    </div>

    <!-- Row 2: 3 Columns -->
    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
      <ColumnBox
        v-for="(data, index) in row2Data"
        :key="'row2-' + index"
        :title="data.title"
        :description="data.description"
        :color="data.color"
        :iconClass="data.iconClass"
      />
    </div>

    <!-- Row 3: 2 Columns -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ColumnBox
        v-for="(data, index) in row3Data"
        :key="'row3-' + index"
        :title="data.title"
        :description="data.description"
        :color="data.color"
        :iconClass="data.iconClass"
      />
    </div>
  </div>
</template>

<script>
import ColumnBox from "../components/ColumnBox.vue";

export default {
  components: {
    ColumnBox,
  },
  data() {
    return {
      row1Data: [
        {
          title: "HVAC",
          description: "Heating, ventilation, and air conditioning data.",
          color: "bg-blue-500",
          iconClass: "fas fa-wind",
        },
        {
          title: "Injection",
          description: "Injection molding machine data.",
          color: "bg-green-500",
          iconClass: "fas fa-syringe",
        },
        {
          title: "Compressor",
          description: "Compressor system data.",
          color: "bg-red-500",
          iconClass: "fas fa-compress",
        },
        {
          title: "E-Beam",
          description: "E-Beam sterilization system data.",
          color: "bg-yellow-500",
          iconClass: "fas fa-bolt",
        },
        {
          title: "ETO",
          description: "ETO (Ethylene Oxide) sterilization system data.",
          color: "bg-purple-500",
          iconClass: "fas fa-vial",
        },
        {
          title: "Blood Bag",
          description: "Blood bag production system data.",
          color: "bg-indigo-500",
          iconClass: "fas fa-heartbeat",
        },
      ],
      row2Data: [
        {
          title: "Machine 1",
          description: "Details about Machine 1",
          color: "bg-teal-500",
          iconClass: "fas fa-cogs",
        },
        {
          title: "Machine 2",
          description: "Details about Machine 2",
          color: "bg-pink-500",
          iconClass: "fas fa-cogs",
        },
        {
          title: "Machine 3",
          description: "Details about Machine 3",
          color: "bg-cyan-500",
          iconClass: "fas fa-cogs",
        },
      ],
      row3Data: [
        {
          title: "Logistics",
          description: "Logistics information",
          color: "bg-orange-500",
          iconClass: "fas fa-truck",
        },
        {
          title: "Quality Control",
          description: "Quality control status",
          color: "bg-gray-500",
          iconClass: "fas fa-check-circle",
        },
      ],
    };
  },
};
</script>
