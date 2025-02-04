<template>
  <div class="p-6 mb-6 bg-white rounded-lg shadow">
    <h3 class="mb-4 text-lg font-semibold">Daily Energy Consumption - PLN (kWh)</h3>
    <div class="flex flex-col gap-4 md:flex-row">
      <!-- Bar Chart -->
      <div class="flex-1 p-8 bg-blue-100 rounded-lg">
        <canvas ref="barChart"></canvas>
      </div>
      <!-- Doughnut Chart -->
      <div class="flex-1 p-4 bg-blue-100 rounded-lg">
        <canvas ref="doughnutChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, BarController, BarElement, DoughnutController, CategoryScale, LinearScale, Title, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

Chart.register(BarController, BarElement, DoughnutController, CategoryScale, LinearScale, Title, Legend, ArcElement, ChartDataLabels);

export default {
  setup() {
    const barChart = ref(null);
    const doughnutChart = ref(null);
    let barChartInstance = null;
    let doughnutChartInstance = null;

    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getdaily');

        const jsonDataString = response.data.replace(/<!--|-->/g, '');
        const apiData = JSON.parse(jsonDataString);

        if (!Array.isArray(apiData)) {
          console.error("Parsed API data is not an array or is empty.");
          return;
        }

        const labels = apiData.map(item => item.Tanggal_save);
        const data = apiData.map(item => item.total_gap_value);

        renderBarChart(labels, data);
        renderDoughnutChart(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const renderBarChart = (labels, data) => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }

      barChartInstance = new Chart(barChart.value, {
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
              // text: 'Daily Energy Consumption',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
            datalabels: {
              anchor: 'end',
              align: 'end',
              color: '#333',
              font: {
                weight: 'bold',
              },
              formatter: function (value) {
                return (value / 1000).toFixed(3); // Divide by 1000 and format with three decimal places
              },
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

    const renderDoughnutChart = (data) => {
      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }

      doughnutChartInstance = new Chart(doughnutChart.value, {
        type: 'doughnut',
        data: {
          labels: ['High Consumption', 'Medium Consumption', 'Low Consumption'],
          datasets: [
            {
              label: 'Energy Distribution',
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
              data: [
                data.filter((value) => value > 15000).reduce((sum, value) => sum + value, 0),
                data.filter((value) => value > 5000 && value <= 15000).reduce((sum, value) => sum + value, 0),
                data.filter((value) => value <= 5000).reduce((sum, value) => sum + value, 0),
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      });
    };

    onMounted(() => {
      fetchChartData();
    });

    onBeforeUnmount(() => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }
      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }
    });

    return {
      barChart,
      doughnutChart,
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
