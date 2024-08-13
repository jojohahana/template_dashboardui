<template>
    <div class="chart-container">
      <canvas ref="heatmapChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Chart, MatrixController, MatrixElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';
  import 'chartjs-chart-matrix';
  
  Chart.register(MatrixController, MatrixElement, CategoryScale, LinearScale, Title, Tooltip); // Register the necessary components
  
  export default {
    setup() {
      const heatmapChart = ref(null);
  
      onMounted(() => {
        new Chart(heatmapChart.value, {
          type: 'matrix',
          data: {
            datasets: [{
              label: 'Work Activity',
              data: [
                { x: 0, y: 0, v: 5 },
                { x: 1, y: 1, v: 10 },
                { x: 2, y: 2, v: 8 },
                { x: 3, y: 3, v: 12 },
                { x: 4, y: 4, v: 6 },
                { x: 5, y: 5, v: 14 }
              ],
              backgroundColor(context) {
                const value = context.dataset.data[context.dataIndex].v;
                const alpha = value / 20;
                return `rgba(255, 99, 132, ${alpha})`;
              },
              borderWidth: 1,
              width: ({chart}) => chart.chartArea.width / 7 - 2,
              height: ({chart}) => chart.chartArea.height / 6 - 2,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'category',
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                grid: {
                  display: false
                }
              },
              y: {
                type: 'category',
                labels: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM'],
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return `Value: ${tooltipItem.raw.v}`;
                  }
                }
              },
              title: {
                display: true,
                text: 'Work Activity Heatmap'
              }
            }
          }
        });
      });
  
      return {
        heatmapChart
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
  