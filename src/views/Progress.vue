<template>
  <div class="progress">
    <h5>Measuring</h5>
    <BpmCircle @update:show-camera="updateShowCamera" />

    <p v-if="showCamera">
      Try to cover the entire lens and hold the phone comfortably
    </p>
    <p v-else class="p2">
      {{ instructionText }}
    </p>

    <img
      v-if="showCamera"
      class="camera"
      :src="`${publicPath}images/finger-camera.png`"
      alt="Camera frame"
    />
    <div v-else class="pulse-animation-wrapper">
      <svg
        class="pulse-svg"
        :class="{ 'pulsating': bpm > 0 }"
        width="375"
        viewBox="0 0 375 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 52.1609H152.106L168.476 70.5287L189.213 3L211.586 97L233.414 52.1609H383"
          stroke-width="6"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="pulse-path"
        />
      </svg>
    </div>

    <div v-if="showCamera" class="ellipse ellipse-bottom"></div>
    <div v-else class="ellipse ellipse-top"></div>
  </div>
</template>

<script>
import BpmCircle from '../components/BpmCircle.vue';
import emitter from '@/utils/eventBus';

export default {
  name: 'Progress',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      showCamera: true,
      elapsedTime: 0,
      timer: null, 
      bpm: 0,
    };
  },
  components: {
    BpmCircle,
  },
  computed: {
    instructionText() {
      if (this.elapsedTime < 9) {
        return 'Hold the phone in a comfortable position and avoid trying to control your breathing';
      } else if (this.elapsedTime < 18) {
        return 'Measuring your heart rate';
      } else {
        return 'Studies indicate that HRV offers valuable insights into your body’s health';
      }
    },
    pulseDuration() {
      return this.bpm > 0 ? 60 / this.bpm : 1;
    },
  },
  methods: {
    updateShowCamera(value) {
      this.showCamera = value;
      if (!value) {
        this.startTextTimer();
      } else {
        this.stopTextTimer();
        this.elapsedTime = 0;
      }
    },
    startTextTimer() {
      this.stopTextTimer(); 
      this.elapsedTime = 0;
      this.timer = setInterval(() => {
        this.elapsedTime += 1;
        if (this.elapsedTime >= 20) {
          this.elapsedTime = 0; 
        }
      }, 1000); 
    },
    stopTextTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  mounted() {
    emitter.on('bpm-update', (bpm) => {
      this.bpm = bpm;

    });
  },
  beforeUnmount() {
    this.stopTextTimer();
    emitter.off('bpm-update');
  },
};
</script>

<style scoped>
.progress {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  align-items: center;
  gap: 20px;
  background-color: rgba(236, 248, 255, 1);
  z-index: 2;
  overflow: hidden;
  overscroll-behavior: none;
  height: 100vh;
  width: 100vw;
}

h5 {
  margin-bottom: 0;
}
.camera {
  position: fixed;
  width: 140px;
  bottom: 0;
  z-index: 2;
}
p {
  color: #818898;
  width: 197px;
  font-size: 14px;
  text-align: center;
}

.p2 {

  /* font-family: 'SF Pro Display'; */
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 140%;
  width: 240px;
  
  text-align: center;
  letter-spacing: 0.2px;

  color: #1A1B25;

  flex: none;
  order: 0;
  flex-grow: 0;

}


.ellipse-top {
  top: -15vh;
}

.ellipse-bottom {
  bottom: -20vh;
}

.pulse-animation-wrapper {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 2;
}

.pulse-svg {
  width: 100%;
  max-width: 375px;
  height: 100px;
}

.pulse-path {
  stroke: white;
  transition: stroke 0.3s ease;
}

.pulsating .pulse-path {
  animation: pulseColor v-bind(pulseDuration + 's') infinite;
}

@keyframes pulseColor {
  0% {
    stroke: white;
    filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0));
  }
  17% {
    stroke: linear-gradient(0.25turn, white, white, rgba(255, 36, 95, 1), white, white);
    filter: drop-shadow(0 0 5px rgba(255, 36, 95, 0.4));
  }
  34% {
    stroke: linear-gradient(0.25turn, white, rgba(255, 36, 95, 1), white);
    filter: drop-shadow(0 0 8px rgba(255, 36, 95, 0.6));
  }
  50% {
    stroke: rgba(255, 36, 95, 1);
    filter: drop-shadow(0 0 10px rgba(255, 36, 95, 0.8));
  }
  67% {
    stroke: linear-gradient(0.25turn, white, rgba(255, 36, 95, 1), white);
    filter: drop-shadow(0 0 8px rgba(255, 36, 95, 0.6));
  }
  84% {
    stroke: linear-gradient(0.25turn, white, white, rgba(255, 36, 95, 1), white, white);
    filter: drop-shadow(0 0 5px rgba(255, 36, 95, 0.4));
  }
  100% {
    stroke: white;
    filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0));
  }
}

</style>