<template>
  <div class="chart-container">
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart, PieController, ArcElement, Title, Tooltip } from 'chart.js';
import axios from 'axios';

Chart.register(PieController, ArcElement, Title, Tooltip);

export default {
  setup() {
    const pieChart = ref(null);
    const chartData = ref([]);

    const fetchShiftSummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/shift-summary');

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
          shift: item.shift,
          total_energy: Math.ceil(parseFloat(item.total_energy)), //round up value
        }));

        renderChart();
      } catch (error) {
        console.error('Error fetching shift summary:', error);
      }
    };

    const renderChart = () => {
      const labels = chartData.value.map(item => item.shift);
      const data = chartData.value.map(item => item.total_energy);

      new Chart(pieChart.value, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Energy by Shift (kWh)',
              backgroundColor: ['#f87979', '#A5F542', '#42A5F5'],
              data: data
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Total Energy Usage by Shift'
            },
            legend: {
              display: true, 
              position: 'bottom'
            }
          }
        }
      });
    };

    onMounted(() => {
      fetchShiftSummary();
    });

    return {
      pieChart,
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
