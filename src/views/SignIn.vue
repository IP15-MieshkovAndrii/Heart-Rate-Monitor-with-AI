<template>
  <div class="sign-in">
    <div class="ellipse ellipse-top"></div>
    <div class="header">
      <button class="back-btn" @click="$router.go(-1)">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="white"/>
          <path d="M15.975 23.6834C15.8166 23.6834 15.6583 23.6251 15.5333 23.5001L10.475 18.4418C10.2333 18.2001 10.2333 17.8001 10.475 17.5584L15.5333 12.5001C15.775 12.2584 16.175 12.2584 16.4166 12.5001C16.6583 12.7418 16.6583 13.1418 16.4166 13.3834L11.8 18.0001L16.4166 22.6168C16.6583 22.8584 16.6583 23.2584 16.4166 23.5001C16.3 23.6251 16.1333 23.6834 15.975 23.6834Z" fill="#0D0D12"/>
          <path d="M25.0833 18.625H11.0583C10.7167 18.625 10.4333 18.3417 10.4333 18C10.4333 17.6583 10.7167 17.375 11.0583 17.375H25.0833C25.425 17.375 25.7083 17.6583 25.7083 18C25.7083 18.3417 25.425 18.625 25.0833 18.625Z" fill="#0D0D12"/>
        </svg>
      </button>
 
      <button class="skip-btn" @click="goDashboard">
        Skip
      </button>
    </div>
     <div class="pulse">
        <svg width="233" height="139" viewBox="0 0 233 139" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M118.511 0.00515477C123.026 0.149502 126.883 3.30245 127.923 7.69816L149.593 99.3125L164.8 67.8807C166.47 64.4286 169.967 62.2357 173.802 62.2357H223C228.523 62.2357 233 66.7128 233 72.2357C233 77.7585 228.523 82.2357 223 82.2357H180.073L155.342 133.355C153.499 137.165 149.457 139.402 145.25 138.941C141.044 138.479 137.583 135.42 136.608 131.302L116.968 48.2699L101.667 98.4074C100.611 101.869 97.7665 104.49 94.2299 105.26C90.6934 106.03 87.0169 104.828 84.6171 102.119L67.0053 82.2357H10C4.47715 82.2357 0 77.7585 0 72.2357C0 66.7128 4.47715 62.2357 10 62.2357H71.5065C74.369 62.2357 77.0943 63.4624 78.9922 65.6052L87.7498 75.4923L108.627 7.08122C109.945 2.76091 113.996 -0.139191 118.511 0.00515477Z" fill="url(#paint0_linear_996_64310)"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M118.239 7.50077C118.917 7.52243 119.495 7.99537 119.651 8.65472L146.828 123.547L172.451 70.5824C172.702 70.0646 173.226 69.7356 173.802 69.7356H223C223.828 69.7356 224.5 70.4072 224.5 71.2356C224.5 72.0641 223.828 72.7356 223 72.7356H174.742L147.69 128.653C147.414 129.225 146.807 129.56 146.176 129.491C145.545 129.422 145.026 128.963 144.88 128.345L118.008 14.7405L93.5375 94.9263C93.3791 95.4456 92.9524 95.8387 92.4219 95.9542C91.8914 96.0697 91.34 95.8895 90.98 95.4831L70.8313 72.7356H10C9.17157 72.7356 8.5 72.0641 8.5 71.2356C8.5 70.4072 9.17157 69.7356 10 69.7356H71.5065C71.9359 69.7356 72.3447 69.9196 72.6294 70.2411L91.4499 91.4891L116.757 8.56218C116.955 7.91414 117.562 7.47912 118.239 7.50077Z" fill="white"/>
          <defs>
          <linearGradient id="paint0_linear_996_64310" x1="-28.5813" y1="-15.4445" x2="43.648" y2="231.042" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E4FAFF"/>
          <stop offset="0.304189" stop-color="#ABC2E2"/>
          <stop offset="0.503569" stop-color="#CBA5D1"/>
          <stop offset="0.745028" stop-color="#F8719D"/>
          <stop offset="0.9" stop-color="#FF6192"/>
          </linearGradient>
          </defs>
        </svg>
    </div>
    <div class="content">
      <h1>Create an Account <br> My Heart Rate Monitor - Pulse</h1>
      <p>Save your data and receive personalized health recommendations</p>
      <button class="service-login">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.0001 10.2247C20.0001 9.56634 19.9405 8.94134 19.8383 8.33301H10.2173V12.0913H15.726C15.4791 13.3247 14.7553 14.3663 13.6826 15.0747V17.5746H16.969C18.8932 15.833 20.0001 13.2663 20.0001 10.2247Z" fill="#0062FF"/>
          <path d="M10.2173 19.9998C12.9759 19.9998 15.2833 19.0998 16.9691 17.5749L13.6826 15.0749C12.7631 15.6749 11.5966 16.0415 10.2173 16.0415C7.55239 16.0415 5.29613 14.2832 4.48728 11.9082H1.09863V14.4832C2.77593 17.7499 6.22417 19.9998 10.2173 19.9998Z" fill="#33AE3F"/>
          <path d="M4.48698 11.9082C4.27412 11.3082 4.16344 10.6666 4.16344 9.99992C4.16344 9.33325 4.28264 8.69159 4.48698 8.09159V5.5166H1.09833C0.400166 6.8666 0 8.38326 0 9.99992C0 11.6166 0.400166 13.1332 1.09833 14.4832L4.48698 11.9082Z" fill="#FFBE4C"/>
          <path d="M10.2173 3.95832C11.7243 3.95832 13.0696 4.46666 14.1339 5.45832L17.0457 2.60833C15.2833 0.991665 12.9759 0 10.2173 0C6.22417 0 2.77593 2.25 1.09863 5.51665L4.48728 8.09165C5.29613 5.71665 7.55239 3.95832 10.2173 3.95832Z" fill="#DF1C1C"/>
        </svg>
        <span>Continue with Google</span>
      </button>
      <button class="service-login">
        <svg  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5622 19.2005C14.4893 20.2524 13.3056 20.0884 12.1774 19.5924C10.9778 19.0865 9.88124 19.0545 8.61442 19.5924C7.03683 20.2804 6.19953 20.0804 5.24941 19.2005C-0.114798 13.6205 0.676968 5.12049 6.77356 4.80049C8.25219 4.88049 9.28742 5.62649 10.1584 5.68849C11.4529 5.42249 12.692 4.66049 14.0776 4.76049C15.7423 4.89649 16.9873 5.56049 17.8187 6.75449C14.3943 8.83448 15.2059 13.3945 18.3512 14.6745C17.7217 16.3445 16.9141 17.9945 15.5602 19.2145L15.5622 19.2005ZM10.0396 4.74049C9.87926 2.2605 11.8686 0.220507 14.1568 0.0205078C14.4715 2.8805 11.5835 5.02049 10.0396 4.74049Z" fill="#272835"/>
        </svg>
        <span>Continue with Apple</span>
      </button>
      <span>or</span>
      <button class="register-btn" @click="goToRegister">Create Account</button>
      <span>By proceeding, you agree to our <a>Terms of Service</a> and <a>Privacy Policy</a></span>
      <p>Already have an account? <a @click="goToLogin">Log In</a></p>
    </div>
    
  </div>
</template>

<script>
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../firebase';

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
        goToRegister() {
          this.$router.push('/register');
        },
        goToLogin() {
          this.$router.push('/login');
        },
        goDashboard() {
          this.$router.push('/dashboard');
        }
    },
  };
