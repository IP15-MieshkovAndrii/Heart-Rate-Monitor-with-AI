<template>
    <div class="personal-data">
      <h1>Make it personal!</h1>
      <div class="heart-container">
        <svg viewBox="0 0 375 156" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M379 148H185.918C224.739 135.381 257.299 105.116 268.505 74.477C271.212 67.0745 272.676 59.6433 272.676 52.4282C272.676 27.8998 250.943 8 224.073 8C208.51 8 194.566 14.7645 185.716 25.2528C176.869 14.7649 163.007 8 147.359 8C120.489 8 98.7568 27.8998 98.7568 52.4282H-4" stroke="url(#paint0_linear_480_3664)" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M379 148H185.918C224.739 135.381 257.299 105.116 268.505 74.477C271.212 67.0745 272.676 59.6433 272.676 52.4282C272.676 27.8998 250.943 8 224.073 8C208.51 8 194.566 14.7645 185.716 25.2528C176.869 14.7649 163.007 8 147.359 8C120.489 8 98.7568 27.8998 98.7568 52.4282H-4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
          <linearGradient id="paint0_linear_480_3664" x1="-38.5278" y1="-7.55559" x2="10.7727" y2="252.682" gradientUnits="userSpaceOnUse">
          <stop offset="0.0946195" stop-color="#FF6192"/>
          <stop offset="0.254972" stop-color="#F8719D"/>
          <stop offset="0.496431" stop-color="#CBA5D1"/>
          <stop offset="0.695811" stop-color="#ABC2E2"/>
          <stop offset="1" stop-color="#E4FAFF"/>
          </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div class="form-container">
        <div class="unit-toggle">
          <button 
            :class="{ active: unit === 'imperial' }" 
            @click="unit = 'imperial'"
          >
            lb & inch
          </button>
          <button 
            :class="{ active: unit === 'metric' }" 
            @click="unit = 'metric'"
          >
            kg & cm
          </button>
        </div>

        <div class="gender-selection">
          <button 
            v-for="gender in genders" 
            :key="gender" 
            :class="{ selected: selectedGender === gender }"
            @click="selectedGender = gender"
          >
            {{ gender }}
          </button>
        </div>

        <div class="two-sliders">
          <div class="slider-container">
          <label>Age</label>
          <div class="slider-value">{{ age }}</div>
          <input 
            type="range" 
            v-model="age" 
            min="16" 
            max="100" 
            step="1"
          >

          <div class="unit">years</div>
        </div>

        <div class="slider-container">
          <label>Weight</label>
          <div class="slider-value"> {{ weight }}</div>
          <input 
            type="range" 
            v-model="weight" 
            :min="unit === 'metric' ? 0 : 0" 
            :max="unit === 'metric' ? 300 : 600" 
            step="1"
          >
          <div class="unit">{{ unit === 'metric' ? 'kilograms' : 'pounds' }}</div>
        </div>
        </div>


        <div class="slider-container one-slider">
          <label>What is your height?</label>
          <div class="slider-value">{{ height }}</div>
          <input 
            type="range" 
            v-model="height" 
            :min="unit === 'metric' ? 0 : 0" 
            :max="unit === 'metric' ? 300 : 100" 
            step="1"
          >
          <div class="unit">{{ unit === 'metric' ? 'centimeters' : 'inches' }}</div>
        </div>

        <button @click="submitForm" >Save</button>
      </div>

      <div class="ellipse ellipse-top"></div>

    </div>
  </template>
  
  <script>
// import fetchGroqApi from '@/utils/ai';

  
  export default {
    name: 'PersonalData',
    data() {
      return {
        publicPath: process.env.BASE_URL,
        unit: 'metric',
        genders: ['Male', 'Female', 'Other'],
        selectedGender: 'Female',
        age: 45,
        weight: 60,
        height: 170,
        assessment: null,
        heartRateData: null,
      };
    },
    mounted() {
      const data = localStorage.getItem('heartRateData');
      if (data) {
        this.heartRateData = JSON.parse(data);
      }
    },
    methods: {
      async submitForm() {
        this.assessment = null;
  
  //       const prompt = `
  // You are a health assistant evaluating a heart rate measurement. The user has provided the following data:
  // - Average heart rate: ${this.heartRateData.bpm || 0} BPM
  // - Intervals between heartbeats: ${this.heartRateData.intervals.join(', ')} seconds
  // - Gender: ${this.selectedGender}
  // - Age: ${this.age} years
  // - Weight: ${this.weight} kg
  // - Height: ${this.height} cm
  
  // Based on this data, evaluate the heart rate:
  // 1. Is the heart rate good or bad? Consider typical resting heart rate ranges (60–100 BPM for adults, adjusted for age and fitness level) and heart rate variability (intervals should be relatively consistent, ~0.6–1.0s).
  // 2. Provide specific recommendations:
  //    - If the heart rate is bad (too high, too low, or irregular intervals), suggest appropriate sports or exercises to improve cardiovascular health (e.g., jogging, swimming, yoga).
  //    - If the heart rate is good, suggest maintenance activities (e.g., regular walking, strength training).
  //    - Include any other relevant advice (e.g., diet, stress management, consulting a doctor if concerning).
  
  // Return a clear assessment ("good" or "bad") and a list of recommendations in bullet points.
  //       `;

        const personData = {heartRateData: this.heartRateData, gender: this.selectedGender, age: this.age, weight: this.weight, heigth: this.height};
        if(this.personData) {
            localStorage.setItem('health', JSON.stringify(personData));
        }
  
        // try {
        //   const response = await fetchGroqApi(prompt);
        //   this.assessment = response.choices[0]?.message?.content || "";
        //   if(this.assessment) {
        //     localStorage.setItem('assessment', this.assessment);
        //   }
        // } catch (err) {
        //   this.error = 'Failed to get assessment. Please check your API key or try again.';
        //   console.error('ChatGPT API error:', err);
        // }

        this.$router.push('/results');
      },

    },
  };
  </script>
  
<style scoped>

  .personal-data {
    position: relative;
    width: 100vw;
    margin: 0 auto;
    padding: 20px;
    background: rgba(236, 239, 243, 1);
    border-radius: 10px;
    color: var(--page-color);
    text-align: center;
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
  
  h1 {
    position: relative;
    color: rgba(54, 57, 74, 1);
    font-size: 40px;
    margin-top: 1.5em;
    margin-bottom: 2em;
    z-index: 2; 
    font-weight: 700;
    line-height: 110%;
  }
  
  .form-container {
    position: relative;
    z-index: 2;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    /* justify-content: flex-start; */
    align-items: center;
  }

  .unit-toggle {
    display: flex;
    justify-content: center;
    background-color: rgba(249, 249, 249, 1);
    border-radius: 24px;
    width: 193px;
    height: 32px;
    font-size: 14px;
    padding: 0;
  }

  .unit-toggle button {
    width: 101px;
    padding: 0;
    border: none;
    border-radius: 20px;
    background: rgba(249, 249, 249, 1);
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: #666D80;
    position: relative;
    transition: all 0.2s ease;
    z-index: 2;
  }

  .unit-toggle button:first-child {
    margin-right: -4.5px;
  }

  .unit-toggle button:last-child {
    margin-left: -4.5px;
  }

  .unit-toggle button.active {
    background: rgba(13, 13, 18, 1);
    color: #fff;
    z-index: 3;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 24px;
  }

  .gender-selection {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background: rgba(255, 255, 255, 1);
    width: 100%;
    border-radius: 24px;
    padding: 16px;
    color: rgba(13, 13, 18, 1);
    font-size: 16px;
  }

  .gender-selection button {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 40px;
    background: rgba(249, 249, 249, 1);
    color: rgba(13, 13, 18, 1);
    cursor: pointer;
  }

  .gender-selection button.selected {
    background: #ffcccb;
  }

  .two-sliders {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    gap: 16px;
  }

  .two-sliders .slider-container {
    width: calc(50% - 8px);
  } 

  .one-slider {
    width: 100%;
    margin-bottom: 8px;
  }

  .slider-container {
    background: #fff;
    padding: 15px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .slider-container label {
    display: block;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.2px;
    color: #0D0D12;
  }

  input[type="range"] {
    width: 100%;
    accent-color: #ff0000;
  }

  .slider-value {
    font-size: 1.2em;
    font-weight: bold;
  }

  .unit {
    background: rgba(255, 230, 236, 1);
    padding: 4px 8px;
    border-radius: 24px;
    font-size: 0.9em;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.2px;
    color: #FF0045;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-top: 8px;

  }
  
  button {
    padding: 10px 20px;
    background: rgba(255, 0, 69, 1);
    color: white;
    border: none;
    border-radius: 40px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
  }
  

  .heart-container{
    width: 130vw;
    position: absolute;
    top: 2.5em;
    z-index: 1; 
    left: -15vw;
  }

  .heart-container svg {
    width: 100%;
    height: auto;
  }

  .ellipse-top {
    top: -5vh;
  }
  </style>