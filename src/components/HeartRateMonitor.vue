<template>
    <div class="heart-rate-monitor">
        <video ref="video" id="camera-feed" autoplay playsinline muted></video>
        <canvas ref="samplingCanvas" id="sampling-canvas" style="display: none"></canvas>
    </div>
</template>
  
<script>
import { heartRateMonitor } from '../utils/heartRateLogic';
import emitter from '../utils/eventBus';

export default {
    name: 'HeartRateMonitor',
    data() {
        return {
            monitoring: false,
            videoStream: null,
        };
        },
        mounted() {
            this.initializeMonitor();
            emitter.on('toggle-monitoring', this.toggleMonitoring);
        },
        beforeUnmount() {
            emitter.off('toggle-monitoring', this.toggleMonitoring);
        },
        methods: {
        initializeMonitor() {
            const video = this.$refs.video;
            const samplingCanvas = this.$refs.samplingCanvas;
            const graphCanvas = document.getElementById('graph-canvas');
            heartRateMonitor.initialize({
                videoElement: video,
                samplingCanvas,
                graphCanvas,
                graphColor: getComputedStyle(document.documentElement).getPropertyValue('--graph-color'),
                graphWidth: 6,
                onBpmChange: (bpm) => {
                    console.debug('BPM calculated:', bpm);
                    emitter.emit('bpm-update', bpm);
                },
            });
        },
        async toggleMonitoring() {
            if (this.monitoring) {
                await heartRateMonitor.stopMonitoring();
                this.monitoring = false;
            } else {
                await heartRateMonitor.startMonitoring();
                this.monitoring = true;
            }
        },
    },
};
</script>
  
<style scoped>
.heart-rate-monitor {
    display: none; 
}
</style>