<template>
  <div>
    <!-- Start Summary Cards  -->
    <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 mb-8">
      <StatCard
        iconName="solar_power"
        title="Total Solar Energy"
        value="12,768 kWh"
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
        <BarChart />
      </div>
      <div class="card">
        <LineChart />
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
// import HeatmapChart from './charts/HeatmapChart.vue';

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
    StatCard
    // HeatmapChart
  },
  name: 'HomePage'
}
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
