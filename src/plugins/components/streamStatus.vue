<template>
  <div>
    <h1>Stream Status</h1>
    <div v-if="event.isLive">
      🟢 Online
      <div>{{event.title}}</div>
    </div>
    <div v-else>❌ Offline</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted: async function() {
    await this.$store.dispatch("twitch/getStreamData", "sorskoot_plays"); //"sorskoot");
  },
  computed: mapState({
    event: state => state.twitch.streamData
  })
};
</script>

<style lang="scss" scoped>

</style>