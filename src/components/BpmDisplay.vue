<template>
    <section id="bpm-display-container" @click="toggleMonitoring">
        <div id="bpm-display">
            <output id="bpm-value" :title="`Heart rate: ${bpm || '--'} bpm`">{{ bpm || '--' }}</output>
            <label>bpm</label>
        </div>
    </section>
</template>
  
<script>
import emitter from '../utils/eventBus';
export default {
    name: 'BpmDisplay',
    data() {
        return {
            bpm: null,
        };
    },
    mounted() {
        emitter.on('bpm-update', this.handleBpmUpdate);
    },
    beforeUnmount() {
        emitter.off('bpm-update', this.handleBpmUpdate);
    },
    methods: {
        toggleMonitoring() {
            emitter.emit('toggle-monitoring');
        },
        handleBpmUpdate(bpm) {
            this.bpm = bpm;
        },
    },
};
</script>
  
  <style scoped>
  #bpm-display-container {
    cursor: pointer;
    padding: 20px;
    background: var(--graph-background);
    border-radius: var(--border-radius-large);
  }
  #bpm-display {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  #bpm-value {
    font-size: 2.5rem;
    color: var(--graph-color);
  }
  label {
    font-size: 1.2rem;
    color: var(--text-color-muted);
  }
  </style>