<template>
  <div class="profile">
    <div class="header">
      <button class="back-btn" @click="$router.go(-1)">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="white"/>
          <path d="M15.975 23.6834C15.8166 23.6834 15.6583 23.6251 15.5333 23.5001L10.475 18.4418C10.2333 18.2001 10.2333 17.8001 10.475 17.5584L15.5333 12.5001C15.775 12.2584 16.175 12.2584 16.4166 12.5001C16.6583 12.7418 16.6583 13.1418 16.4166 13.3834L11.8 18.0001L16.4166 22.6168C16.6583 22.8584 16.6583 23.2584 16.4166 23.5001C16.3 23.6251 16.1333 23.6834 15.975 23.6834Z" fill="#0D0D12"/>
          <path d="M25.0833 18.625H11.0583C10.7167 18.625 10.4333 18.3417 10.4333 18C10.4333 17.6583 10.7167 17.375 11.0583 17.375H25.0833C25.425 17.375 25.7083 17.6583 25.7083 18C25.7083 18.3417 25.425 18.625 25.0833 18.625Z" fill="#0D0D12"/>
        </svg>
      </button>
      <h1>Add measurement</h1>
    </div>

    <div class="m-content">
      <div class="m-container">
        <span>Your Heart Rate</span>
        <NewPulse/>
      </div>
      <div class="m-container">
        <span>Blood Pressure</span>
        <NewPressure ref="newPressure"/>
      </div>

    </div>

    <button 
      class="save-btn"
      @click="save"
    >
      Save
    </button>
  </div>
</template>

<script>
import NewPressure from '@/components/NewPressure.vue';
import NewPulse from '@/components/NewPulse.vue';
import { v4 as uuidv4 } from 'uuid';


  export default {
    data() {
      return {
      };
    },
    components: {
      NewPulse,
      NewPressure
    },
    methods: {
      save() {
        const { systolic, diastolic } = this.$refs.newPressure;

        const newEntry = {
          id: uuidv4(),
          systolic,
          diastolic,
          date: Date.now(),
        };

        const pressureHistory = JSON.parse(localStorage.getItem('pressureHistory')) || [];

        pressureHistory.push(newEntry);

        localStorage.setItem('pressureHistory', JSON.stringify(pressureHistory));

        console.log('Saved to localStorage:', pressureHistory);

        this.$router.push('/dashboard');
      },

    },
  };
</script>

  
<style scoped>
.profile {
  position: relative;
  z-index: 2;
  padding: 20px;
  background-color: rgba(236, 239, 243, 1);
  min-height: 100vh;
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

.m-content {
  position: relative;
  display:flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 16px;
}

.m-container {
  position: relative;
  width: 100%;
  display:flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
}

.save-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
  gap: 8px;

  width: 100%;
  min-height: 1px;
  aspect-ratio: 343/52;
  background: #FF0045;
  border-radius: 40px;
  border: none;

  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #FFFFFF;
}

</style>
