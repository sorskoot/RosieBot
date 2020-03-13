<template>
  <div>
    <h1>YouTube</h1>
    <div id="youtube-remote">
      <div class="neobutton" @click="onPlay">
        <font-awesome-icon icon="play" />
      </div>
      <div class="neobutton" @click="onStop">
        <font-awesome-icon icon="stop" />
      </div>
    </div>
    <input placeholder="videoId" @change="changeVideoId"  />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon
  },
  data: function() {
    return {
      videoId: ""
    };
  },
  methods: {
    changeVideoId:function(e){
        this.videoId = e.srcElement.value;
    },
    onPlay: function() {
      this.$store.dispatch("socket/emit", {
        event: "youtube-player",
        args: { play: this.videoId }
      });
    },
    onStop: function() {
      this.$store.dispatch("socket/emit", {
        event: "youtube-player",
        args: "stop"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#youtube-remote {
  display: flex;
  align-content: flex-end;
  width: 100%;
}
.neobutton {
  display: inline-block;
  border: none;
  color: #000;
  width: 50px;
  height: 50px;

  background: linear-gradient(-45deg, hsl(288, 66%, 88%), hsl(288, 66%, 38%));

  border: 2px solid hsl(288, 66%, 58%);
  border-radius: 50px;

  // box-shadow:  5px 5px 10px #4698c7,
  //          -5px -5px 10px #64daff;
  margin: 5px;
  box-sizing: border-box;
  padding: 15px;
  box-shadow: 5px 5px 5px hsl(276, 8%, 16%), -5px -5px 5px hsl(283, 8%, 25%);
  &:hover {
    cursor: pointer;
  }
}
</style>