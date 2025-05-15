<template>
    <div class="dashboard">
        <div class="ellipse ellipse-top"></div>

        <header class="header">
            <h1>Dashboard</h1>
            <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#1F1F1F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12.8794V11.1194C2 10.0794 2.85 9.21945 3.9 9.21945C5.71 9.21945 6.45 7.93945 5.54 6.36945C5.02 5.46945 5.33 4.29945 6.24 3.77945L7.97 2.78945C8.76 2.31945 9.78 2.59945 10.25 3.38945L10.36 3.57945C11.26 5.14945 12.74 5.14945 13.65 3.57945L13.76 3.38945C14.23 2.59945 15.25 2.31945 16.04 2.78945L17.77 3.77945C18.68 4.29945 18.99 5.46945 18.47 6.36945C17.56 7.93945 18.3 9.21945 20.11 9.21945C21.15 9.21945 22.01 10.0694 22.01 11.1194V12.8794C22.01 13.9194 21.16 14.7794 20.11 14.7794C18.3 14.7794 17.56 16.0594 18.47 17.6294C18.99 18.5394 18.68 19.6994 17.77 20.2194L16.04 21.2094C15.25 21.6794 14.23 21.3994 13.76 20.6094L13.65 20.4194C12.75 18.8494 11.27 18.8494 10.36 20.4194L10.25 20.6094C9.78 21.3994 8.76 21.6794 7.97 21.2094L6.24 20.2194C5.33 19.6994 5.02 18.5294 5.54 17.6294C6.45 16.0594 5.71 14.7794 3.9 14.7794C2.85 14.7794 2 13.9194 2 12.8794Z" stroke="#1F1F1F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </header>
    
        <section class="card pulse-section">
            <div v-if="flag">
                <div class="section-header">
                    <h2>Your Pulse</h2>
                    <span>MAR 26, 09:10</span>
                    <button @click="pulseInfo">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0001 1.66683C14.5834 1.66683 18.3334 5.41683 18.3334 10.0002C18.3334 14.5835 14.5834 18.3335 10.0001 18.3335C5.41675 18.3335 1.66675 14.5835 1.66675 10.0002C1.66675 5.41683 5.41675 1.66683 10.0001 1.66683Z" stroke="#1A1B25" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 13.3335V9.16683" stroke="#1A1B25" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.99561 6.6665H10.0031" stroke="#1A1B25" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                </div>
                <div class="pulse-data">
                    <div class="bpm">
                        <div class="pulse-value">{{bpm}}</div>
                        <div class="bpm-units">
                            <svg class="heart-icon" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.48999C0 1.5632 1.74938 0 3.91238 0C5.17201 0 6.28785 0.531409 7 1.35527C7.71241 0.531376 8.83487 0 10.0876 0C12.2506 0 14 1.5632 14 3.48999C14 4.05677 13.8822 4.64052 13.6643 5.22201C12.7622 7.62879 10.1412 10.0063 7.01627 10.9975C7.00579 11.0008 6.99421 11.0008 6.98373 10.9975C3.91223 10.0232 1.32382 8.03886 0.381012 5.54536C0.133975 4.89201 0 4.20383 0 3.48999Z" fill="#FF487A"/>
                            </svg>
                            <span class="unit">bpm</span>
                        </div>

                    </div>
                    <div class="graph-row">
                        <svg width="186" height="61" viewBox="0 0 186 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 31.821H34.2988L43.775 41.3158L55.7783 6.4082L68.7291 54.9996L81.3641 31.821H180" :stroke="statusColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 31.4128H34.2988L43.775 40.9076L55.7783 6L68.7291 54.5914L81.3641 31.4128H179" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <div class="status">
                            <p :class="`status-text ${bpmStatus.replace(/\s+/g, '-')}`">{{bpmStatus}}</p>
                            <p class="hrv">
                                HRV <span>{{hrv}} ms</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="metrics">
                    <div class="metric">
                        <p>Stress</p>
                        <div class="progress-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="4"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f87171" stroke-width="4" :stroke-dasharray="stress + ', 100'"/>
                            </svg>
                            <div class="progress-value">{{stress}}%</div>
                        </div>
                    </div>
                    <div class="metric">
                        <p>Tension</p>
                        <div class="progress-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="4"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fbbf24" stroke-width="4" stroke-dasharray="36, 100"/>
                            </svg>
                            <div class="progress-value">36%</div>
                        </div>
                    </div>
                    <div class="metric">
                        <p>Energy</p>
                        <div class="progress-circle">
                            <svg viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="4"/>
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(177, 222, 53, 1)" stroke-width="4" stroke-dasharray="79, 100"/>
                            </svg>
                            <div class="progress-value">79%</div>
                        </div>

                    </div>
                </div>
            </div>
            <div v-else class="new-day">
                <h3>How are you feeling?</h3>
                <div class="icons">
                    <button @click="$router.push('/progress')">
                        <svg class="heart-icon2" width="68" height="55" viewBox="0 0 68 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 17.45C0 7.81602 8.49701 0 19.003 0C25.1212 0 30.541 2.65704 34 6.77633C37.4603 2.65688 42.9122 0 48.997 0C59.503 0 68 7.81602 68 17.45C68 20.2838 67.4278 23.2026 66.3692 26.1101C61.9879 38.1439 49.2573 50.0313 34.079 54.9875C34.0281 55.0042 33.9719 55.0042 33.921 54.9875C19.0023 50.1161 6.43 40.1943 1.85063 27.7268C0.650735 24.46 0 21.0192 0 17.45Z" fill="rgba(255, 72, 122, 1)"/>
                        </svg>
                    </button>
                    <svg class="plus" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7031 16.4297V26.6719H9.5625V16.4297H0V10.4531H9.5625V0.328125H15.7031V10.4531H25.2656V16.4297H15.7031Z" fill="#FFE6EC"/>
                    </svg>

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
                <p>Tap to start now</p>
            </div>
        </section>
    
        <section class="last-measurement">
            <div class="section-header">
                <h2>Last measurement</h2>
                <button class="see-all" @click="this.$router.push('/history')">See all</button>
            </div>
            <div class="measurement-cards">
                <div class="card heart-rate">
                    <div class="card-header">
                        <span>Heart<br>rate</span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="#ECEFF3"/>
                            <path d="M29.9999 25.2004C29.9999 26.1004 29.7499 26.9503 29.2999 27.6703C28.4699 29.0603 26.9499 30.0004 25.1999 30.0004C23.4499 30.0004 21.9199 29.0603 21.0999 27.6703C20.6599 26.9503 20.3999 26.1004 20.3999 25.2004C20.3999 22.5504 22.5499 20.4004 25.1999 20.4004C27.8499 20.4004 29.9999 22.5504 29.9999 25.2004Z" stroke="#1F1F1F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23.3298 25.1995L24.5098 26.3795L27.0698 24.0195" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M30 16.6896C30 18.6596 29.49 20.3996 28.69 21.9096C27.81 20.9796 26.57 20.3997 25.2 20.3997C22.55 20.3997 20.4 22.5496 20.4 25.1996C20.4 26.4296 20.87 27.5497 21.63 28.3997C21.26 28.5697 20.92 28.7096 20.62 28.8096C20.28 28.9296 19.72 28.9296 19.38 28.8096C16.48 27.8196 10 23.6896 10 16.6896C10 13.5996 12.49 11.0996 15.56 11.0996C17.37 11.0996 18.99 11.9797 20 13.3297C21.01 11.9797 22.63 11.0996 24.44 11.0996C27.51 11.0996 30 13.5996 30 16.6896Z" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p>{{bpm}} <span>bpm</span></p>
                </div>
                <div class="card blood-pressure">
                    <div class="card-header">
                        <span>Blood<br>pressure</span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="20" fill="#ECEFF3"/>
                            <path d="M28.75 21.25C28.75 26.08 24.83 30 20 30C15.17 30 11.25 26.08 11.25 21.25C11.25 16.42 15.17 12.5 20 12.5C24.83 12.5 28.75 16.42 28.75 21.25Z" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 16V21" stroke="#1F1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17 10H23" stroke="#1F1F1F" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </div>
                    <p>130/80 <span>mmHg</span></p>
                </div>
            </div>
        </section>
    
        <div class="card track-health">
            <div class="new-health">
                <h2>Track Your Health</h2>
                <p>with My Heart Rate Monitor - Pulse</p>
                <button @click="$router.push('/progress')" class="measure-btn">
                    <span>Measure</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00008 13.2709C3.54092 13.2709 0.729248 10.4592 0.729248 7.00008C0.729248 3.54092 3.54092 0.729248 7.00008 0.729248C10.4592 0.729248 13.2709 3.54092 13.2709 7.00008C13.2709 10.4592 10.4592 13.2709 7.00008 13.2709ZM7.00008 1.60425C4.02508 1.60425 1.60425 4.02508 1.60425 7.00008C1.60425 9.97508 4.02508 12.3959 7.00008 12.3959C9.97508 12.3959 12.3959 9.97508 12.3959 7.00008C12.3959 4.02508 9.97508 1.60425 7.00008 1.60425Z" fill="white"/>
                        <path d="M9.33317 7.4375H4.6665C4.42734 7.4375 4.229 7.23917 4.229 7C4.229 6.76083 4.42734 6.5625 4.6665 6.5625H9.33317C9.57234 6.5625 9.77067 6.76083 9.77067 7C9.77067 7.23917 9.57234 7.4375 9.33317 7.4375Z" fill="white"/>
                        <path d="M7 9.77067C6.76083 9.77067 6.5625 9.57234 6.5625 9.33317V4.6665C6.5625 4.42734 6.76083 4.229 7 4.229C7.23917 4.229 7.4375 4.42734 7.4375 4.6665V9.33317C7.4375 9.57234 7.23917 9.77067 7 9.77067Z" fill="white"/>
                    </svg>

                </button>

            </div>
            <img :src="imagePath">
        </div>

        <div class="overlay"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        bpm: 67,
        hrv: 68,
        stress: 0,
        tension: 36,
        energy: 79,
        bloodPressure: '130/80',
        flag: false,
      };
    },
    methods: {
        pulseInfo() {
            localStorage.setItem('heartRateData', JSON.stringify({
                bpm: this.bpm,
                hrv: this.hrv,
                stress: this.stress,
            }));
            this.$router.push('/results')
        },
    },
    computed: {
        imagePath() {
            const publicPath = process.env.BASE_URL || '/';
            return `${publicPath}images/woman.png`;
        },
        bpmStatus() {
            if (this.bpm < 60) return 'Low';
            if (this.bpm <= 100) return 'Normal';
            return 'High';
        },
        statusColor() {
            if (this.bpm < 60) return "rgba(61, 187, 255, 1)";
            if (this.bpm <= 100) return 'rgba(177, 222, 53, 1)';
            return 'rgba(255, 72, 122, 1)';
        },

    },
    mounted() {
        const healthHistory = localStorage.getItem('healthHistory');
        
        if (healthHistory) {
            try {
                const parsedData = JSON.parse(healthHistory);

                const latestEntry = parsedData.reduce((latest, current) => {
                    return new Date(current.date).getTime() > new Date(latest.date).getTime() ? current : latest;
                }, parsedData[0]);

                if (latestEntry && latestEntry.data) {
                    this.bpm = Math.round(latestEntry.data.bpm) || this.bpm;
                    this.hrv = Math.round(latestEntry.data.hrv) || this.hrv;
                    this.stress = Math.round(latestEntry.data.stress) || this.stress;
                    
                    const today = new Date();
                    const entryDate = new Date(latestEntry.date);
                    this.flag = entryDate.getFullYear() === today.getFullYear() &&
                            entryDate.getMonth() === today.getMonth() &&
                            entryDate.getDate() === today.getDate();
                    }


            } catch (error) {
                console.error('Error parsing heart rate data:', error);
                this.$router.push({ name: 'home' });
            }

        }
    }
  };
  </script>
  
