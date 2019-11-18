<template>
  <div>
    <h1> {{ message.user}} </h1>
    <div> {{ message.message }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: mapState({
    user: state => state.twitch.user,
    message: state => state.twitchChat.message
  }),
  created: function() {
    //this.$store.dispatch('twitch/GetUser','sorskoot');
  }
};
</script>

<style scoped lang="scss">
</style>
