<template>
    <div class="chart-container">
      <canvas ref="pieChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart, PieController, ArcElement, Title, Tooltip } from 'chart.js';
  
  Chart.register(PieController, ArcElement, Title, Tooltip);
  
  export default {
    setup() {
      const pieChart = ref(null);
  
      onMounted(() => {
        new Chart(pieChart.value, {
          type: 'pie',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Data One',
                backgroundColor: ['#f87979', '#A5F542', '#42A5F5', '#F5A542', '#42F57B', '#A542F5', '#F542A7'],
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      });
  
      return {
        pieChart
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
  