<style scoped>
.dashboard {
    position: relative;
    min-height: 100vh;
    background: rgba(236, 248, 255, 1);
    padding: 20px;
}

.header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
}
.header h1 {
    font-weight: 700;
    font-size: 32px;
    line-height: 130%;
    color: #36394A;
}
.header button {
    background: rgba(236, 239, 243, 1);
    width: 40px;
    height: 40px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
}

.card {
    position: relative;
    z-index: 2;
    background: white;
    border-radius: 24px;
    padding: 16px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pulse-section .section-header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    align-items: flex-end;
    margin-bottom: 1rem;
}
.pulse-section .section-header h2 {
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 100%;
    color: #1A1B25;
}
.pulse-section .section-header span {
    color: #6b7280;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #666D80;
}
.pulse-section .section-header svg {
    position: relative;
}
.pulse-section .section-header button {
    position: absolute;
    width: 20px;
    height:20px;
    position: absolute;
    right: -5px;
    top:0;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    background: transparent;

}

.pulse-data {
    display: flex;
    align-items: center;
    margin: 0; 
    justify-content: space-between;
    flex: 1 2;
}
.bpm {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 4px;
}
.pulse-value {
    font-weight: 700;
    font-size: 40px;
    line-height: 80%;
    color: #272835;
}
.bpm-units {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.unit {
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.2px;
    color: #818898;
}

.graph-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.graph-row svg {
    position: relative;
    width: 100%;
    right: 0;
}
.status {
    position: absolute;
    text-align: left;
    right: 20px;
}
.status-text {
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
}
.hrv {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.2px;
    color: #666D80;
}
.hrv span {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #1A1B25;
}

.metrics {
    display: flex;
    justify-content: space-between;
    flex: 1 1 1;
}
.metric {
    display: flex;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: rgba(249, 249, 249, 1);
    border-radius: 16px;
    padding: 4px;
    gap: 4px;

}
.metric p {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.2px;
    color: #0D0D12;
}
.progress-circle {
    position: relative;
    width: 35px;
    height: 35px;
}
.progress-circle svg {
    width: 100%;
    height: 100%;
}
.progress-value {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 110%;
    color: #0D0D12;
}

.last-measurement {
    position: relative;
    z-index: 2;
}
.last-measurement .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0;
}
.last-measurement .section-header h2 {
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    color: #0D0D12;
}
.see-all {
    background: transparent;
    border: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: #818898;
}

