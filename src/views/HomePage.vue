<template>
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <div>
        <p class="text-lg font-semibold">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Display spinner or content -->
    <div v-if="loading" class="flex items-center justify-center h-40">
      <div class="w-12 h-12 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>
    </div>
    <div v-else>
      <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        <ConsumptionBox
          title="Consumption Energy"
          :value="consumptionData.total_gap_value"
          :valueRupiah="consumptionData.total_cost_value"
          iconClass="fas fa-industry"
          iconColor="bg-green-500"
        />
        <ConsumptionBox 
          title="PLN" 
          :value="301" 
          iconClass="fas fa-bolt-lightning" 
          iconColor="bg-blue-500" 
        />
        <ConsumptionBox 
          title="PLTS" 
          :value="189" 
          iconClass="fas fa-solar-panel" 
          iconColor="bg-yellow-500" 
        />
      </div>

      <EnergyChart />
    </div>

    <CurrentState />
  </div>
</template>

<script>
import axios from 'axios';
import ConsumptionBox from '../components/ConsumptionBox.vue';
import EnergyChart from '../components/EnergyChart.vue';
import CurrentState from '../components/CurrentState.vue';

export default {
  components: {
    ConsumptionBox,
    EnergyChart,
    CurrentState
  },
  data() {
    return {
      loading: true, // Track loading state
      formattedDate: '',
      consumptionData: {
        total_gap_value: null,
        total_cost_value: null,
      }
    };
  },
  methods: {
    formatDate() {
      const today = new Date();
      const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
      this.formattedDate = today.toLocaleDateString('en-GB', options);
    },
    async fetchConsumptionEnergy() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getvaltoday');
        const cleanedDataString = response.data.replace(/<!--|-->/g, '').trim();
        const cleanedData = JSON.parse(cleanedDataString);

        this.consumptionData.total_gap_value = cleanedData.total_gap_value || 0;
        this.consumptionData.total_cost_value = cleanedData.total_cost_value || 0;
      } catch (error) {
        console.error('Error fetching consumption energy:', error);
        this.consumptionData.total_gap_value = 0;
        this.consumptionData.total_cost_value = 0;
      } finally {
        this.loading = false; // Set loading to false after fetch
      }
    }
  },
  mounted() {
    this.formatDate();
    this.fetchConsumptionEnergy();
  }
};
</script>

<style scoped>
.loader {
  border-color: #f3f3f3; /* Light gray border */
  border-top-color: #3498db; /* Blue spinner */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
