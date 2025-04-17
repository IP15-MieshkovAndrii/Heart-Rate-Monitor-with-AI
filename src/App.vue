<template>
  <div id="app">
    <Header />
    <router-view />

  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: var(--page-color);
  background: var(--page-background);
  min-height: 100vh;
}

</style>