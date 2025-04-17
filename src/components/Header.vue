<template>
    <header class="app-header">
        <img :src="`${publicPath}logo.png`" alt="Logo">
        <nav class="app-nav">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/instructions" class="nav-link">Instructions</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
        </nav>
    </header>
</template>
  
  <script>
  export default {
    name: 'Header',
    data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
  };
  </script>
  
  <style scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: var(--nav-item-background, #1e1e2e);
    color: var(--page-color, #cdd6f4);
    border-bottom: 1px solid var(--border-color, #313244);
    width: 100%;
    box-sizing: border-box;
  }
  img {
    width: 60px;
    aspect-ratio: 1/1;
  }
  .app-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .app-nav {
    display: flex;
    gap: 15px;
  }
  
  .nav-link {
    color: var(--graph-color, rgb(40, 211, 208));
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s;
  }
  
  .nav-link:hover {
    color: rgb(168, 223, 223);
  }

  .nav-link.router-link-active {
    color: var(--page-color, #cdd6f4);
    font-weight: 600;
    text-decoration: underline;
  }
  
  @media (max-width: 600px) {
  
    .app-title {
      font-size: 1.2rem;
    }
  
    .app-nav {
      gap: 10px;
    }
  
    .nav-link {
      font-size: 0.9rem;
    }
  }
  </style>