<template>
  <div class="streamstatus">
    <h1>Status</h1>
    <div class="streamstatus_group" v-if="event.isLive">
      <div class='streamstatus_title'>{{event.title}}</div>
      <div>🟢 Online</div>
      <div>Started: {{event.startedAt | dateTimeFormat("MM/DD/YYYY hh:mm:ss")}}</div>
      <div>Uptime: {{event.uptime}}</div>
    </div>
    <div v-else>❌ Offline</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted: async function() {
    await this.$store.dispatch("twitch/getStreamData", "sorskoot_plays"); //"sorskoot");
    setInterval(async () => {
      await this.$store.dispatch("twitch/getStreamData", "sorskoot_plays"); //"sorskoot");
    }, 30000);
  },
  computed: mapState({
    event: state => state.twitch.streamData
  })
};
</script>

<style lang="scss" scoped>
.streamstatus{
    & .streamstatus_group{
        margin-top:10px;
        margin-left: 20px;
    }
    & .streamstatus_title{
        font-weight: 900;
        font-size:1.2em;
    }
}
</style>