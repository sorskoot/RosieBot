<template>
  <div>
      <h1>Audio Player</h1>
    <div id="player-remote">
      <div class="neobutton" @click="onReload"><font-awesome-icon icon="sync"/></div>
      <div class="neobutton" @click="onPlay"><font-awesome-icon icon="play"/></div>
      <div class="neobutton" @click="onPause"><font-awesome-icon icon="pause"/></div>
      <div class="neobutton" @click="onNext"><font-awesome-icon icon="forward"/></div>
      <div class="neobutton" @click="onLow"><font-awesome-icon icon="volume-down"/></div>
      <div class="neobutton" @click="onHigh"><font-awesome-icon icon="volume-up"/></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon
  },
  methods: {
    onReload: function() {
      this.$store.dispatch("spotify/start");
      //this.$store.dispatch("spotify/repeat");      
    },
    onPlay: function() {
      this.$store.dispatch("spotify/play");
    },
    onPause: function() {
      this.$store.dispatch("spotify/pause");
    },
    onNext: function() {
      // this.$store.dispatch("socket/emit", {
      //   event: "player",
      //   args: "next"
      // });
    },
    onLow: function() {
      // this.$store.dispatch("socket/emit", {
      //   event: "player",
      //   args: { volume: 5 }
      // });
    },
    onMed: function() {
      // this.$store.dispatch("socket/emit", {
      //   event: "player",
      //   args: { volume: 25 }
      // });
    },
    onHigh: function() {
      // this.$store.dispatch("socket/emit", {
      //   event: "player",
      //   args: { volume: 100 }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
#player-remote{
    display:flex;
    align-content: flex-end;
    width: 100%;
}
.neobutton{
    
    display:inline-block;
    border:none;
    color:#000;
    width:50px;
    height:50px;
    
    background: linear-gradient(-45deg, hsl(288, 66%, 88%), hsl(288, 66%, 38%));
    
    border:2px solid hsl(288, 66%, 58%);
    border-radius: 50px;
    
    // box-shadow:  5px 5px 10px #4698c7, 
    //          -5px -5px 10px #64daff;
    margin:5px;
    box-sizing: border-box;
    padding:15px;
    box-shadow: 5px 5px 5px hsl(276, 8%, 16%), -5px -5px 5px hsl(283, 8%, 25%);
    &:hover{
        cursor:pointer;
    }
}
</style>