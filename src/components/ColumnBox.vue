<template>  
  <div  
    class="p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl"  
    :style="{ backgroundColor: color }"  
  >  
    <!-- Header Section -->  
    <div class="flex items-center" @click="toggleCollapse">  
      <div class="w-10 h-10 mr-4 text-white">  
        <i :class="iconClass" class="text-xl"></i>  
      </div>  
      <div>  
        <h4 class="text-lg font-semibold text-white">{{ title }}</h4>  
        <p>{{ formattedValue }}</p>  
        <p>{{ formattedValueRupiah }}</p>  
      </div>  
    </div>  
  
    <!-- Collapsible Section -->  
    <div v-if="isCollapsed" class="p-4 mt-4 bg-white rounded-lg shadow">  
      <h5 class="mb-2 font-bold text-gray-700 text-md">Details</h5>  
      <ul class="space-y-2">  
        <li  
          v-for="(item, index) in detailData"  
          :key="index"  
          class="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"  
          @click="fetchDetailData(item)"  
        >  
          <p class="font-semibold text-gray-700">{{ item.name }}</p>  
  
          <!-- Nested Collapse -->  
          <div v-if="item.isExpanded" class="p-2 mt-2 rounded bg-blue-50">  
            <p class="font-semibold text-gray-700">Selected: {{ item.name }}</p>  
            <p class="text-gray-700">  
              {{ item.isLoading ? "Loading..." : item.value !== null ? item.value + " kWh" : "No data available" }}  
            </p>  
            <p class="text-gray-700">  
              {{ item.isLoading ? "Loading..." : item.cost !== null ? "Rp. " + Number(item.cost).toLocaleString("id-ID").replace(/,/g, ".") : "No cost data" }}  
            </p>  
          </div>  
        </li>  
      </ul>  
    </div>  
  </div>  
</template>  
  
<script>  
import axios from "axios";  
  
export default {  
  props: {  
    title: String,  
    value: [String, Number],  
    valueRupiah: [String, Number],  
    color: String,  
    iconClass: String,  
    detailData: Array, // Each detail item should include { name, api, value, cost, isExpanded, isLoading }  
    isCollapsed: Boolean, // Passed from parent to toggle visibility  
  },  
  computed: {  
    formattedValue() {  
      return this.value !== null ? this.value + " kWh" : "Loading...";  
    },  
    formattedValueRupiah() {  
      return this.valueRupiah !== null  
        ? "Rp. " + Number(this.valueRupiah).toLocaleString("id-ID").replace(/,/g, ".")  
        : "Loading...";  
    },  
  },  
  methods: {  
    toggleCollapse() {  
      this.$emit("toggleCollapse");  
    },  
    async fetchDetailData(detail) {  
      if (!detail.isExpanded) {  
        detail.isLoading = true;  
        try {  
          const response = await axios.get(detail.api);  
          // Clean the response by removing HTML comment tags  
          const cleanedDataString = response.data.replace(/<!--|-->/g, '').trim();  
          const data = JSON.parse(cleanedDataString); // Parse the cleaned string  
      
          const key = Object.keys(data)[0]; // Get the first key (date)  
          detail.value = data[key]?.total_gap_value ?? null; // Extract total_gap_value  
          detail.cost = data[key]?.total_cost_value ?? null; // Extract total_cost_value  
      
          console.log('Total Gap Value:', detail.value); // Debugging line  
          console.log('Total Cost Value:', detail.cost); // Debugging line  
        } catch (error) {  
          console.error(`Error fetching data from ${detail.api}:`, error);  
          detail.value = null; // Reset value to indicate no data  
          detail.cost = null; // Reset cost to indicate no data  
        } finally {  
          detail.isLoading = false;  
          detail.isExpanded = true; // Mark this detail as expanded  
        }  
      } else {  
        detail.isExpanded = false; // Collapse the detail section  
      }  
    }, 

    // async fetchDetailData(detail) {  
    //   if (!detail.isExpanded) {  
    //     // Set loading state  
    //     detail.isLoading = true;  
    //     try {  
    //       const response = await axios.get(detail.api);  
    //       console.log('Detail API Response:', response.data); // Debugging line  
    //       const data = response.data; // Get the response data  
    //       const key = Object.keys(data)[0]; // Get the first key (date)  
    //       detail.value = data[key]?.total_gap_value ?? null; // Extract total_gap_value  
    //       detail.cost = data[key]?.total_cost_value ?? null; // Extract total_cost_value
    //       console.log('Total Gap Value:', detail.value); // Debugging line  
    //       console.log('Total Cost Value:', detail.cost); // Debugging line  
    //     } catch (error) {  
    //       console.error(`Error fetching data from ${detail.api}:`, error);  
    //       detail.value = null; // Reset value to indicate no data  
    //       detail.cost = null; // Reset cost to indicate no data  
    //     } finally {  
    //       detail.isLoading = false;  
    //       detail.isExpanded = true; // Mark this detail as expanded  
    //     }  
    //   } else {  
    //     detail.isExpanded = false; // Collapse the detail section  
    //   }  
    // },  
  },  
};  
</script>  
  
<style scoped>  
/* Add any additional styles here */  
</style>  
