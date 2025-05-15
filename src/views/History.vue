<template>
    <div class="history-page">
      <div class="ellipse ellipse-top"></div>
      <!-- Header -->
      <div class="header">
        <button class="back-btn" @click="$router.go(-1)">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="white"/>
            <path d="M15.975 23.6834C15.8166 23.6834 15.6583 23.6251 15.5333 23.5001L10.475 18.4418C10.2333 18.2001 10.2333 17.8001 10.475 17.5584L15.5333 12.5001C15.775 12.2584 16.175 12.2584 16.4166 12.5001C16.6583 12.7418 16.6583 13.1418 16.4166 13.3834L11.8 18.0001L16.4166 22.6168C16.6583 22.8584 16.6583 23.2584 16.4166 23.5001C16.3 23.6251 16.1333 23.6834 15.975 23.6834Z" fill="#0D0D12"/>
            <path d="M25.0833 18.625H11.0583C10.7167 18.625 10.4333 18.3417 10.4333 18C10.4333 17.6583 10.7167 17.375 11.0583 17.375H25.0833C25.425 17.375 25.7083 17.6583 25.7083 18C25.7083 18.3417 25.425 18.625 25.0833 18.625Z" fill="#0D0D12"/>
          </svg>
        </button>
        <h1>Your measurements</h1>
        <button class="add-btn">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="white"/>
            <path d="M15.5 22.7915C15.4167 22.7915 15.3417 22.7748 15.2583 22.7415C15.025 22.6498 14.875 22.4165 14.875 22.1665V17.1665C14.875 16.8248 15.1583 16.5415 15.5 16.5415C15.8417 16.5415 16.125 16.8248 16.125 17.1665V20.6582L16.725 20.0582C16.9667 19.8165 17.3667 19.8165 17.6083 20.0582C17.85 20.2998 17.85 20.6998 17.6083 20.9415L15.9417 22.6082C15.825 22.7248 15.6583 22.7915 15.5 22.7915Z" fill="#0D0D12"/>
            <path d="M15.5 22.7915C15.3417 22.7915 15.1834 22.7332 15.0584 22.6082L13.3917 20.9415C13.15 20.6999 13.15 20.2999 13.3917 20.0582C13.6334 19.8165 14.0334 19.8165 14.275 20.0582L15.9417 21.7249C16.1834 21.9665 16.1834 22.3665 15.9417 22.6082C15.8167 22.7332 15.6584 22.7915 15.5 22.7915Z" fill="#0D0D12"/>
            <path d="M20.5001 26.9582H15.5001C10.9751 26.9582 9.04175 25.0248 9.04175 20.4998V15.4998C9.04175 10.9748 10.9751 9.0415 15.5001 9.0415H19.6667C20.0084 9.0415 20.2917 9.32484 20.2917 9.6665C20.2917 10.0082 20.0084 10.2915 19.6667 10.2915H15.5001C11.6584 10.2915 10.2917 11.6582 10.2917 15.4998V20.4998C10.2917 24.3415 11.6584 25.7082 15.5001 25.7082H20.5001C24.3417 25.7082 25.7084 24.3415 25.7084 20.4998V16.3332C25.7084 15.9915 25.9917 15.7082 26.3334 15.7082C26.6751 15.7082 26.9584 15.9915 26.9584 16.3332V20.4998C26.9584 25.0248 25.0251 26.9582 20.5001 26.9582Z" fill="#1F1F1F"/>
            <path d="M26.3334 16.9584H23.0001C20.1501 16.9584 19.0417 15.8501 19.0417 13.0001V9.66674C19.0417 9.41674 19.1917 9.18341 19.4251 9.09174C19.6584 8.99174 19.9251 9.05007 20.1084 9.22507L26.7751 15.8917C26.9501 16.0667 27.0084 16.3417 26.9084 16.5751C26.8084 16.8084 26.5834 16.9584 26.3334 16.9584ZM20.2917 11.1751V13.0001C20.2917 15.1501 20.8501 15.7084 23.0001 15.7084H24.8251L20.2917 11.1751Z" fill="#1F1F1F"/>
          </svg>
        </button>
      </div>
  
      <!-- Tabs -->
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs" 
          :key="index" 
          class="tab" 
          :class="{ active: activeTab === index }" 
          @click="setActiveTab(index)"
        >
          {{ tab }}
        </button>
      </div>
      <!-- Health Records -->
      <div v-for="(group, date) in groupedRecords" :key="date" class="record-section">
        
        <div class="selected-date">
          {{ formatDate(date) }}
        </div>
        <div v-for="(record, index) in group" :key="index" class="record">
          <div class="record-header">
            <span>{{ formatTime(record.date) }}</span>
          </div>
          <div class="record-data">
            <svg class="line" viewBox="0 0 289 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="0.5" x2="289" y2="0.5" stroke="white"/>
            </svg>
            <div class="record-content" ref="recordContent" @touchstart="onTouchStart($event, index)" @touchmove="onTouchMove($event, index)" @touchend="onTouchEnd($event, index)" >            
              <button @click="pulseInfo(record)" class="icon">
                <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#B1DE35"/>
                  <path d="M33.9999 29.2004C33.9999 30.1004 33.7499 30.9503 33.2999 31.6703C32.4699 33.0603 30.9499 34.0004 29.1999 34.0004C27.4499 34.0004 25.9199 33.0603 25.0999 31.6703C24.6599 30.9503 24.3999 30.1004 24.3999 29.2004C24.3999 26.5504 26.5499 24.4004 29.1999 24.4004C31.8499 24.4004 33.9999 26.5504 33.9999 29.2004Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M27.3298 29.1995L28.5098 30.3795L31.0698 28.0195" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M34 20.6896C34 22.6596 33.49 24.3996 32.69 25.9096C31.81 24.9796 30.57 24.3997 29.2 24.3997C26.55 24.3997 24.4 26.5496 24.4 29.1996C24.4 30.4296 24.87 31.5497 25.63 32.3997C25.26 32.5697 24.92 32.7096 24.62 32.8096C24.28 32.9296 23.72 32.9296 23.38 32.8096C20.48 31.8196 14 27.6896 14 20.6896C14 17.5996 16.49 15.0996 19.56 15.0996C21.37 15.0996 22.99 15.9797 24 17.3297C25.01 15.9797 26.63 15.0996 28.44 15.0996C31.51 15.0996 34 17.5996 34 20.6896Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="data">
                <div class="data-element">
                  {{ record.data.bpm }} bpm 
                  <br> <span>Pulse</span>
                </div>
                <div class="data-element">
                  {{ record.data.hrv }} ms 
                  <br> <span>HRV</span>
                </div>
                <div class="data-element">
                  {{ record.data.stress }}% 
                  <br> <span>Stress</span>
                </div>
              </div>
              <button @click="deleteRecord(record.date)" class="delete-btn" ref="deleteBtn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.8499 9.13965L18.1999 19.2096C18.0899 20.7796 17.9999 21.9996 15.2099 21.9996H8.7899C5.9999 21.9996 5.9099 20.7796 5.7999 19.2096L5.1499 9.13965" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.3301 16.5H13.6601" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.5 12.5H14.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  export default {
    name: 'History',
    data() {
      return {
        healthHistory: [],
        tabs: ['View all', 'Heart rate', 'Blood pressure'],
        activeTab: 0,
        touchState: {}
      };
    },
    computed: {
      groupedRecords() {
        const sortedRecords = [...this.healthHistory].sort((a, b) => b.date - a.date);

        const grouped = {};
        sortedRecords.forEach(record => {
          const recordDate = new Date(record.date);
          const dateKey = recordDate.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });

          if (!grouped[dateKey]) {
            grouped[dateKey] = [];
          }
          grouped[dateKey].push(record);
        });

        Object.keys(grouped).forEach(dateKey => {
          grouped[dateKey].sort((a, b) => a.date - b.date);
        });

        return grouped;
      }
    },
    methods: {
      formatDate(dateString) {
        return dateString;
      },
      formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })
        .toLowerCase()
        .replace(':', '.');
      },
      loadHealthHistory() {
        let healthHistory = localStorage.getItem('healthHistory');
        healthHistory = healthHistory ? JSON.parse(healthHistory) : [];
  
        if (!Array.isArray(healthHistory)) {
          healthHistory = [];
        }
        this.healthHistory = healthHistory;
      },
      setActiveTab(index) {
        this.activeTab = index;
      },
      pulseInfo(record) {
        localStorage.setItem('heartRateData', JSON.stringify({
                bpm: record.data.bpm,
                hrv: record.data.hrv,
                stress: record.data.stress,
            }));
            this.$router.push(`/results/${record.date}`)
      },
      onTouchStart(event, index) {
      const touch = event.touches[0];
      this.touchState[index] = {
        startX: touch.clientX,
        currentX: touch.clientX,
        translateX: 0,
        isSwiping: false
      };
      },
      onTouchMove(event, index) {
        if (!this.touchState[index]) return;
        const touch = event.touches[0];
        const deltaX = touch.clientX - this.touchState[index].startX;
        this.touchState[index].currentX = touch.clientX;
        this.touchState[index].isSwiping = true;

        const translateX = Math.max(-80, Math.min(0, deltaX));
        this.touchState[index].translateX = translateX;

        const recordContent = this.$refs.recordContent[index];
        recordContent.style.transform = `translateX(${translateX}px)`;

        const deleteBtn = this.$refs.deleteBtn[index];
        const btnWidth = Math.min(80, Math.abs(translateX));
        deleteBtn.style.width = `${btnWidth}px`;
      },
      onTouchEnd(event, index) {
        if (!this.touchState[index] || !this.touchState[index].isSwiping) return;

        const translateX = this.touchState[index].translateX;
        const recordContent = this.$refs.recordContent[index];
        const deleteBtn = this.$refs.deleteBtn[index];


        if (translateX < -50) {
          recordContent.style.transform = 'translateX(-80px)';
          deleteBtn.style.width = '80px';
        } else {
          recordContent.style.transform = 'translateX(0px)';
          deleteBtn.style.width = '0px';
        }

        this.touchState[index].isSwiping = false;
      },
      deleteRecord(recordDate) {
        let healthHistory = JSON.parse(localStorage.getItem('healthHistory')) || [];
        healthHistory = healthHistory.filter(record => record.date !== recordDate);
        localStorage.setItem('healthHistory', JSON.stringify(healthHistory));
        this.loadHealthHistory();
      }
    },
    mounted() {
      this.loadHealthHistory();
    }
  };
