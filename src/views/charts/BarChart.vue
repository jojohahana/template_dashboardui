<template>
    <div class="chart-container">
      <canvas ref="barChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
  
  Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);
  
  export default {
    setup() {
      const barChart = ref(null);
  
      onMounted(() => {
        new Chart(barChart.value, {
          type: 'bar',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Data One',
                backgroundColor: '#42A5F5',
                data: [40, 39, 10, 40, 39, 80, 40]
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { //Judul Card
                display: true,
                text: 'Monthly Data BarChart'
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
        barChart
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
  