<template>
  <div class="login">
    <div class="ellipse ellipse-top"></div>
    <div class="header">
      <button class="back-btn" @click="$router.go(-1)">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="white"/>
          <path d="M15.975 23.6834C15.8166 23.6834 15.6583 23.6251 15.5333 23.5001L10.475 18.4418C10.2333 18.2001 10.2333 17.8001 10.475 17.5584L15.5333 12.5001C15.775 12.2584 16.175 12.2584 16.4166 12.5001C16.6583 12.7418 16.6583 13.1418 16.4166 13.3834L11.8 18.0001L16.4166 22.6168C16.6583 22.8584 16.6583 23.2584 16.4166 23.5001C16.3 23.6251 16.1333 23.6834 15.975 23.6834Z" fill="#0D0D12"/>
          <path d="M25.0833 18.625H11.0583C10.7167 18.625 10.4333 18.3417 10.4333 18C10.4333 17.6583 10.7167 17.375 11.0583 17.375H25.0833C25.425 17.375 25.7083 17.6583 25.7083 18C25.7083 18.3417 25.425 18.625 25.0833 18.625Z" fill="#0D0D12"/>
        </svg>
      </button>
      <h2>Log In</h2>
      <button class="back-btn">
      </button>
    </div>
    <div class="content">
      <div class="input-container">
        <input 
          v-model="email" 
          placeholder="Email" 
          :class="{ 'invalid-input': errors.email }" 
        />
        <span class="error-message" v-if="errors.email">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4.33333V7M7 9.66667H7.00667M1 7C1 7.78793 1.15519 8.56815 1.45672 9.2961C1.75825 10.0241 2.20021 10.6855 2.75736 11.2426C3.31451 11.7998 3.97595 12.2417 4.7039 12.5433C5.43185 12.8448 6.21207 13 7 13C7.78793 13 8.56815 12.8448 9.2961 12.5433C10.0241 12.2417 10.6855 11.7998 11.2426 11.2426C11.7998 10.6855 12.2417 10.0241 12.5433 9.2961C12.8448 8.56815 13 7.78793 13 7C13 5.4087 12.3679 3.88258 11.2426 2.75736C10.1174 1.63214 8.5913 1 7 1C5.4087 1 3.88258 1.63214 2.75736 2.75736C1.63214 3.88258 1 5.4087 1 7Z" stroke="#DF1C41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ errors.email }}
        </span>
      </div>
      <div class="input-container">
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password (8+ characters)" 
          :class="{ 'invalid-input': errors.password }" 
        />
        <span class="error-message" v-if="errors.password">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 4.33333V7M7 9.66667H7.00667M1 7C1 7.78793 1.15519 8.56815 1.45672 9.2961C1.75825 10.0241 2.20021 10.6855 2.75736 11.2426C3.31451 11.7998 3.97595 12.2417 4.7039 12.5433C5.43185 12.8448 6.21207 13 7 13C7.78793 13 8.56815 12.8448 9.2961 12.5433C10.0241 12.2417 10.6855 11.7998 11.2426 11.2426C11.7998 10.6855 12.2417 10.0241 12.5433 9.2961C12.8448 8.56815 13 7.78793 13 7C13 5.4087 12.3679 3.88258 11.2426 2.75736C10.1174 1.63214 8.5913 1 7 1C5.4087 1 3.88258 1.63214 2.75736 2.75736C1.63214 3.88258 1 5.4087 1 7Z" stroke="#DF1C41" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ errors.password }}</span>
      </div>
      <a>Forgot your password?</a>

      
    </div>
    <button 
      class="continue-btn"
      :class="{ 'disabled-btn': isButtonDisabled }" 
      :disabled="isButtonDisabled"
      @click="login"
    >
      Continue
    </button>
    
    
  </div>
</template>

<script>
import { useAuth } from '@/composables/useAuth';
  export default {
    data() {
      return {
        password: '',
        email: '',
        errors: {
          password: '',
          email: '',
        },
      };
    },
    computed: {
      isButtonDisabled() {
        return !this.password.trim() || !this.email.trim();
      },
    },
    methods: {
      validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
    async login() {
      this.errors = {
        password: '',
        email: '',
      };

      let hasError = false;

      if (!this.email.trim()) {
        this.errors.email = 'Email is required';
        hasError = true;
      } else if (!this.validateEmail(this.email.trim())) {
        this.errors.email = 'Your email is not in the correct format';
        hasError = true;
      }

      if (!this.password.trim()) {
        this.errors.password = 'Password is required';
        hasError = true;
      }


      if (!hasError) {
        const { login } = useAuth();
        try {
          const result = await login(this.email.trim(), this.password);
          
          if (result.success) {
            localStorage.setItem('firebaseToken', result.token);
            this.$router.push('/dashboard');
          } else {
            switch (result.error) {
              case 'auth/user-not-found':
                this.errors.email = 'No account found with this email';
                break;
              case 'auth/wrong-password':
                this.errors.password = 'Incorrect password';
                break;
              case 'auth/invalid-email':
                this.errors.email = 'Invalid email format';
                break;
              default:
                this.errors.email = result.message || 'Login failed';
            }
          }
        } catch (error) {
          console.error('Login error:', error);
          this.errors.email = 'An unexpected error occurred';
        }
      }
    },
    },
  };
</script>

  
<style scoped>
.login {
  position: relative;
  z-index: 2;
  padding: 16px;
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  z-index: 2;
}

.header h2 {
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0D0D12;
}

.pulse svg {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  gap: 10px;
}

.content .input-container {
  position: relative;
  width: 100%;
}

.input-container input {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;

  width: 100%;
  min-height: 1px;
  aspect-ratio: 343/48;
  background: #FFFFFF;
  border: 1px solid #A4ACB9;
  border-radius: 40px;
}

.continue-btn{

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;
  gap: 10px;
  border: none;

  width: calc(100% - 32px);
  min-height: 1px;
  aspect-ratio: 343/52;
  background: #FF245F;
  box-shadow: 0px 1px 2px rgba(161, 19, 81, 0.5), 0px 0px 0px 1px #EB4768;
  border-radius: 40px;

  font-weight: 600;
  font-size: 16px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #FFFFFF;

  position: fixed;
  bottom: 16px;
}

.continue-btn.disabled-btn {
  background: #FF6D94;
  box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);
  cursor: not-allowed;
}

.content input.invalid-input {
  box-shadow: 0px 0px 1px 3px rgba(223, 28, 65, 0.15), inset 0px 0px 0px 1px #EC778D;
}

.content a {
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  letter-spacing: 0.2px;
  color: #FF0045;
}

.error-message {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  text-align: left;
  color: #DF1C41;
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 155%;
  gap: 4px;
}

.ellipse-top {
  top: -10vh;
}

</style>



