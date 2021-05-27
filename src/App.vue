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
    console.log("config module started")
    await this.$store.dispatch("socket/open");
    console.log("Socket module started")
    await this.$store.dispatch("twitch/connect");
    console.log("Twitch module started")
    await this.$store.dispatch("twitchChat/connect");
    console.log("TwitchChat module started")
    await this.$store.dispatch("api/open");
    console.log("API module started")
    await this.$store.dispatch("speechrec/start");
    console.log("SpeechRec module started")
    await this.$store.dispatch("obs/connect");
    console.log("OBS module started")
    await this.$store.dispatch("rosie/changeState",'started');
    console.log("Rosie module started")
    // await this.$store.dispatch("webcam/initialize");
    // console.log("WebCam module started")
    await this.$store.dispatch("spotify/initialize");
    console.log("Spotify module started")
  }
};
</script>

<style lang="scss">
body {
  background-color: hsl(280, 8%, 14%);
  zoom: .7;
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
