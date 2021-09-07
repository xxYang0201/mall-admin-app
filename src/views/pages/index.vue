<template>
  <div class="index">
    <div class="card">
      <Card />
    </div>
    <div class="chart">
      <Chart />
    </div>
  </div>
</template>

<script>
import Card from '@/components/card.vue';
import Chart from '@/components/chart.vue';

export default {
  components: {
    Card, Chart,
  },
};
</script>

<style>
</style>
