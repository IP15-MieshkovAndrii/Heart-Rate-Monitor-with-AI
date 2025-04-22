<template>
    <div class="bpm-circle" @click="toggleMonitoring">
        <video ref="video" class="camera-feed" muted playsinline></video>
        <div v-if="!showCamera" class="bpm-result">
            <span>{{ bpm || 0 }} BPM</span>
        </div>
        <div v-if="!showCamera" class="progress-container">
            <svg class="progress-circle" viewBox="0 0 100 100">
                <circle class="background " cx="50" cy="50" r="45" />
                <circle
                class="progress "
                cx="50"
                cy="50"
                r="45"
                :style="{ strokeDashoffset: progressOffset }"
                />
                <circle
                class="progress-indicator shadow"
                :cx="indicatorX"
                :cy="indicatorY"
                r="3"
                />
            </svg>
        </div>
    </div>
    <!-- <span v-if="!showCamera" class="timer">{{ time }} s</span> -->
</template>
  
  <script>
  import mitt from 'mitt';
  import { heartRateMonitor } from '../utils/heartRateLogic';
  
  const emitter = mitt();
  
  export default {
    name: 'BpmCircle',
    data() {
      return {
        bpm: null,
        finalBpm: null,
        showCamera: true,
        progress: 0,
        time: 20, // Countdown timer in seconds
        monitoring: false,
        canvas: null,
        measurementStartTime: null,
        measurementTimer: null,
      };
    },
    computed: {
        progressOffset() {
            const circumference = 2 * Math.PI * 45;
            return circumference * (1 - this.progress / 100);
        },
        indicatorX() {
            const radius = 45;
            const angle = (this.progress / 100) * 2 * Math.PI;
            return 50 + radius * Math.cos(angle);
        },
        indicatorY() {
            const radius = 45;
            const angle = (this.progress / 100) * 2 * Math.PI;
            return 50 + radius * Math.sin(angle);
        },
    },
    mounted() {
      this.canvas = document.createElement('canvas');
      heartRateMonitor.initialize({
        videoElement: this.$refs.video,
        samplingCanvas: this.canvas,
        onBpmChange: (bpm) => {
          if (!this.finalBpm) {
            this.bpm = bpm;
            emitter.emit('bpm-update', bpm);
          }
        },
        onStatusChange: (status) => {
          if (status.includes('Hold')) {
            if (this.showCamera) {
              this.showCamera = false;
              this.measurementStartTime = performance.now();
              this.startMeasurementTimer();
            }
          } else {
            this.showCamera = true;
            this.progress = 0;
            this.time = 20;
            this.measurementStartTime = null;
            this.bpm = null;
            this.clearMeasurementTimer();
          }
        },
      });
  
      const updateProgress = () => {
        if (this.monitoring && !this.showCamera && this.measurementStartTime) {
          const elapsed = (performance.now() - this.measurementStartTime) / 1000;
          this.progress = Math.min((elapsed / 20) * 100, 100);
          this.time = Math.ceil(20 - elapsed);
          if (this.time < 0) this.time = 0;
        }
        if (this.monitoring) requestAnimationFrame(updateProgress);
      };
      this.$refs.video.addEventListener('play', () => {
        if (this.monitoring) updateProgress();
      });
    },
    methods: {
      async toggleMonitoring() {
        if (this.monitoring) {
          this.finalBpm = this.bpm || 0;
          await heartRateMonitor.stopMonitoring();
          this.monitoring = false;
          this.showCamera = false;
          this.progress = 100;
          this.time = 0;
          this.bpm = this.finalBpm;
          this.clearMeasurementTimer();
        } else {
          this.finalBpm = null;
          this.bpm = null;
          this.progress = 0;
          this.time = 20;
          try {
            await heartRateMonitor.startMonitoring();
            this.monitoring = true;
          } catch (error) {
            console.error('Failed to start monitoring:', error);
          }
        }
      },
      startMeasurementTimer() {
        this.clearMeasurementTimer();
        this.measurementTimer = setTimeout(async () => {
          this.finalBpm = this.bpm || 0;
          await heartRateMonitor.stopMonitoring();
          this.monitoring = false;
          this.showCamera = false;
          this.progress = 100;
          this.time = 0;
          this.bpm = this.finalBpm;
          this.measurementTimer = null;
        }, 20000);
      },
      clearMeasurementTimer() {
        if (this.measurementTimer) {
          clearTimeout(this.measurementTimer);
          this.measurementTimer = null;
        }
      },
    },
  };
  </script>
  <style scoped>
  .bpm-circle {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(#FF0002, #77131E);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
  }
  
  .camera-feed {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .bpm-result {
    color: var(--page-background);
    font-size: 2rem;
    font-weight: bold;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .timer {
    font-size: 1.2rem;
    font-weight: normal;
  }
  
  .progress-container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .progress-circle {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  
  .background {
    fill: none;
    stroke: var(--graph-color);
    stroke-width: 10;
  }
  
  .progress {
    fill: none;
    stroke: var(--graph-color-secondary);
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 283;
    transition: stroke-dashoffset 0.2s;
  }
  
  .progress-indicator {
    fill: var(--graph-color); /* Red fill */
    stroke: var(--graph-color-secondary);; /* Black stroke (previously white) */
    stroke-width: 1.5;
    transition: cx 0.2s, cy 0.2s;
  }

  .shadow {
    filter: drop-shadow( 0px 0px 2px rgba(0, 0, 0, 0.2));
  }
  </style>