<template>  
  <div class="min-h-screen p-6 bg-gray-100">  
    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">  
      <ColumnBox  
        v-for="(data, index) in rowData"  
        :key="'row-' + index"  
        :title="data.title"  
        :value="data.value"  
        :valueRupiah="data.valueRupiah"  
        :color="data.color"  
        :iconClass="data.iconClass"  
        :detailData="data.details"  
        @toggleCollapse="toggleCollapse(index)"  
        :isCollapsed="collapsedIndex === index"  
      />  
    </div>  
    <div v-if="selectedDetail" class="p-4 mt-4 bg-white rounded shadow">  
      <h3 class="text-lg font-semibold">Selected Detail</h3>  
      <p><strong>Name:</strong> {{ selectedDetail.name }}</p>  
      <p><strong>Value:</strong> {{ selectedDetail.value }} kWh</p>  
      <p><strong>Cost:</strong> Rp. {{ selectedDetail.cost }}</p>  
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
      rowData: [  
        {  
          title: "HVAC",  
          api: "http://127.0.0.1:8000/api/hvacttl",  
          color: "#4CA9CB",  
          iconClass: "fas fa-wind",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "HVAC 1", api: "http://127.0.0.1:8000/api/hvacone", value: null, cost: null, isExpanded: false, isLoading: false },  
            { name: "HVAC 2", api: "http://127.0.0.1:8000/api/hvactwo", value: null, cost: null, isExpanded: false, isLoading: false },  
            { name: "HVAC 3", api: "http://127.0.0.1:8000/api/hvacthree", value: null, cost: null, isExpanded: false, isLoading: false },  
          ],  
        },  
        {  
          title: "INJECTION",  
          api: "http://127.0.0.1:8000/api/injectttl",  
          color: "#49958C",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Injection 1", api: "http://127.0.0.1:8000/api/injectone", value: null, cost: null, isExpanded: false, isLoading: false },  
            { name: "Injection 2", api: "http://127.0.0.1:8000/api/injecttwo", value: null, cost: null, isExpanded: false, isLoading: false },  
          ],  
        },  
        {  
          title: "COMPRESSOR",  
          api: "http://127.0.0.1:8000/api/compressttl",  
          color: "#4CA9CB",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/compresone", value: null, cost: null, isExpanded: false, isLoading: false },  
            { name: "Compressor 2", api: "http://127.0.0.1:8000/api/comprestwo", value: null, cost: null, isExpanded: false, isLoading: false },  
            { name: "Compressor 3", api: "http://127.0.0.1:8000/api/compresthree", value: null, cost: null, isExpanded: false, isLoading: false },  
          ],  
        },  
        {  
          title: "LVMDP",  
          api: "http://127.0.0.1:8000/api/lvmdpttl",  
          color: "#49958C",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/lvmdpone", value: null, cost: null, isExpanded: false, isLoading: false },  
            { name: "Compressor 2", api: "http://127.0.0.1:8000/api/lvmdptwo", value: null, cost: null, isExpanded: false, isLoading: false },  
          ],  
        },  
        {  
          title: "BOILER",  
          api: "http://127.0.0.1:8000/api/boiler",  
          color: "#4CA9CB",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/lvmdpone", value: null, cost: null, isExpanded: false, isLoading: false },   
          ],  
        },  
        {  
          title: "CUBICAL",  
          api: "http://127.0.0.1:8000/api/cubical",  
          color: "#49958C",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/lvmdpone", value: null, cost: null, isExpanded: false, isLoading: false },   
          ],  
        },  
        {  
          title: "EBEAM",  
          api: "http://127.0.0.1:8000/api/ebeam",  
          color: "#4CA9CB",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/lvmdpone", value: null, cost: null, isExpanded: false, isLoading: false },   
          ],  
        },  
        {  
          title: "ETO",  
          api: "http://127.0.0.1:8000/api/eto",  
          color: "#49958C",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/lvmdpone", value: null, cost: null, isExpanded: false, isLoading: false },   
          ],  
        },  
        {  
          title: "NUMEDIK",  
          api: "http://127.0.0.1:8000/api/numedik",  
          color: "#4CA9CB",  
          iconClass: "fas fa-tint",  
          value: null,  
          valueRupiah: null,  
          details: [  
            { name: "Compressor 1", api: "http://127.0.0.1:8000/api/lvmdpone", value: null, cost: null, isExpanded: false, isLoading: false },   
          ],  
        },  
      ],  
      collapsedIndex: null,  
      selectedDetail: null, // Tracks the currently selected detail  
    };  
  },  
  mounted() {  
    this.fetchAllData();  
  },  
  methods: {  
    async fetchAllData() {  
      // Fetch data for all main sections  
      const promises = this.rowData.map((item, index) => this.fetchDataForSection(item.api, index));  
      await Promise.all(promises);  
    },  
    async fetchDataForSection(apiUrl, index) {  
      try {  
        const response = await axios.get(apiUrl);  
        const data = response.data; // Get the response data  
        const key = Object.keys(data)[0]; // Get the first key (date)  
        const totalConsumption = data[key]?.total_gap_value ?? 0; // Extract total_gap_value  
        const totalCost = data[key]?.total_cost_value ?? 0; // Extract total_cost_value  
        this.rowData[index].value = totalConsumption;  
        this.rowData[index].valueRupiah = totalCost;  
      } catch (error) {  
        console.error(`Error fetching data from ${apiUrl}:`, error);  
        this.rowData[index].value = 0; // Set to 0 if there's an error  
        this.rowData[index].valueRupiah = 0; // Set to 0 if there's an error  
      }  
    },  
    toggleCollapse(index) {  
      // Toggle the collapse state for a section  
      this.collapsedIndex = this.collapsedIndex === index ? null : index;  
    },  
  },  
};  
</script>  
  
<style scoped>  
.min-h-screen {  
  background-color: #f8fafc;  
}  
</style>  
