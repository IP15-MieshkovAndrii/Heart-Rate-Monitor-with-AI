<template>
    <div class="results">
        <div class="ellipse ellipse-top"></div>
        <div class="header">
            <h1>Your heart rate looks great!</h1>
            <div class="heart-rate-display">
                <svg class="heart-icon" width="206" height="180" viewBox="0 0 206 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- <text class="bpm" x="0" y="0" font-size="35"></text> -->
                    <g filter="url(#filter0_f_480_3664)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40 71.7272C40 54.2109 55.7445 40 75.2114 40C86.548 40 96.5907 44.831 103 52.3206C109.412 44.8307 119.514 40 130.789 40C150.256 40 166 54.2109 166 71.7272C166 76.8797 164.94 82.1865 162.978 87.4728C154.86 109.353 131.271 130.966 103.146 139.977C103.052 140.008 102.948 140.008 102.854 139.977C75.2101 131.12 51.9144 113.08 43.4291 90.4124C41.2058 84.4728 40 78.2167 40 71.7272Z" fill="url(#paint0_linear_480_3664)"/>
                    </g>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M40 71.7272C40 54.2109 55.7445 40 75.2114 40C86.548 40 96.5907 44.831 103 52.3206C109.412 44.8307 119.514 40 130.789 40C150.256 40 166 54.2109 166 71.7272C166 76.8797 164.94 82.1865 162.978 87.4728C154.86 109.353 131.271 130.966 103.146 139.977C103.052 140.008 102.948 140.008 102.854 139.977C75.2101 131.12 51.9144 113.08 43.4291 90.4124C41.2058 84.4728 40 78.2167 40 71.7272Z" fill="#FF487A"/>
                    <defs>
                    <filter id="filter0_f_480_3664" x="0" y="0" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_480_3664"/>
                    </filter>
                    <linearGradient id="paint0_linear_480_3664" x1="24.544" y1="28.8889" x2="89.707" y2="196.041" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E4FAFF"/>
                    <stop offset="0.304189" stop-color="#ABC2E2"/>
                    <stop offset="0.503569" stop-color="#CBA5D1"/>
                    <stop offset="0.745028" stop-color="#F8719D"/>
                    <stop offset="0.9" stop-color="#FF6192"/>
                    </linearGradient>
                    </defs>

                </svg>
                <div class="bpm">{{ bpm }}</div>
                <svg class="wave-icon" viewBox="0 0 375 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M325.576 0.505425C328.961 0.633663 331.84 3.01502 332.6 6.31598L346.156 65.1428L354.871 46.547C356.105 43.9125 358.752 42.2298 361.662 42.2298H407C411.142 42.2298 414.5 45.5877 414.5 49.7298C414.5 53.8719 411.142 57.2298 407 57.2298H366.43L350.517 91.1829C349.16 94.0795 346.114 95.7962 342.933 95.4581C339.752 95.1199 337.136 92.8014 336.418 89.6842L324.205 36.6852L314.018 69.3627C313.193 72.0095 310.975 73.9852 308.25 74.5C305.526 75.0149 302.74 73.9849 301.006 71.8218L289.308 57.2298H100.511L84.3181 90.6111C82.9338 93.4648 79.9041 95.1392 76.7513 94.793C73.5986 94.4467 71.0045 92.1547 70.2725 89.0686L57.9537 37.1282L48.7124 67.33C47.919 69.923 45.7876 71.8858 43.1381 72.4634C40.4886 73.041 37.7336 72.1434 35.9329 70.1158L24.4886 57.2298H-13C-17.1421 57.2298 -20.5 53.8719 -20.5 49.7298C-20.5 45.5877 -17.1421 42.2298 -13 42.2298H27.8586C30.002 42.2298 32.043 43.1469 33.4663 44.7495L38.2776 50.1669L51.6995 6.30248C52.6902 3.06477 55.7273 0.892342 59.1115 1.00079C62.4956 1.10924 65.3875 3.47167 66.1688 6.76617L80.0097 65.1241L89.0648 46.4565C90.3189 43.8713 92.9396 42.2298 95.8128 42.2298H292.907C295.183 42.2298 297.336 43.263 298.759 45.0385L303.893 51.4418L318.132 5.76785C319.14 2.5339 322.191 0.377187 325.576 0.505425Z" fill="url(#paint0_linear_940_56191)"/>
                    <g filter="url(#filter0_i_940_56191)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M325.33 7.00072C325.781 7.01782 326.165 7.33534 326.266 7.77546L344.05 84.9524L360.756 49.3054C360.921 48.9541 361.274 48.7298 361.662 48.7298H407C407.552 48.7298 408 49.1775 408 49.7298C408 50.2821 407.552 50.7298 407 50.7298H362.298L344.631 88.4244C344.45 88.8106 344.044 89.0395 343.62 88.9944C343.196 88.9494 342.847 88.6402 342.752 88.2246L325.147 11.8247L307.812 67.4281C307.702 67.781 307.407 68.0444 307.043 68.1131C306.68 68.1817 306.309 68.0444 306.077 67.756L292.427 50.7298H96.4392L78.4698 87.7742C78.2852 88.1547 77.8813 88.378 77.4609 88.3318C77.0406 88.2856 76.6947 87.98 76.5971 87.5685L58.7489 12.3144L42.4969 65.4281C42.3911 65.7738 42.1069 66.0355 41.7536 66.1125C41.4003 66.1895 41.033 66.0698 40.7929 65.7995L27.4092 50.7298H-13C-13.5523 50.7298 -14 50.2821 -14 49.7298C-14 49.1775 -13.5523 48.7298 -13 48.7298H27.8586C28.1443 48.7298 28.4165 48.852 28.6063 49.0657L41.1056 63.1396L57.915 8.20431C58.0471 7.77261 58.4521 7.48295 58.9033 7.49741C59.3545 7.51187 59.7401 7.82686 59.8443 8.26613L77.8954 84.3759L94.9131 49.2933C95.0803 48.9486 95.4297 48.7298 95.8128 48.7298H292.907C293.211 48.7298 293.498 48.8675 293.688 49.1043L306.462 65.0386L324.337 7.70238C324.472 7.27119 324.878 6.98362 325.33 7.00072Z" fill="white"/>
                    </g>
                    <defs>
                    <filter id="filter0_i_940_56191" x="-14" y="7" width="422" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_940_56191"/>
                    </filter>
                    <linearGradient id="paint0_linear_940_56191" x1="-73.86" y1="-10.0556" x2="-54.4597" y2="170.791" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#E4FAFF"/>
                    <stop offset="0.304189" stop-color="#ABC2E2"/>
                    <stop offset="0.503569" stop-color="#CBA5D1"/>
                    <stop offset="0.745028" stop-color="#F8719D"/>
                    <stop offset="0.9" stop-color="#FF6192"/>
                    </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
        <Metrics/>
        <button class="continue-btn" @click="continueButton">Continue</button>
    </div>
  </template>
  
