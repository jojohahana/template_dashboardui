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

      // Generate the last 7 days of dates for labels
      const today = new Date();
      const labels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i)); // Go back 6 days to today
        return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      });

      // Example data for the last 7 days
      const data = [1000, 3000, 2000, 4000, 5000, 2000, 4500]; // Example values

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
