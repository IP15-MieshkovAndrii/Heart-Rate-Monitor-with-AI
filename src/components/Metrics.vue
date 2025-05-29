<template>
    <div class="metrics">
        <div class="metric-card">
            <h2>Heart Rate</h2>
            <div class="metric-value">{{ bpm }} BPM <span :class="`status ${bpmStatus.replace(/\s+/g, '-')}`">{{ bpmStatus }}</span></div>
            <p>{{ bpmSummary }}</p>
        </div>

        <div class="metric-card">
            <h2>HRV</h2>
            <div class="metric-value">{{ hrv }} ms <span :class="`status ${hrvStatus.replace(/\s+/g, '-')}`">{{ hrvStatus }}</span></div>
            <p>{{ hrvSummary }}</p>
        </div>

        <div class="metric-card">
            <h2>Stress</h2>
            <div class="metric-value">{{ stress }}% <span :class="`status ${stressStatus.replace(/\s+/g, '-')}`">{{ stressStatus }}</span></div>
            <p>{{ stressSummary }}</p>
        </div>
    </div>
</template>
  
  <script>
  import fetchGroqApi from '@/utils/ai';

  export default {
    
    name: 'Metrics',
    data() {
      return {
        bpm: 0,
        hrv: 0,
        stress: 0,
        bpmSummary: 'Loading Heart Rate summary...',
        hrvSummary: 'Loading HRV summary...',
        stressSummary: 'Loading Stress summary...',
      };
    },
    computed: {
        bpmStatus() {
            if (this.bpm < 60) return 'Low';
            if (this.bpm <= 100) return 'Normal';
            return 'High';
        },
        hrvStatus() {
            if (this.hrv < 30) return 'Very Low';
            if (this.hrv <= 50) return 'Low';
            if (this.hrv <= 100) return 'Moderate';
            if (this.hrv <= 200) return 'Good';
            return 'Very high';
        },
        stressStatus() {
            if (this.stress < 35) return 'Normal';
            if (this.stress <= 70) return 'Medium';
            return 'High';
        }
    },
    async mounted() {
        const heartRateData = localStorage.getItem('heartRateData');
        let parsedData;
        try {
            parsedData = JSON.parse(heartRateData);
            this.bpm = parsedData.bpm;
            this.hrv = parseInt(parsedData.hrv);
            this.stress = parseInt(parsedData.stress);
        } catch (error) {
            console.error('Error parsing heart rate data:', error);
            this.$router.push('/dashboard');
        }

        let needToFetchSummaries = !parsedData.summaries;

        if (!needToFetchSummaries) {
          const summaries = parsedData.summaries;
          this.bpmSummary = summaries[0].trim();
          this.hrvSummary = summaries[1].trim();
          this.stressSummary = summaries[2].trim();
          return;
        }

        try {
            const promptText = `You are a health assistant providing concise, conversational summaries for health metrics based on given values. I will provide three metrics: heart rate (bpm), heart rate variability (hrv in milliseconds), and stress (percentage). For each metric, generate a short summary (1-2 sentences) in plain text, using natural, speech-like language as if you're talking to the user. Do not use symbols, bold, italics, or any formatting—just plain text. Separate each summary with ||| so they can be split easily in code. Use the following metric values: heart rate is {bpm} bpm, hrv is {hrv} ms, stress is {stress}%. Here’s how to structure the output:

Heart Rate summary: Comment on the heart rate value, considering ranges like low (<60 bpm), normal (60-100 bpm), or high (>100 bpm).
HRV summary: Comment on the hrv value, considering ranges like very low (<30 ms), low (30-50 ms), moderate (50-100 ms), good (100-200 ms), or very high (>200 ms).
Stress summary: Comment on the stress value, considering ranges like normal (<35%), medium (35-70%), or high (>70%).
Example output for bpm=58:
In general, for adults, a resting heart rate of fewer than 60 beats per minute (BPM) qualifies as bradycardia.
Bradycardia can be a serious problem if the heart rate is very slow and the heart can't pump enough oxygen-rich blood to the body. If this happens, you may feel dizzy, very tired or weak, and short of breath. Sometimes bradycardia doesn't cause symptoms or complications. A slow heart rate isn't always a concern. For example, a resting heart rate between 40 and 60 beats a minute is quite common during sleep and in some people, particularly healthy young adults and trained athletes. 
Now, generate the summaries for  bpm=${this.bpm}BPM, hrv=${this.hrv}ms, stress=${this.stress}%`;

            const groqResponse = await fetchGroqApi(promptText + ' bpm=' + this.bpm + 'BPM, hrv=' + this.hrv + 'ms, stress=' + this.stress + "%");
            const summaries = groqResponse.choices[0].message.content.split('|||');

            this.bpmSummary = summaries[0].trim();
            this.hrvSummary = summaries[1].trim();
            this.stressSummary = summaries[2].trim();
            const newHeartRateData = {
              id: parsedData.id,
              bpm: this.bpm,
              hrv: this.hrv,
              stress: this.stress,
              summaries,
            };
            localStorage.setItem('heartRateData', JSON.stringify(newHeartRateData));

            let healthHistory = localStorage.getItem('healthHistory');
            healthHistory = healthHistory ? JSON.parse(healthHistory) : [];

            if (!Array.isArray(healthHistory)) healthHistory = [];

            const index = healthHistory.findIndex(entry => entry.id === parsedData.id);
            
            if (index !== -1) {

              const element = healthHistory[index];
              const updatedEntry = {
                id: element.id,
                date: element.date,
                data: element.data,
                summaries
              };
              // Update existing entry
              healthHistory[index] = updatedEntry;
            } 
            localStorage.setItem('healthHistory', JSON.stringify(healthHistory));
        } catch (error) {
            console.error('Error fetching summaries from Groq API:', error);
            this.bpmSummary = 'Failed to load Heart Rate summary.';
            this.hrvSummary = 'Failed to load HRV summary.';
            this.stressSummary = 'Failed to load Stress summary.';
        }

    },
    methods: {

    },
  };
  </script>
  <style scoped>
    .metrics .metric-card {
    position: relative;
    background: white;
    padding: 8px 16px;
    margin-bottom: 15px;
    text-align: left;
    border-radius: 24px;
    z-index: 3;
  }
  
  .metric-card h2 {
    margin: 16px 0;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    color: #0D0D12;
  }
  
  .metric-value {
    font-size: 24px;
    font-weight: bold;
    
  }
  
  .status {
    margin-left: 10px;
  }
  
  .status.Very-low { color: rgba(166, 224, 255, 1); }
  .status.Low { color: rgba(61, 187, 255, 1); }
  .status.Moderate {color: rgba(255, 190, 76, 1)}
  .status.Normal, .status.Good { color: rgba(177, 222, 53, 1); }
  .status.High, .status.Very-high { color: rgba(255, 72, 122, 1); }

  .metric-card p {
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: #818898;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
  
  .summary {
    background: white;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .value {
    display: block;
    font-weight: bold;
    margin-top: 5px;
  }
  
  .label {
    color: #666;
  }
  </style>