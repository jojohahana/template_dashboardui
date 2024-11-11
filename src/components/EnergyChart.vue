<template>
  <div class="p-6 mb-6 bg-white rounded-lg shadow">
    <h3 class="mb-4 text-lg font-semibold">Daily Energy Consumption</h3>
    <div class="flex items-center justify-center h-48 text-gray-500 bg-gray-200 rounded-lg md:h-64">
      <canvas ref="barChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Legend);

export default {
  setup() {
    const barChart = ref(null);
    let chartInstance = null;

    const renderChart = () => {
      // Destroy the chart if it already exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Example data - Replace this with actual data if available
      const labels = ['2024-11-01', '2024-11-02', '2024-11-03', '2024-11-04', '2024-11-05', '2024-11-06', '2024-11-07', '2024-11-08'];
      const data = [1000, 3000, 2000, 4000, 5000, 2000, 4500, 2500];

      chartInstance = new Chart(barChart.value, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Daily Energy (kWh)',
              backgroundColor: '#42A5F5',
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Daily Energy Consumption',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      renderChart();
    });

    onBeforeUnmount(() => {
      // Clean up the chart instance when the component is unmounted
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      barChart,
    };
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}
</style>
