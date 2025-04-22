<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
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