</script>
  
<style scoped>
.history-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: rgba(236, 248, 255, 1);
  min-height: 100vh;
  overflow-x: hidden;
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  z-index: 2;
}
.header h1 {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 120%;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0D0D12;
}

.back-btn, .add-btn {
  background: none;
  border: none;
  padding: 0;
  width:30px; 
  height: 30px;
  cursor: pointer;
}
.back-btn svg, .add-btn svg, .icon svg{
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.tabs {
  position: relative;
  display: flex;
  gap: 4px;
  margin: 10px 0 16px;
  z-index: 2;
  background-color: rgba(249, 249, 249, 1);
  padding: 4px;
  border-radius: 40px;
}
.tab {
  padding: 8px;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 500;
  font-size: 10px;
  line-height: 140%;
  letter-spacing: 0.2px;
  color: #A4ACB9;
  flex: 1;
  background-color: transparent;
}
.tab.active {
  background-color: rgba(255, 255, 255, 1);
  color: #0D0D12;
}

.selected-date {
  font-size: 16px;
  color: #333;
  text-transform: capitalize;
  text-align: left;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.2px;
  color: #0D0D12;
  margin-bottom: 16px;
}

.record-section {
  position: relative;
  margin-bottom: 20px;
  z-index: 2;
}

.record {
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
}

.record-header {
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: right;
  letter-spacing: 0.2px;
  color: #0D0D12;
}

.record-data {
  position: relative;
  display: flex;
  flex-direction: column;
  /* width: 289px; */
}
svg.line {
  width: 100%;
  height: 1px;
  margin: 9px 0;
}
.record-content {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 24px;
  padding: 16px;
  gap: 16px;
  margin-top: 8px;
  touch-action: pan-y;
  
}

.icon {
  position: relative;
  background: none;
  border: none;
  padding: 0;
  width: 40px;
  height: 40px;
  z-index: 4;
}

.data {
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  height: 100%;
}

.data .data-element {
  font-weight: 400;
  font-size: 0.8em;
  line-height: 140%;
  letter-spacing: 0.2px;
  color: #0D0D12;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.data-element span {
  font-weight: 400;
  font-size: 0.6em;
  line-height: 14px;
  letter-spacing: 0.2px;
  color: #818898;
}
.delete-btn {
  position: absolute;
  top: 0;
  left: 100%;
  background-color: rgba(255, 0, 69, 1);
  color: white;
  border: none;
  border-radius: 24px;
  padding: 0;
  cursor: pointer;
  width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.01s;
  overflow: hidden;
  z-index: 1;
}

.delete-btn svg {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.ellipse-top {
  top: -5vh;
}
  </style>