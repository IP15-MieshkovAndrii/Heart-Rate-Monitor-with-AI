<template>
    <div class="health-assessment">
      <h1>Make it personal!</h1>
      <div class="heart-container">
        <!-- <img class="heart" :src="`${publicPath}heart.png`" alt="Heart"> -->
        <!-- <div v-if="heartRateData" class="measurement-data">
            <p><strong>Average Heart Rate:</strong> {{ heartRateData.bpm || 0 }} BPM</p>
            <p><strong>Heartbeat Intervals:</strong> {{ heartRateData.intervals.join(', ') }} seconds</p>
        </div> -->
        </div>
      <div v-if="!heartRateData" class="no-data">
        <p>No heart rate measurement available. Please complete a measurement first.</p>
      </div>
      <form @submit.prevent="submitForm" class="user-form">
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select id="gender" v-model="form.gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="age">Age (years):</label>
          <input type="number" id="age" v-model.number="form.age" min="1" max="120" required />
        </div>
        <div class="form-group">
          <label for="weight">Weight (kg):</label>
          <input type="number" id="weight" v-model.number="form.weight" min="1" step="0.1" required />
        </div>
        <div class="form-group">
          <label for="height">Height (cm):</label>
          <input type="number" id="height" v-model.number="form.height" min="1" step="0.1" required />
        </div>
        <button type="submit" :disabled="!heartRateData">Continue</button>
      </form>
      <div v-if="assessment" class="assessment-result">
        <h2>Assessment: {{ assessment.status }}</h2>
        <h3>Recommendations:</h3>
        <ul>
          <li v-for="(rec, index) in assessment.recommendations" :key="index">{{ rec }}</li>
        </ul>
      </div>
      <div v-if="error" class="error">
        <p>{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { Configuration, OpenAIApi } from 'openai';
  
  export default {
    name: 'HealthAssessment',
    data() {
      return {
        publicPath: process.env.BASE_URL,
        heartRateData: null,
        form: {
          gender: 'Male',
          age: null,
          weight: null,
          height: null,
        },
        assessment: null,
        error: null,
      };
    },
    mounted() {
      // Load heart rate data from localStorage
      const data = localStorage.getItem('heartRateData');
      if (data) {
        this.heartRateData = JSON.parse(data);
      }
    },
    methods: {
      async submitForm() {
        if (!this.heartRateData) {
          this.error = 'No heart rate data available. Please complete a measurement.';
          return;
        }
        this.error = null;
        this.assessment = null;
  
        const prompt = `
  You are a health assistant evaluating a heart rate measurement. The user has provided the following data:
  - Average heart rate: ${this.heartRateData.bpm || 0} BPM
  - Intervals between heartbeats: ${this.heartRateData.intervals.join(', ')} seconds
  - Gender: ${this.form.gender}
  - Age: ${this.form.age} years
  - Weight: ${this.form.weight} kg
  - Height: ${this.form.height} cm
  
  Based on this data, evaluate the heart rate:
  1. Is the heart rate good or bad? Consider typical resting heart rate ranges (60–100 BPM for adults, adjusted for age and fitness level) and heart rate variability (intervals should be relatively consistent, ~0.6–1.0s).
  2. Provide specific recommendations:
     - If the heart rate is bad (too high, too low, or irregular intervals), suggest appropriate sports or exercises to improve cardiovascular health (e.g., jogging, swimming, yoga).
     - If the heart rate is good, suggest maintenance activities (e.g., regular walking, strength training).
     - Include any other relevant advice (e.g., diet, stress management, consulting a doctor if concerning).
  
  Return a clear assessment ("good" or "bad") and a list of recommendations in bullet points.
        `;
  
        try {
          const response = await this.fetchChatGptApi(prompt);
          this.assessment = response;
        } catch (err) {
          this.error = 'Failed to get assessment. Please check your API key or try again.';
          console.error('ChatGPT API error:', err);
        }
      },
      async fetchChatGptApi(prompt) {
        const configuration = new Configuration({
          apiKey: process.env.VUE_APP_OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
  
        const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a health assistant providing heart rate evaluations and recommendations.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        });
  
        const result = response.data.choices[0].message.content.trim();
        
        const lines = result.split('\n').filter((line) => line.trim());
        const status = lines[0].toLowerCase().includes('good') ? 'good' : 'bad';
        const recommendations = lines
          .filter((line) => line.startsWith('- '))
          .map((line) => line.replace('- ', ''));
  
        return {
          status,
          recommendations,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .health-assessment {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: #FFE6EC;
    border-radius: 10px;
    color: var(--page-color);
    text-align: center;
    min-height: 100vh;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 2em;
    line-height: 1.1;
    z-index: 2; 
  }
  
  .measurement-data, .no-data {
    margin-bottom: 20px;
    font-size: 1.1rem;
  }
  
  .user-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  label {
    flex: 1;
    text-align: right;
    font-weight: bold;
  }
  
  input, select {
    flex: 2;
    padding: 8px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    background: var(--page-background, #fff);
    color: #333;
  }
  
  button {
    padding: 10px 20px;
    background: var(--graph-color);
    color: white;
    border: none;
    border-radius: 40px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  button:disabled {
    background: #666;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background: var(--graph-color-secondary);
  }
  
  .assessment-result {
    text-align: left;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 5px;
  }
  
  .assessment-result h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .assessment-result h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .assessment-result ul {
    list-style: disc;
    padding-left: 20px;
  }
  
  .error {
    color: #ff4444;
    margin-top: 10px;
  }

  .heart-container{
    max-width: 100vw;
    overflow: clip;
    position: absolute;
    z-index: 0; 
  }

  img.heart {
    /* position: absolute; */
    top: 5vh;
    height: auto;
    z-index: 0; 
    transform: translateX(-50%); 
    object-fit: cover;
    }
  </style>