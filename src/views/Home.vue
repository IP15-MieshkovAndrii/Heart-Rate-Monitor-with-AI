<template>
    <div class="home">
      <h5>Measuring</h5>
      <BpmCircle />
      <p>
        Try to cover the entire lens and hold the phone comfortably
      </p>
      <img class="camera" :src="`${publicPath}finger-camera.png`" alt="Camera frame">


    </div>
  </template>
  
  <script>
  import BpmCircle from '../components/BpmCircle.vue';

  
  export default {
    name: 'Home',
    data () {
      return {
        publicPath: process.env.BASE_URL
      }
    },
    components: {
      BpmCircle,
    },
    
  };
  </script>
  
  <style scoped>
  .home {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    align-items: center;
    gap: 20px;
    background-color: white;
  }

  .camera {
    position: fixed;
    width: 80px;
    bottom: 0;
  }
  p {
    color: #818898;
    width: 197px;
    font-size: 14px;
  }
</style>