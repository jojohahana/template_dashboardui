<template>
  <div class="chart-container">
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import axios from 'axios';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default {
  setup() {
    const lineChart = ref(null);
    const chartData = ref([]);

    const fetchDailyEnergySummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/daily-summary');

        // Clean the response data by removing HTML comments if present
        let responseData = response.data;

        if (typeof responseData === 'string') {
          responseData = responseData.replace(/<!--|-->/g, '').trim();
          try {
            responseData = JSON.parse(responseData);
          } catch (e) {
            console.error('Error parsing response data as JSON:', e);
            return;
          }
        }

        // Process the cleaned JSON data
        chartData.value = responseData.map(item => ({
          date: new Date(item.tanggal).toLocaleDateString('en-GB', { //Change format date on legend charts
            day: '2-digit',
            month: 'short',
          }), 
          ttl_energy: parseFloat(item.ttl_energy),
        }));

        renderChart();
      } catch (error) {
        console.error('Error fetching daily energy summary:', error);
      }
    };

    const renderChart = () => {
      const labels = chartData.value.map(item => item.date);
      const data = chartData.value.map(item => item.ttl_energy);

      new Chart(lineChart.value, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Energy (kWh)',
              backgroundColor: '#f87979',
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
              text: 'Daily Total Energy Usage',
            },
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      });
    };

    onMounted(() => {
      fetchDailyEnergySummary();
    });

    return {
      lineChart,
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
