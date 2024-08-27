<template>
  <div>
    <!-- Start Summary Cards  -->
    <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 mb-8">
      <StatCard
        iconName="solar_power"
        title="Total Energy Usage"
        :value="totalSolarEnergy || 'Loading..'"
        iconBgClass="bg-indigo-400"
      />
      <StatCard
        iconName="energy_savings_leaf"
        title="Total Energy Savings"
        value="39,265 kWh"
        iconBgClass="bg-green-400"
      />
      <StatCard
        iconName="water_drop"
        title="Total Water Savings"
        value="142,334 m3"
        iconBgClass="bg-blue-400"
      />
      <StatCard
        iconName="gas_meter"
        title="Total Gas Savings"
        value="34.12%"
        iconBgClass="bg-red-400"
      />
    </div>
    <!-- End Various Cards  -->

    <!-- Start Various Charts  -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 px-4">
      <div class="card">
        <LineChart />
      </div>
      <div class="card">
        <BarChart />
      </div>
      <div class="card">
        <PieChart />
      </div>
    </div>
    <!-- End Various Charts  -->

    <!-- Start Charts 2 Column  -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 px-4">
      <div class="card">
        <DoughnutChart />
      </div>
      <div class="card">
        <RadarChart />
      </div>
    </div>
    <!-- End Charts 2 Column  -->
  </div>
</template>

<script>
import LineChart from './charts/LineChart.vue';
import BarChart from './charts/BarChart.vue';
import PieChart from './charts/PieChart.vue';
import StatCard from '../components/StatCard.vue';
import DoughnutChart from './charts/DoughnutChart.vue';
import RadarChart from './charts/RadarChart.vue';
import axios from 'axios';

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
    StatCard,
    DoughnutChart,
    RadarChart,
  },
  data() {
    return {
      totalSolarEnergy: 'Loading...',
    };
  },
  mounted() {
    this.fetchSummaryData();
  },
  // methods: {
  //   async fetchSummaryData() {
  //     try {
  //       const response = await axios.get('http://localhost:8000/api/summary', {
  //         params: {
  //           year: 2024,
  //           month: 5,
  //         },
  //       });
        
  //       console.log('API Response:', response.data);

  //       if (response.data && response.data.total_energy) {
  //         this.totalSolarEnergy = response.data.total_energy + ' kWh';
  //       } else {
  //         this.totalSolarEnergy = 'Error: No data';
  //       }

  //       console.log('Total Solar Energy:', this.totalSolarEnergy);
        
  //     } catch (error) {
  //       console.error('Error Fetching Summary Data:', error);
  //       this.totalSolarEnergy = 'Error';
  //     }
  //   },
  // },

  methods: {
  async fetchSummaryData() {
    try {
      const response = await axios.get('http://localhost:8000/api/summary', {
        params: {
          year: 2024,
          month: 5,
        },
      });

      // Extract response data
      let responseData = response.data;

      // Check if response is a string and contains HTML comments
      if (typeof responseData === 'string') {
        // Remove HTML comments if present
        responseData = responseData.replace(/<!--|-->/g, '').trim();

        // Attempt to parse the cleaned JSON string
        try {
          responseData = JSON.parse(responseData);
        } catch (e) {
          console.error('Error parsing response data as JSON:', e);
          this.totalSolarEnergy = 'Error: Invalid JSON';
          return;
        }
      }

      // Log the cleaned response data
      console.log('Cleaned API Response:', responseData);

      // Now check for total_energy
      if (responseData && responseData.total_energy) {
        //Parse the value as a float, round it and format it with thousands separators
        const totalEnergy= Math.round(parseFloat(responseData.total_energy));
        this.totalSolarEnergy = totalEnergy.toLocaleString('de-DE') + ' kWh';
        // this.totalSolarEnergy = responseData.total_energy + ' kWh';
      } else {
        this.totalSolarEnergy = 'Error: No data';
      }

      console.log('Total Solar Energy:', this.totalSolarEnergy);

    } catch (error) {
      console.error('Error Fetching Summary Data:', error);
      this.totalSolarEnergy = 'Error';
    }
  },
},


};
</script>

<style scoped>
.grid {
  display: grid;
  gap: 16px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}
</style>
