<template>
  <div class="line-chart">
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, LineController } from 'chart.js';

// Register the necessary components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, LineController);

export default {
  setup() {
    const lineChart = ref(null);

    onMounted(() => {
      new ChartJS(lineChart.value, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: [40, 39, 10, 40, 39, 80, 40],
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true
            },
            y: {
              beginAtZero: true
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
.line-chart {
  width: 100%;
  height: 400px;
}
</style>