.measurement-cards {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.measurement-cards .card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px 10px;
    gap: 8px;
    flex: 1;
    border-radius: 24px;
}

.heart-rate {
    background: linear-gradient(180deg, rgba(203, 165, 209, 0.7) 0%, rgba(255, 97, 146, 0.7) 100%), #FFFFFF;
}

.blood-pressure {
    background: linear-gradient(180deg, #CBA5D1 0%, #ABC2E2 100%), #ABC2E2;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    width: 100%;
}

.card-header .icon {
    margin-right: 0.5rem;
    color: #4b5563;
}

.card-header span {
    font-weight: 400;
    font-size: 16px;
    line-height: 120%;
    color: #0D0D12;
    text-align: left;

}
.heart-rate p,
.blood-pressure p {
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    color: #0D0D12;
    text-align: left;
    margin: 0;
}
.heart-rate p span,
.blood-pressure p span {
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    color: #818898;
} 

.track-health {
    position: relative;
    display: flex;
    flex-direction: row;
    background: linear-gradient(331.54deg, rgba(228, 250, 255, 0.6) -1.9%, rgba(171, 194, 226, 0.6) 20.1%, rgba(203, 165, 209, 0.6) 51.83%, rgba(248, 113, 157, 0.6) 77.59%, rgba(255, 97, 146, 0.6) 94.7%), #FFFFFF;
}
.new-health {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    width: 40%;
}

.new-health h2 {
    margin: 0;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    color: #1A1B25;
}

.new-health p {
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;
    color: #1A1B25;
    padding: 0;
}

img {
    position: absolute;
    right: 0;
    width: 100%;
    bottom: 0;
    border-radius: 24px;
    pointer-events: none;
}


.measure-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    background: #1A1B25;
    border-radius: 32px;

    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    color: #FFFFFF;
    border: none;
}

