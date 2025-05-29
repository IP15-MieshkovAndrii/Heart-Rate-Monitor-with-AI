<template>
  <div class="home">
    <div v-if="showLoading" class="loading-screen">
      <h1>Welcome to <br>My Heart Rate Monitor - Pulse</h1>
      <div class="heartbeat-line" :style="{ backgroundImage: `url(${publicPath}images/Layer_1.png)`}" loading="lazy"></div>
      <div class="ellipse"></div>
      <div class="ellipse2"></div>

    </div>

    <div v-else class="message-screen" >
      <div class="splash" :style="{ backgroundImage: `url(${currentBackground})` }"></div>
      <div class="message-box">
        <div class="bg-figure">
          <svg viewBox="0 0 375 375" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M184.868 0.00151399C186.226 0.044468 187.386 0.994556 187.695 2.31747L207.713 87.9968L225.455 50.8675C225.954 49.8247 227.006 49.1609 228.162 49.1609H395C395 96 395 400 395 400H-18.9999C-18.9999 400 -19.0001 221 -18.9999 49.1609H148.348C149.213 49.1609 150.036 49.5344 150.606 50.1856L163.109 64.4765L181.901 2.1342C182.293 0.833463 183.51 -0.04144 184.868 0.00151399Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M184.868 0.00151399C186.226 0.044468 187.386 0.994556 187.695 2.31747L207.713 87.9968L225.455 50.8675C225.954 49.8247 227.006 49.1609 228.162 49.1609H395C395 96 395 400 395 400H-18.9999C-18.9999 400 -19.0001 221 -18.9999 49.1609H148.348C149.213 49.1609 150.036 49.5344 150.606 50.1856L163.109 64.4765L181.901 2.1342C182.293 0.833463 183.51 -0.04144 184.868 0.00151399Z" fill="url(#paint0_linear_1008_67998)" fill-opacity="0.5"/>
            <defs>
            <linearGradient id="paint0_linear_1008_67998" x1="188" y1="0" x2="188" y2="400" gradientUnits="userSpaceOnUse">
            <stop stop-color="#E4FAFF"/>
            <stop offset="1" stop-color="#ABC2E2"/>
            </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="pulse-line">
          <svg viewBox="0 0 375 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 52.1609H148.348L164.418 70.5287L184.773 3L206.735 97L228.162 52.1609H375" stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>


        </div>
        <p>{{ currentMessage }}</p>
        <button @click="nextMessage" class="continue-btn">Continue</button>
      </div>
    </div>
  </div>

</template>



<script>
export default {
  name: 'Home',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      showLoading: true,
      currentStep: 0,
      messages: [
        'Measure your pulse using only the camera',
        'Heart health diary in your phone',
        'Statistics, insights and much more!'
      ],
      backgrounds: [
        `/images/splash1.png`, 
        `/images/splash2.png`,
        `/images/splash3.png`,
      ]
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentStep];
    },
    currentBackground() {
      return this.backgrounds[this.currentStep];
    }
  },
  methods: {
    nextMessage() {
      this.currentStep++;
      if (this.currentStep >= this.messages.length) {
        this.$router.push('/progress');
      }
    }
  },
  mounted() {
    // this.showLoading = false;
    setTimeout(() => {
      this.showLoading = false;
    }, 3000);
  }
};
</script>

<style scoped>
.home {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.loading-screen {
  background-color: rgba(236, 239, 243, 1);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #333;
}

.loading-screen h1 {
  font-size: 35px;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 2em;
  color: rgba(70, 89, 122, 1);
  line-height: 110.00000000000001%;
  z-index: 2;
}

.heartbeat-line {
  width: 100%;
  min-height: 250px;
  background-size: 100vw 250px;
  background-repeat: no-repeat;
}

.message-screen {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: flex-end; */
}
.splash {
  position: fixed;
  width: 100%;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.message-box {
  position: fixed;
  width: 100%;
  height: 40vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.message-box .bg-figure {
  position: absolute;
  width: 100vw;
  top: 0;
  z-index: 1;
}

.message-box .pulse-line {
  position: absolute;
  top: 0;
  z-index: 3; 
  width: 100vw;
  background: transparent;
}

.message-box p {
  font-size: 24px;
  font-weight: 500;
  margin-top: 3em;
  margin-bottom: 1em;
  color: #333;
  z-index: 3; 
}


.continue-btn {
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 3; 

  padding: 15px;

  width: 92vw;
  height: 48px;

  background: #FF0045;
  box-shadow: 0px 1px 2px rgba(161, 19, 81, 0.5), 0px 0px 0px 1px #EB4768;
  border-radius: 40px;

  flex: none;
  order: 0;
  flex-grow: 0;

}


.ellipse {
  position: absolute;
  width: 562px;
  height: 440px;
  left: calc(50% - 562px/2 + 0.5px);
  top: -147px;
  z-index: 1;

  background: linear-gradient(162.11deg, rgba(228, 250, 255, 0.5) -6.85%, rgba(171, 194, 226, 0.5) 21.45%, rgba(203, 165, 209, 0.5) 40%, rgba(248, 113, 157, 0.5) 62.46%, rgba(255, 97, 146, 0.5) 77.37%);
  filter: blur(60px);
  transform: matrix(1, 0, 0, -1, 0, 0);
}

.ellipse2 {
  position: absolute;
  width: 506px;
  height: 489px;
  left: calc(50% - 506px/2 - 95.5px);
  top: 55vh;

  opacity: 0.7;
  transform: matrix(1, 0, 0, -1, 0, 0);

}
</style>