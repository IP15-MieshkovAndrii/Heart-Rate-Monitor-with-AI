<template>
    <div class="home">
      <header>
        <h1>Heart Rate Monitor</h1>
        <small>Tap to start/stop monitoring</small>
      </header>
      <BpmDisplay />
      <GraphCanvas />
      <HeartRateMonitor />
    </div>
  </template>
  
  <script>
  import BpmDisplay from '../components/BpmDisplay.vue';
  import GraphCanvas from '../components/GraphCanvas.vue';
  import HeartRateMonitor from '../components/HeartRateMonitor.vue';
  
  export default {
    name: 'Home',
    components: {
      BpmDisplay,
      GraphCanvas,
      HeartRateMonitor,
    },
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>