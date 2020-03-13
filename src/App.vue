<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<script>
export default {
  created: async function() {
    await this.$store.dispatch("config/loadConfig");
    await this.$store.dispatch("socket/open");
    await this.$store.dispatch("twitch/connect");
    await this.$store.dispatch("twitchChat/connect");
    await this.$store.dispatch("api/open");
  }
};
</script>

<style lang="scss">
body {
  background-color: hsl(280, 8%, 14%);
  
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: hsl(280, 8%, 74%);
}
h1{
    font-size: 1.2em;
    font-family: sans-serif;
    color: hsl(280, 8%, 94%);
    margin:0;
    padding:0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
