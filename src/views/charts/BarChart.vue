<template>
  <div class="chart-container">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Legend);

export default {
  setup() {
    const barChart = ref(null);
    let chartInstance = null;
    const chartData = ref([]);

    const fetchMonthlySummary = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/monthly-summary', {
          params: {
            start_date: '2024-01-01',
            end_date: '2024-12-31',
          },
        });

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

        // Process the cleaned JSON data and round up ttlmonth_energy
        chartData.value = responseData.map(item => ({
          month: new Date(item.month_year).toLocaleDateString('en-GB', {
            month: 'short',
            year: '2-digit',
          }), 
          ttlmonth_energy: Math.ceil(parseFloat(item.ttlmonth_energy)),
        }));

        renderChart();
      } catch (error) {
        console.error('Error fetching monthly summary:', error);
      }
    };

    const renderChart = () => {
      // Destroy existing chart instance to prevent duplication
      if (chartInstance) {
        chartInstance.destroy();
      }

      const labels = chartData.value.map(item => item.month);
      const data = chartData.value.map(item => item.ttlmonth_energy);

      chartInstance = new Chart(barChart.value, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Monthly Energy (kWh)',
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
              text: 'Monthly Energy BarChart',
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
      fetchMonthlySummary();
    });

    onBeforeUnmount(() => {
      // Destroy the chart instance when the component is unmounted
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
