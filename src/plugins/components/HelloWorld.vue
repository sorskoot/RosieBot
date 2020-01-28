<template>
  <div>
    <h1> {{ message.user}} </h1>
    <div> {{ message.message }}</div>
    <button v-on:click="foo">click</button>
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
  methods:{
    async foo(){
        await this.$store.dispatch("socket/emit",{event:"render emotes",args:"hello"});
    }
  },
  created: function() {
    //this.$store.dispatch('twitch/GetUser','sorskoot');
  }
};
</script>

<style scoped lang="scss">
</style>
