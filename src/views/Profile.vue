<template>
  <div class="profile">
    <div class="ellipse ellipse-top"></div>
    <div class="header">
      <button class="back-btn" @click="$router.go(-1)">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="white"/>
          <path d="M15.975 23.6834C15.8166 23.6834 15.6583 23.6251 15.5333 23.5001L10.475 18.4418C10.2333 18.2001 10.2333 17.8001 10.475 17.5584L15.5333 12.5001C15.775 12.2584 16.175 12.2584 16.4166 12.5001C16.6583 12.7418 16.6583 13.1418 16.4166 13.3834L11.8 18.0001L16.4166 22.6168C16.6583 22.8584 16.6583 23.2584 16.4166 23.5001C16.3 23.6251 16.1333 23.6834 15.975 23.6834Z" fill="#0D0D12"/>
          <path d="M25.0833 18.625H11.0583C10.7167 18.625 10.4333 18.3417 10.4333 18C10.4333 17.6583 10.7167 17.375 11.0583 17.375H25.0833C25.425 17.375 25.7083 17.6583 25.7083 18C25.7083 18.3417 25.425 18.625 25.0833 18.625Z" fill="#0D0D12"/>
        </svg>
      </button>
      <h1>Profile</h1>
    </div>
    <div class="p-content">
      <div class="p-container">
        <div class="p-element gray">
          <span>Personal Info</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="p-element gray">
          <span>Manage Notification</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="p-element gray">
          <span>Active Apple Health</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="p-container">
        <div class="p-element gray">
          <span>Full PDF report</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="p-container">
        <div class="p-element gray">
          <span>Language</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="p-element gray">
          <span>Privacy Policy</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="p-element gray">
          <span>Terms of Use</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="p-element gray">
          <span>Support & Feetback</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="p-container">
        <div class="p-element" @click="handleLogout">
          <span>Log Out</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="#818898" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth';

  export default {
    data() {
      return {
      };
    },
    methods: {
      async handleLogout() {
          const { logout } = useAuth();
          await logout();
      }
    },
  };
</script>

  
<style scoped>
.profile {
  position: relative;
  z-index: 2;
  padding: 20px;
  background-color: rgba(236, 248, 255, 1);
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
.p-content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.p-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;
  background: #F9F9F9;
  border: 1px solid #DFE1E7;
  border-radius: 16px;
  z-index: 2;
  padding: 12px 16px;

}
.p-container:has(.p-element:nth-child(2)) .p-element:not(:last-child) {
  border-bottom: 1px solid #ECEFF3;
}

.p-element {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 1px;
  aspect-ratio: 311/40;

  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.2px;
  color: #0D0D12;
}

.gray span {
  color: #0d0d1283;
}
.gray svg path{
  stroke: #8188987e
}


.ellipse-top {
  top: -10vh;
}

</style>
