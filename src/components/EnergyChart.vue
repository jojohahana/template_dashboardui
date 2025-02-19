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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { Chart, BarController, BarElement, DoughnutController, CategoryScale, LinearScale, Title, Legend, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(BarController, BarElement, DoughnutController, CategoryScale, LinearScale, Title, Legend, ArcElement, Tooltip, ChartDataLabels, annotationPlugin);

export default {
  props: {
    plnValue: Number,
    plnValueRupiah: Number,
    pltsValue: Number,
    pltsValueRupiah: Number,
  },
  setup(props) {
    const barChart = ref(null);
    const doughnutChart = ref(null);
    let barChartInstance = null;
    let doughnutChartInstance = null;
    // Static Value Dashline on Barchart
    const AVERAGE_VALUE = 30173; 
    const WARNING_VALUE = 33935;
    const ACTION_VALUE = 35835;

    // Fetch Chart Data for Bar Chart
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getdaily');
        const jsonDataString = await response.text();
        const cleanedDataString = jsonDataString.replace(/<!--|-->/g, '');
        const apiData = JSON.parse(cleanedDataString);

        if (!Array.isArray(apiData)) {
          console.error("Parsed API data is not an array.");
          return;
        }

        const labels = apiData.map(item => item.Tanggal_save);
        const data = apiData.map(item => item.total_gap_value);

        renderBarChart(labels, data);
        renderDoughnutChart(); // Ensure Doughnut Chart updates with PLN & PLTS values
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Bar Chart
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
            //Add Label for Dash Line 
            {
              label: `Avg: ${AVERAGE_VALUE} kWh`,
              type: 'line',
              // data: Array(labels.length).fill(AVERAGE_VALUE),
              borderColor: 'blue',
              borderWidth: 2,
              borderDash: [6, 6],
              fill: false,
            },
            {
              label: `Warn: ${WARNING_VALUE} kWh`,
              type: 'line',
              // data: Array(labels.length).fill(WARNING_VALUE),
              borderColor: 'orange',
              borderWidth: 2,
              borderDash: [6, 6],
              fill: false,
            },
            {
              label: `Act: ${ACTION_VALUE} kWh`,
              type: 'line',
              // data: Array(labels.length).fill(ACTION_VALUE),
              borderColor: 'red',
              borderWidth: 2,
              borderDash: [6, 6],
              fill: false,
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
                return (value / 1000).toFixed(3); // Convert to kWh and format
              },
            },
            //Add Average Value 
            annotation: {
              annotations: {
                line1: {
                  type: 'line',
                  yMin: AVERAGE_VALUE,
                  yMax: AVERAGE_VALUE,
                  borderColor: 'blue',
                  borderWidth: 2,
                  borderDash: [6, 6],
                  // label: {
                  //   display: 'auto',
                  //   content: `Avg: ${AVERAGE_VALUE} kWh`,
                  //   enabled: true,
                  //   position: 'end',
                  //   backgroundColor: 'rgba(27, 48, 181, 0.8)',
                  //   color: '#DCEF32',
                  //   font: {
                  //     size: 10,
                  //     weight: 'bold',
                  //   },
                  //   padding: 8,
                  //   borderRadius: 5,
                  // },
                },
                line2: {
                  type: 'line',
                  yMin: WARNING_VALUE,
                  yMax: WARNING_VALUE,
                  borderColor: 'orange',
                  borderWidth: 2,
                  borderDash: [6, 6],
                  // label: {
                  //   display: 'auto',
                  //   content: `Warn: ${WARNING_VALUE} kWh`,
                  //   enabled: true,
                  //   position: 'end',
                  //   backgroundColor: 'rgba(255, 189, 88, 0.8)',
                  //   color: '#DCEF32',
                  //   font: {
                  //     size: 10,
                  //     weight: 'bold',
                  //   },
                  //   padding: 8,
                  //   borderRadius: 5,
                  // },
                },
                line3: {
                  type: 'line',
                  yMin: ACTION_VALUE,
                  yMax: ACTION_VALUE,
                  borderColor: 'red',
                  borderWidth: 2,
                  borderDash: [6, 6],
                  // label: {
                  //   display: 'auto',
                  //   content: `Act: ${ACTION_VALUE} kWh`,
                  //   enabled: true,
                  //   position: 'end',
                  //   backgroundColor: 'rgba(255, 87, 109, 0.8)',
                  //   color: '#DCEF32',
                  //   font: {
                  //     size: 10,
                  //     weight: 'bold',
                  //   },
                  //   padding: 8,
                  //   borderRadius: 5,
                  // },
                },
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

    // Doughnut Chart
    const renderDoughnutChart = () => {
      if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
      }

      // Convert PLN & PLTS values to percentages
      const totalConsumption = (props.plnValue || 0) + (props.pltsValue || 0);
      const plnPercentage = totalConsumption > 0 ? ((props.plnValue / totalConsumption) * 100).toFixed(1) : 0;
      const pltsPercentage = totalConsumption > 0 ? ((props.pltsValue / totalConsumption) * 100).toFixed(1) : 0;

      doughnutChartInstance = new Chart(doughnutChart.value, {
        type: 'doughnut',
        data: {
          labels: [`PLN (${plnPercentage}%)`, `PLTS (${pltsPercentage}%)`],
          datasets: [
            {
              label: 'Energy Distribution',
              backgroundColor: ['#1AA85B', '#FFD700'],
              data: [props.plnValue, props.pltsValue],
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
            datalabels: {
              color: '#fff',
              formatter: (value, ctx) => {
                const total = ctx.dataset.data.reduce((sum, val) => sum + val, 0);
                return total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0%';
              },
            },
          },
        },
      });
    };

    // Watch for changes in PLN & PLTS values to update the Doughnut Chart dynamically
    watch(() => [props.plnValue, props.pltsValue], renderDoughnutChart);

    onMounted(() => {
      fetchChartData();
      renderDoughnutChart();
    });

    onBeforeUnmount(() => {
      if (barChartInstance) barChartInstance.destroy();
      if (doughnutChartInstance) doughnutChartInstance.destroy();
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
