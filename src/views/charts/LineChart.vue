<template>
    <div class="chart-container">
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  
  export default {
    setup() {
      const lineChart = ref(null);
  
      onMounted(() => {
        new Chart(lineChart.value, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Monthly Data LineChart'
              },
              legend: {
                display: true,
                position: 'bottom'
              }
            }
          }
        });
      });
  
      return {
        lineChart
      };
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    height: 400px;
  }
  </style>
  