</script>

  
<style scoped>
.sign-in {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  z-index: 2;
}
 .pulse svg {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.skip-btn {
  background-color: transparent;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: right;
  letter-spacing: 0.2px;
  color: #818898;
  padding: 0;
}

.pulse {
  position: absolute;
  width: 233px;
  height: 139px;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.content {
  width: 100%;
  position: relative;
  margin-top: calc(25% + 139px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

}
.content h1{
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #0D0D12;
  margin: 0;
}

.content p {
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #36394A;
  width: 100%;
  padding: 0 10%;
  margin: 0;
}

.content span {
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #36394A;
  max-width: 60%;
}

.content a {
  color: rgba(255, 0, 69, 1)
}

.service-login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px;
  gap: 10px;
  width: 90%;
  min-height: 2px;
  aspect-ratio: 343/56;
  background: #FFFFFF;
  border: 1px solid #A4ACB9;
  border-radius: 40px;
}

.content .service-login svg {
  position: relative;
  min-height: 1px;
  height: 15px;
  width: 15px;
  aspect-ratio: 1/1; 
}
.content .service-login span {
  font-weight: 600;
  font-size: 1.1em;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #0D0D12;
}

.register-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 13px 24px;
  gap: 10px;
  width: 90%;
  min-height: 2px;
  aspect-ratio: 343/56;
  background: #FF245F;
  border-radius: 40px;
  border:none;

  box-shadow: 0px 1px 2px rgba(161, 19, 81, 0.5), 0px 0px 0px 1px #EB4768;
  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #FFFFFF;
}

.ellipse-top {
  top: -10vh;
}

</style>
