<template>
    <div class="add-pulse">
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
</template>
  
<script>


export default {

name: 'NewPulse',
data() {
    return {

    };
},
methods: {

},
};
</script>
<style scoped>

.add-pulse{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    z-index: 2;
    background: white;
    border-radius: 24px;
    padding: 32px 16px 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-pulse p {
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
    margin-bottom: 16px;
}
.icons button {
    position: absolute;
    width: 68px;
    height: 55px;
    animation: pulseHeart 0.75s infinite;
    background: none;
    border: none;
}

.wave-icon {
    width: 100%;
    position: absolute;
    left: 0;
}
.add-pulse svg.heart-icon2 {
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