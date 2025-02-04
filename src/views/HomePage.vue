<template>  
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">  
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">  
      <div>  
        <p class="text-lg font-semibold">{{ formattedDate }}</p>  
      </div>  
    </div>  
  
    <div v-if="loading" class="flex items-center justify-center h-40">  
      <div class="w-12 h-12 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>  
    </div>  
    <div v-else>  
      <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">  
        <div class="relative">  
          <div class="absolute top-0 left-0 w-12 h-12 bg-green-400 rounded-full opacity-75 animate-ping"></div>  
          <ConsumptionBox  
            title="Total Energy Consumption (PLN + PLTS)"  
            :value="301"
            :valueRupiah="100"
            iconClass="fas fa-industry"  
            iconColor="bg-blue-500"  
          />  
        </div>  
  
        <ConsumptionBox   
          title="PLN"   
          :value="consumptionData.total_gap_value"  
          :valueRupiah="consumptionData.total_cost_value"  
          iconClass="fas fa-bolt-lightning"   
          iconColor="bg-green-800"   
        />
          
        <ConsumptionBox   
          title="PLTS"   
          :value="pltsSummary.totalValPlts"
          :valueRupiah="pltsSummary.totalCostPlts"    
          iconClass="fas fa-solar-panel"   
          iconColor="bg-yellow-500"   
        />  
      </div>  
  
      <EnergyChart />  
    </div>  
  </div>  
</template>  
  
<script>  
import axios from 'axios';  
import ConsumptionBox from '../components/ConsumptionBox.vue';  
import EnergyChart from '../components/EnergyChart.vue';  
  
export default {  
  components: {  
    ConsumptionBox,  
    EnergyChart,  
  },  
  data() {  
    return {  
      loading: true,  
      formattedDate: '',  
      consumptionData: {  
        total_gap_value: null,  
        total_cost_value: null,  
      },  
      pltsSummary: {  
        totalValPlts: null,  
        totalCostPlts: null,  
      },  
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
        this.loading = false;  
      }  
    },  
    async fetchPLTSSummary() {  
      try {  
        const response = await axios.post('http://127.0.0.1:8000/api/device/detailhistory');  
        const cleanedDataString = response.data.replace(/<!--|-->/g, '').trim();  
        const cleanedData = JSON.parse(cleanedDataString);  

        // Correctly sum up total consumption in Watts
        const totalKWh = cleanedData.reduce((sum, device) => sum + (Number(device.totalConsumption) || 0), 0);  
        
        // Ensure conversion to kWh is correct
        // const totalKWh = totalWatts / 1000;  

        // Store values
        this.pltsSummary.totalValPlts = totalKWh.toFixed(2);  // Convert to 2 decimal places
        this.pltsSummary.totalCostPlts = Math.ceil(totalKWh * 1035.78).toFixed(2);  

      } catch (error) {  
        console.error('Error fetching PLTS summary:', error);  
        this.pltsSummary.totalValPlts = 0;  
        this.pltsSummary.totalCostPlts = 0;  
      } finally {  
        this.loading = false;  
      }  
    },


  
    // async fetchPLTSSummary() {  
    //   try {  
    //     const response = await axios.post('https://eu1-developer.deyecloud.com/v1.0', {  
    //       // Include any necessary parameters here  
    //     });  
          
    //     const cleanedDataString = response.data.replace(/<!--|-->/g, '').trim();  
    //     const cleanedData = JSON.parse(cleanedDataString);  
  
    //     // Assuming cleanedData is an array of devices  
    //     this.pltsSummary.totalConsumption = cleanedData.reduce((sum, device) => {  
    //       return sum + (device.totalConsumption || 0);  
    //     }, 0);  
  
    //     this.pltsSummary.totalCost = cleanedData.reduce((sum, device) => {  
    //       return sum + (device.totalCost || 0);  
    //     }, 0);  
    //   } catch (error) {  
    //     console.error('Error fetching PLTS summary:', error);  
    //     this.pltsSummary.totalConsumption = 0;  
    //     this.pltsSummary.totalCost = 0;  
    //   }  
    // }  
  },  
  mounted() {  
    this.formatDate();  
    this.fetchConsumptionEnergy();  
    this.fetchPLTSSummary(); // Call the new method to fetch PLTS summary  
  }  
};  
</script>  
  
<style scoped>  
.loader {  
  border-color: #f3f3f3;  
  border-top-color: #3498db;  
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
