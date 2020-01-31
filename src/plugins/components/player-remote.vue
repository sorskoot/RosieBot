<template>
  <div id="player-remote">
    <div>
      <button @click="onReload">Reload</button>
      <button @click="onPlay">Play</button>
      <button @click="onPause">Pause</button>
      <button @click="onNext">Next</button>
    </div>
    <div>
      <span>Volume:</span>
      <button @click="onLow">Low</button>
      <button @click="onMed">Med</button>
      <button @click="onHigh">High</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
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
  //   let socket = io('http://localhost:9385');
  //     document.getElementById('player-remote-reload').onclick = () => socket.emit('player','reload');
  //     document.getElementById('player-remote-play').onclick = () => socket.emit('player','play');
  //     document.getElementById('player-remote-pause').onclick = () => socket.emit('player','pause');
  //     document.getElementById('player-remote-next').onclick = () => socket.emit('player','next');

  //     document.getElementById('player-remote-vol-low').onclick = () => socket.emit('player','volume', 5);
  //     document.getElementById('player-remote-vol-med').onclick = () => socket.emit('player','volume', 25);
  //     document.getElementById('player-remote-vol-high').onclick = () => socket.emit('player','volume',100);
};
</script>

<style>
</style>