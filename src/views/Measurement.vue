<template>
    <div class="results">
        <div class="ellipse ellipse-top"></div>
        <div class="header">
          <button class="back-btn" @click="$router.go(-1)">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="white"/>
              <path d="M15.975 23.6834C15.8166 23.6834 15.6583 23.6251 15.5333 23.5001L10.475 18.4418C10.2333 18.2001 10.2333 17.8001 10.475 17.5584L15.5333 12.5001C15.775 12.2584 16.175 12.2584 16.4166 12.5001C16.6583 12.7418 16.6583 13.1418 16.4166 13.3834L11.8 18.0001L16.4166 22.6168C16.6583 22.8584 16.6583 23.2584 16.4166 23.5001C16.3 23.6251 16.1333 23.6834 15.975 23.6834Z" fill="#0D0D12"/>
              <path d="M25.0833 18.625H11.0583C10.7167 18.625 10.4333 18.3417 10.4333 18C10.4333 17.6583 10.7167 17.375 11.0583 17.375H25.0833C25.425 17.375 25.7083 17.6583 25.7083 18C25.7083 18.3417 25.425 18.625 25.0833 18.625Z" fill="#0D0D12"/>
            </svg>
          </button>
            <h1>{{ date }}</h1>
        </div>
        <Metrics/>
    </div>
  </template>
  
  <script>
import Metrics from '@/components/Metrics.vue';

  export default {
    data() {
      return {
        bpm: 0,
        date: ''
      };
    },
    components: {
      Metrics,
    },
    methods: {
        continueButton() {
            localStorage.removeItem('heartRateData');
            this.$router.push('/dashboard');
        }
    },
    computed: {

    },
    mounted() {
        const heartRateData = localStorage.getItem('heartRateData');
        
        if (!heartRateData) {
            this.$router.push('/dashboard');
            return;
        }
        try {
            const parsedData = JSON.parse(heartRateData);
            this.bpm = parsedData.bpm;
            const timestamp = parsedData.date;

            // Convert timestamp to Date object
            const dateObj = new Date(parseInt(timestamp));

            // Format date to "19 March 2025 at 08:00"
            this.date = new Intl.DateTimeFormat('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
              .format(dateObj)
              .replace(',', ' at');
        } catch (error) {
            console.error('Error parsing heart rate data:', error);
            this.$router.push('/dashboard');
        }
    }
  };
  </script>
  
  <style scoped>
  .results {
    padding: 20px;
    background: rgba(236, 239, 243, 1);
    text-align: center;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  .header {
    position: relative;
    color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    z-index: 2;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
  
  .header h1 {
    font-weight: 700;
    font-size: 20px;
    line-height: 120%;
    text-align: center;
    letter-spacing: 0.3px;
    color: #36394A;
  }
  .heart-rate-display {
    margin: 3em 0;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .wave-icon {
    width: 100vw;
    position: absolute;
  }
  .heart-icon {
    position: absolute;
    z-index: 4;

  }
  
  .bpm {
    position: relative;
    z-index: 5;
    vertical-align: middle;
    font-weight: 700;
    font-size: 48px;
    line-height: 110%;
    text-align: center;
    color: #fbffe6;
  }

  .add-bp-btn {
    background: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: #ff6b6b;
    font-weight: bold;
    cursor: pointer;
  }
  
  .add-bp-btn .info-icon {
    margin-left: 5px;
  }

  .ellipse-top {
    top: -15vh;
  }
  </style>