.measure-btn .icon {
    margin-left: 0.5rem;
}

.overlay {
    position: absolute;
    width: 100%;
    height: 101px;
    left: 0px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
    bottom: 0;
    z-index: 3;
    pointer-events: none;
}

.ellipse-top {
    top: -15vh;
}

.new-day{
    /* position: relative; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.new-day h3 {
    padding: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 8px;
    font-weight: 400;
    font-size: 24px;
    line-height: 120%;
    color: #1A1B25;
    text-transform: capitalize;
}
.new-day p {
    margin-top: 1em;
    padding: 0;
    margin-block-start: 0;
    margin-block-end: 0;
}
.icons {
    width: 100%;
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icons button {
    position: absolute;
    width: 68px;
    height: 55px;
    animation: pulseHeart 0.75s infinite;
    background: none;
}

.wave-icon {
    width: 100%;
    position: absolute;
    left: 0;
}
.new-day svg.heart-icon2 {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    
}

.plus {
    position: absolute;
    z-index: 5;
    width: 25px;
    height: 25px;

}



@keyframes pulseHeart {
  0% {
    width: 68px;
    height: 55px;
  }
  25% {
    width: 85px;
    height: 69px;
  }
  50% {
    width: 100px;
    height: 81px;
  }
  75% {
    width: 85px;
    height: 69px;
  }
  100% {
    width: 68px;
    height: 55px;
  }
}
</style>