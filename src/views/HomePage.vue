<template>
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <div>
        <p class="text-lg font-semibold">{{ formattedDate }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- ConsumptionBox updated to use API data for total_value and total_value_in_rupiah -->
      <ConsumptionBox
        title="Consumption Energy"
        :value="consumptionData.total_value"
        :valueRupiah="consumptionData.total_value_in_rupiah"
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
      consumptionData: {
        total_value: null,
        total_value_in_rupiah: null,
      },
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
        const response = await axios.get('http://127.0.0.1:8000/api/gettrial');
        console.log('API Response:', response.data);

        // Remove HTML comments if present
        const cleanedData = JSON.parse(response.data.replace(/<!--|-->/g, '').trim());

        // Check if cleaned data has the required properties
        if (cleanedData && cleanedData.total_value && cleanedData.total_value_in_rupiah) {
          this.consumptionData.total_value = cleanedData.total_value;
          this.consumptionData.total_value_in_rupiah = cleanedData.total_value_in_rupiah;

          console.log('Total Value:', this.consumptionData.total_value);
          console.log('Total Value in Rupiah:', this.consumptionData.total_value_in_rupiah);
        } else {
          console.error('API response does not contain the expected properties:', cleanedData);
          this.consumptionData.total_value = 'N/A';
          this.consumptionData.total_value_in_rupiah = 'N/A';
        }
      } catch (error) {
        console.error('Error fetching consumption energy:', error);
        this.consumptionData.total_value = 'N/A';
        this.consumptionData.total_value_in_rupiah = 'N/A';
      }
    }
  },
  mounted() {
    this.formatDate();
    this.fetchConsumptionEnergy();
  }
};
</script>


<!-- <script>
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
      consumptionData: { total_value: null, total_value_in_rupiah: null }, // Data object for API values
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
        console.log('Fetching consumption energy data...');
        const response = await axios.get('http://127.0.0.1:8000/api/gettrial');
        console.log('API Response:', response.data); // Logs the full response data

        this.consumptionData.total_value = response.data.total_value;
        this.consumptionData.total_value_in_rupiah = response.data.total_value_in_rupiah;

        console.log('Total Value:', this.consumptionData.total_value);
        console.log('Total Value in Rupiah:', this.consumptionData.total_value_in_rupiah);
      } catch (error) {
        console.error('Error fetching consumption energy:', error);
        this.consumptionData = { total_value: 'N/A', total_value_in_rupiah: 'N/A' };
      }
    }

  },
  mounted() {
    this.formatDate();
    this.fetchConsumptionEnergy(); // Fetch data when component is mounted
  }
};
</script> -->
