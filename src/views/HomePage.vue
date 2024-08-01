<template>
  <div>
    <!-- Start Various Cards  -->
    <div class="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8 mb-8">
      <StatCard
        iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        title="Total Member"
        value="12,768"
        iconBgClass="bg-green-400"
      />
      <StatCard
        iconPath="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
        title="Total Post"
        value="39,265"
        iconBgClass="bg-blue-400"
      />
      <StatCard
        iconPath="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        title="Total Comment"
        value="142,334"
        iconBgClass="bg-indigo-400"
      />
      <StatCard
        iconPath="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        title="Server Load"
        value="34.12%"
        iconBgClass="bg-red-400"
      />
    </div>
    <!-- End Various Cards  -->

    <!-- Start Various Charts  -->
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
    <!-- End Various Charts  -->


  </div>
</template>

<script>
import LineChart from './charts/LineChart.vue';
import BarChart from './charts/BarChart.vue';
import PieChart from './charts/PieChart.vue';
import StatCard from '../components/StatCard.vue';

export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
    StatCard
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
