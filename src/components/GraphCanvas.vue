<template>
    <section id="graph-container">
      <canvas id="graph-canvas" ref="graphCanvas"></canvas>
    </section>
  </template>
  
  <script>
  export default {
    name: 'GraphCanvas',
    mounted() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    },
   beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        const canvas = this.$refs.graphCanvas;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      },
    },
  };
  </script>
  
  <style scoped>
  #graph-container {
    width: 100%;
    max-width: 600px;
    height: 200px;
    background: var(--graph-background);
    border-radius: var(--border-radius-medium);
  }
  #graph-canvas {
    width: 100%;
    height: 100%;
  }
  </style>