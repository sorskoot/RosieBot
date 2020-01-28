<template>
  <div class="container">
    <template  v-for="(item,index) in comps">
      <div v-bind:key="index" class="panel">
        <component :is="item" />
      </div>
    </template >

    <!-- <div class="panel">
      <core-chat-trigger />
    </div>
    <div class="panel">
      <core-event-trigger />
    </div>-->
  </div>
</template>

<script >
import components from "../plugins/components/_globals";

console.log(components);

export default {
  name: "home",
  data() {
    //     return {
    //       comps: components
    return {
      comps: components
    };
  }
  //}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.panel {
  flex-basis: 100%;
  min-height: 100px;
}

@media screen and (min-width: 916px) {
  .container {
    flex-wrap: nowrap;
  }

  .panel {
    flex-basis: 1;
    order: 1;
  }
}
</style>