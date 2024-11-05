<template>
  <div class="min-h-screen p-4 bg-gray-100 md:p-8">
    <div class="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:items-center md:space-y-0">
      <div>
        <p class="text-lg font-semibold">{{ formattedDate }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3">
      <ConsumptionBox title="Consumption Energy" :value="280" iconClass="fas fa-bolt" iconColor="bg-green-500" />
      <ConsumptionBox title="PLN" :value="301" iconClass="fas fa-sun" iconColor="bg-blue-500" />
      <ConsumptionBox title="PLTS" :value="189" iconClass="fas fa-leaf" iconColor="bg-yellow-500" />
    </div>

    <EnergyChart />

    <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
      <CurrentState :states="currentStates" />
    </div>
  </div>
</template>

<script>
import ConsumptionBox from '../components/ConsumptionBox.vue';
import EnergyChart from '../components/EnergyChart.vue';
import CurrentState from '../components/CurrentState.vue';

export default {
  components: {
    ConsumptionBox,
    EnergyChart,
    CurrentState
  },
  data() {
    return {
      formattedDate: '',
      currentStates: [
        { label: 'Exported Energy', value: 7.5, percentage: 58, bgClass: 'bg-blue-200', fillClass: 'bg-indigo-500' },
        { label: 'Selfuse Energy', value: 6.5, percentage: 42, bgClass: 'bg-orange-200', fillClass: 'bg-orange-500' },
      ]
    };
  },
  methods: {
    formatDate() {
      const today = new Date();
      const options = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
      this.formattedDate = today.toLocaleDateString('en-GB', options);
    }
  },
  mounted() {
    this.formatDate();
  }
};
</script>
