<template>
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <div>
        <p class="text-lg font-semibold">{{ formattedDate }}</p>
      </div>
    </div>

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
        iconColor="bg-yellow-500" />
    </div>

    <EnergyChart />

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
        const response = await axios.get('http://127.0.0.1:8000/api/getvaltoday');
        console.log('Raw API Response:', response.data);

        // Check if the response contains HTML comments and remove them
        const cleanedDataString = response.data.replace(/<!--|-->/g, '').trim();
        const cleanedData = JSON.parse(cleanedDataString);

        console.log('Cleaned API Data:', cleanedData);

        // Assign cleaned values to consumptionData
        this.consumptionData.total_gap_value = cleanedData.total_gap_value || 0;
        this.consumptionData.total_cost_value = cleanedData.total_cost_value || 0;

        console.log('Total Gap Value:', this.consumptionData.total_gap_value);
        console.log('Total Cost Value:', this.consumptionData.total_cost_value);
      } catch (error) {
        console.error('Error fetching consumption energy:', error);

        // Assign default fallback values in case of an error
        this.consumptionData.total_gap_value = 0;
        this.consumptionData.total_cost_value = 0;
      }
}

  //   async fetchConsumptionEnergy() {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8000/api/getvaltoday');
  //     console.log('API Response:', response.data);

  //     // Directly assign API values to the consumptionData properties
  //     this.consumptionData.total_gap_value = response.data.total_gap_value || 0;
  //     this.consumptionData.total_cost_value = response.data.total_cost_value || 0;

  //     console.log('Total Gap Value:', this.consumptionData.total_gap_value);
  //     console.log('Total Cost Value:', this.consumptionData.total_cost_value);
  //   } catch (error) {
  //     console.error('Error fetching consumption energy:', error);

  //     // Assign default fallback values in case of an error
  //     this.consumptionData.total_gap_value = 0;
  //     this.consumptionData.total_cost_value = 0;
  //   }
  // }

    // async fetchConsumptionEnergy() {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:8000/api/getvaltoday');
    //     console.log('API Response:', response.data);

    //     // Remove HTML comments if present
    //     const cleanedData = JSON.parse(response.data.replace(/<!--|-->/g, '').trim());

    //     // Check if cleaned data has the required properties
    //     if (cleanedData && cleanedData.total_value && cleanedData.total_value_in_rupiah) {
    //       this.consumptionData.total_value = cleanedData.total_value;
    //       this.consumptionData.total_value_in_rupiah = cleanedData.total_value_in_rupiah;

    //       console.log('Total Value:', this.consumptionData.total_value);
    //       console.log('Total Value in Rupiah:', this.consumptionData.total_value_in_rupiah);
    //     } else {
    //       console.error('API response does not contain the expected properties:', cleanedData);
    //       this.consumptionData.total_value = 'N/A';
    //       this.consumptionData.total_value_in_rupiah = 'N/A';
    //     }
    //   } catch (error) {
    //     console.error('Error fetching consumption energy:', error);
    //     this.consumptionData.total_value = 'N/A';
    //     this.consumptionData.total_value_in_rupiah = 'N/A';
    //   }
    // }
  },
  mounted() {
    this.formatDate();
    this.fetchConsumptionEnergy();
  }
};
</script>

