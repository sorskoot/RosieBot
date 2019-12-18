<template>
  <div>
    <h1>Event Trigger</h1>
    <ul>
      <li v-bind:key="index" v-for="(event, index) in events">
        <span class="event-name">{{event.name}}</span>
        {{event.description}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      events: []
    };
  },
  computed: mapState({
    event: state => state.twitch.event
  }),
  watch: {
    event(e) {
      switch (e.type) {
        case "follow":
          this.events.splice(0, 0, {
            name: e.name,
            description: "has followed."
          });
          break;
        case "raid":
          this.events.splice(0, 0, {
            name: e.name,
            description: `has raided with a party of ${e.raiders}.`
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.event-name {
  font-style: bold;
  font-size:1.2em;
  color: white;
}
</style>