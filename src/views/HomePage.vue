<template>
  <div>
    <!-- <h1>Home Page</h1>
    <p>Welcome to the Home page.</p> -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  </div>
</template>

<script>
import LineChart from './charts/LineChart.vue';
import BarChart from './charts/BarChart.vue';
import PieChart from './charts/PieChart.vue';

export default {
  components: {
    LineChart,
    BarChart,
    PieChart
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
