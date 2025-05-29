<template>
  <div class="add-pressure">
    <div class="pressure-container">
      <div class="pressure-box">
        <h3>Systolic</h3>
        <div class="counter">
          <input
            type="number"
            v-model.number="systolic"
            min="0"
            max="300"
            @input="validateSystolic"
          />
        </div>
        <span class="unit">mmHg</span>
      </div>
      <div class="pressure-box">
        <h3>Diastolic</h3>
        <div class="counter">
          <input
            type="number"
            v-model.number="diastolic"
            min="0"
            max="200"
            @input="validateDiastolic"
          />
        </div>
        <span class="unit">mmHg</span>
      </div>
    </div>
    <div class="category">
      <p>Category: <span>{{ getCategory }}</span></p>
      <div class="category-scale">
        <svg
          width="360"
          height="8"
          viewBox="0 0 360 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="0" width="60" height="8" fill="#3DBBFF" />
            <rect x="60" width="60" height="8" fill="#B1DE35" />
            <rect x="120" width="60" height="8" fill="#FCDA83" />
            <rect x="180" width="60" height="8" fill="#FFBE4C" />
            <rect x="240"  width="60" height="8" fill="#FF91AF" />
            <rect x="300" width="60" height="8" fill="#FF245F" />
          />
        </svg>
        <div class="indicator" :style="{ left: indicatorPosition }"></div>
      </div>
      <p class="note">
        Can cause symptoms like dizziness or fainting and may indicate underlying
        problems.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPressure",
  data() {
    return {
      systolic: 120,
      diastolic: 60,
    };
  },
  computed: {
    getCategory() {
        const { systolic, diastolic } = this;
        if (systolic < 90 || diastolic < 60) return "Hypotension";
        if (systolic < 120 && diastolic < 80) return "Normal";
        if (systolic < 130 && diastolic < 80) return "Elevated";
        if (systolic < 140 || (systolic < 180 && diastolic < 90)) return "Stage 1 Hypertension";
        if (systolic < 180 || (systolic < 180 && diastolic < 120)) return "Stage 2 Hypertension";
        return "Hypertensive Crisis";
    },
    indicatorPosition() {
       const { systolic, diastolic } = this;
       let position = 0;
        if (systolic < 90 || diastolic < 60) position = 0;
        else if (systolic < 120 && diastolic < 80) position = 100/6*3/2;
        else if (systolic < 130 && diastolic < 80) position = 100/6*5/2;
        else if (systolic < 140 || (systolic < 180 && diastolic < 90)) position = 100/6*7/2;
        else if (systolic < 180 || (systolic < 180 && diastolic < 120)) position = 100/6*9/2;
        else position = 100/6*11/2;
        return `${position}%`;
    },
  },
  methods: {
    validateSystolic() {
      if (this.systolic < 0) this.systolic = 0;
      if (this.systolic > 300) this.systolic = 300;
      if (this.systolic < this.diastolic) {
        this.diastolic = this.systolic;
      }
    },
    validateDiastolic() {
      if (this.diastolic < 0) this.diastolic = 0;
      if (this.diastolic > 200) this.diastolic = 200;
      if (this.diastolic > this.systolic) {
        this.diastolic = this.systolic;
      }
    },
  },
};
</script>

<style scoped>
.add-pressure {
  padding: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pressure-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.pressure-box {
  background: #fff;
  border-radius: 24px;
  flex: 1;
  min-height: 1px;
  aspect-ratio: 165/152;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

h3 {
  margin-bottom:0;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #0d0d12;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.counter input {
    border: none;
    font-weight: 700;
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    letter-spacing: -0.2px;
    color: #0D0D12;
}

.unit {
    padding: 4px 8px;
    gap: 8px;
    background: #FFE6EC;
    border-radius: 24px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.2px;
    color: #FF0045;
}

.category {
  background: #fff;
  border-radius: 24px;
  margin-bottom: 20px;
  padding: 16px;
}
.category p {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: #A4ACB9;
}
.category p span {
    font-weight: 500;
    color: #0D0D12;
}

.category-scale {
  width: 100%;
  height: 20px;
  border-radius: 10px;
  position: relative;
}
.category-scale svg {
    width: 100%;
}

.indicator {
  width: 10px;
  height: 20px;
  background: #333;
  position: absolute;
  top: 0;
  /* transform: translateX(-50%); */
  transition: left 0.3s ease;
}

.category p.note {
    text-align: left;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: 0.2px;
    color: #0D0D12;
}
</style>