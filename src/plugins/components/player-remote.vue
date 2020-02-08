<template>
  <div id="player-remote">
    <div>
      <button @click="onReload"><font-awesome-icon icon="sync"/></button>
      <button @click="onPlay"><font-awesome-icon icon="play"/></button>
      <button @click="onPause"><font-awesome-icon icon="pause"/></button>
      <button @click="onNext"><font-awesome-icon icon="forward"/></button>
      <button @click="onLow"><font-awesome-icon icon="volume-down"/></button>
      <button @click="onHigh"><font-awesome-icon icon="volume-up"/></button>
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
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: "reload"
      });
    },
    onPlay: function() {
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: "play"
      });
    },
    onPause: function() {
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: "pause"
      });
    },
    onNext: function() {
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: "next"
      });
    },
    onLow: function() {
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: { volume: 5 }
      });
    },
    onMed: function() {
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: { volume: 25 }
      });
    },
    onHigh: function() {
      this.$store.dispatch("socket/emit", {
        event: "player",
        args: { volume: 100 }
      });
    }
  }
};
</script>

<style>
</style>