<script>
import { useQuery, useMutation } from '@vue/apollo-composable';
import Metrics from '@/components/Metrics.vue';
import { CREATE_PROFILE, CREATE_PULSE_HISTORY, GET_PROFILE } from '@/utils/database';

  export default {
    data() {
      return {
        bpm: 0,
        profileId: null,
      };
    },
    components: {
      Metrics,
    },
    methods: {
        async continueButton() {
            try {
                const firebaseToken = localStorage.getItem('firebaseToken');
                if (!firebaseToken) {
                  console.log('No firebaseToken found in localStorage');
                  this.$router.push('/sign-in');
                  return;
                }
                const { data: profileData, error: profileError } = await this.getProfile();
                let profileId = profileData?.profile?.id;

                if (profileError) {
                  console.log('Error fetching profile:', profileError);
                }

                if (!profileId) {
                  
                  const healthData = JSON.parse(localStorage.getItem('health') || '{}');
                  const profileInput = {
                    gender: healthData?.gender?.toLowerCase() || 'male',
                    height: parseFloat(healthData.height) || 180,
                    weight: parseFloat(healthData.weight) || 68
                  };
                  

                  const { data: createData, error: createError } = await this.createProfile({
                    input: profileInput,
                  });

                  if (createError) {
                    console.log('Error creating profile:'+createError);
                    this.$router.push('/sign-in');
                    return;
                  }

                  if (createData?.profileCreate?.id) {
                    console.log('Profile created with ID:', createData.profileCreate.id);
                    this.profileId = createData.profileCreate.id;
                    console.log('Profile created successfully!');
                  } else {
                    console.log('Profile creation failed: No ID returned');
                    return;
                  }

                  if(createData && createData.profileCreate.id) {
                    console.log('YAS')
                  }
                }


                if (this.bpm) {
                  const { data: pulseData, error: pulseError } = await this.createPulseHistory({
                    input: { 
                      
                      pulse: parseInt(this.bpm) },
                  });

                  if (pulseError) {
                    console.log('Error creating pulse history:'+pulseError);
                  }

                  console.log('Pulse history created:', pulseData);
                }

                localStorage.removeItem('heartRateData');
                this.$router.push('/sign-in');
            } catch (error) {
              console.log('Error in continueButton:'+error);
              this.$router.push('/sign-in');
            }
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
            this.date = parsedData.date;
        } catch (error) {
            console.error('Error parsing heart rate data:', error);
            this.$router.push('/dashboard');
        }
    },
    setup() {
        const { result: profileResult, error: profileError} = useQuery(GET_PROFILE);
        const { mutate: createProfileMutate, error: createProfileError } = useMutation(CREATE_PROFILE);
        const { mutate: createPulseHistoryMutate, error: createPulseHistoryError  } = useMutation(CREATE_PULSE_HISTORY);

        return {
          getProfile: async () => ({ data: profileResult.value, error: profileError.value }),
          createProfile: async (variables) => {
            const { data, error } = await createProfileMutate(variables);
            return { data, error: error || createProfileError.value };
          },
          createPulseHistory: async (variables) => {
            const { data, error } = await createPulseHistoryMutate(variables);
            return { data, error: error || createPulseHistoryError.value };
          },
        };
    },
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
    flex-direction: column;
  }
  
  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    font-size: 32px;
    line-height: 130%;
    text-align: center;
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

  
  .continue-btn {
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
    padding: 8px 16px;
    background: #FF0045;
    box-shadow: 0px 1px 2px rgba(13, 13, 18, 0.06);
    border-radius: 40px;

    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    letter-spacing: 0.2px;
    color: #FFFFFF;

  }
  .ellipse-top {
    top: -15vh;
  }
  </style>