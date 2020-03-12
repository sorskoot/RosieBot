<template>
  <div class="chatpanel">
    <ul :key="m.timestamp" v-for="m in messages">
      <li>
        <span :style="{color: m.color}">{{m.user}}</span>:
        <span :inner-html.prop="m.message | applyEmotes(m.emotes)"></span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      messages: []
    };
  },
  props: {
    msg: String
  },
  computed: mapState({
    message: state => state.twitchChat.message
  }),
  filters: {
    applyEmotes: function(input, emotes) {
      if (emotes) {
        var splitText = input.split("");
        for (let i in emotes) {
          const emote = emotes[i];
          for (let j in emote) {
            const mote = emote[j].split("-");
            const length = +mote[1] - +mote[0];
            const empty = Array.apply(null, new Array(length + 1)).map(
              () => ""
            );
            splitText = splitText
              .slice(0, +mote[0])
              .concat(empty)
              .concat(splitText.slice(+mote[1] + 1, splitText.length));
            splitText.splice(
              +mote[0],
              1,
              `<img width="28" src="http://static-cdn.jtvnw.net/emoticons/v1/${i}/3.0">`
            );
          }
        }
        return splitText.join("");
      } else {
        return input;
      }
    }
  },
  watch: {
    message(e) {
      this.messages.unshift(e);
    }
  },
  created: function() {
    //this.$store.dispatch('twitch/GetUser','sorskoot');
  }
};
</script>

<style scoped lang="scss">
.chatpanel {
  max-height: 200px;
  overflow-y: auto;
  & li {
    list-style: none;
    text-align: left;
    color: #eee;
  }
}
</style>
