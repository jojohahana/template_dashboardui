<template>
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <div>
        <p class="text-lg font-semibold">{{ formattedDate }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- ConsumptionBox updated to use API data -->
      <ConsumptionBox
        title="Consumption Energy"
        :value="consumptionEnergy"
        iconClass="fas fa-bolt"
        iconColor="bg-green-500"
      />
      <ConsumptionBox title="PLN" :value="301" iconClass="fas fa-sun" iconColor="bg-blue-500" />
      <ConsumptionBox title="PLTS" :value="189" iconClass="fas fa-leaf" iconColor="bg-yellow-500" />
    </div>

    <EnergyChart />

    <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
      <CurrentState :states="currentStates" />
    </div>
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
      formattedDate: '',
      consumptionEnergy: null, // Store fetched API value here
      currentStates: [
        { label: 'Exported Energy', value: 7.5, percentage: 58, bgClass: 'bg-blue-200', fillClass: 'bg-indigo-500' },
        { label: 'Selfuse Energy', value: 6.5, percentage: 42, bgClass: 'bg-orange-200', fillClass: 'bg-orange-500' },
      ]
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
        const response = await axios.get('http://127.0.0.1:8000/api/gapvalcons');
        console.log('Raw API Response:', response.data); // For debugging
        
        // Remove HTML comments if they exist in the response
        const cleanData = JSON.parse(response.data.replace(/<!--|-->/g, '').trim());
        
        // Check if value_gap exists in the cleaned data
        if (cleanData && typeof cleanData.value_gap !== 'undefined') {
          this.consumptionEnergy = cleanData.value_gap;
          console.log('Updated consumptionEnergy:', this.consumptionEnergy); // Confirm data update
        } else {
          console.error('value_gap not found in response:', cleanData);
          this.consumptionEnergy = 'N/A';
        }
      } catch (error) {
        console.error('Error fetching consumption energy:', error);
        this.consumptionEnergy = 'N/A'; // Set to a default value in case of an error
      }
    }

  },
  mounted() {
    this.formatDate();
    this.fetchConsumptionEnergy(); // Fetch data when component is mounted
  }
};
</script>
