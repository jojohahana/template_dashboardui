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
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import axios from 'axios';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Legend, ChartDataLabels); // Register the plugin

export default {
  setup() {
    const barChart = ref(null);
    let chartInstance = null;

    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getdaily');

        // Parse response to get labels and data
        const jsonDataString = response.data.replace(/<!--|-->/g, ''); // Remove any HTML-like comment tags
        const apiData = JSON.parse(jsonDataString);

        if (!Array.isArray(apiData)) {
          console.error("Parsed API data is not an array or is empty.");
          return;
        }

        const labels = apiData.map(item => item.Tanggal_save);
        const data = apiData.map(item => item.total_value);

        renderChart(labels, data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const renderChart = (labels, data) => {
      if (chartInstance) {
        chartInstance.destroy();
      }

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
            datalabels: { // Configure datalabels plugin
              anchor: 'end',
              align: 'end',
              color: '#333',
              font: {
                weight: 'bold',
              },
              formatter: function(value) {
                return value; // Show the value on top of each bar
              }
            }
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
      fetchChartData();
    });

    onBeforeUnmount(() => {
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
