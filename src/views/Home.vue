<template>
  <div class="container">
    
      <div v-bind:key="index" class="panel" v-for="(item,index) in comps">
        <component :is="item" />
      </div>
    

    <!-- <div class="panel">
      <core-chat-trigger />
    </div>
    <div class="panel">
      <core-event-trigger />
    </div>-->
  </div>
</template>

<script>
import components from "../plugins/components/_globals";

export default {
  name: "home",
  data() {
    return {
      comps: components
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  //flex-direction: row;
 // justify-content: flex-start;
 // align-items: stretch;
}

.panel {
  margin:11px;
  padding:11px;
  flex: 1 0 350px;
  //flex-basis: 300px;
  //flex-grow: 1;
  min-height: 100px;
  //min-width: 300px;
  border-radius: 11px;
  box-shadow: 5px 5px 5px #1e1b20, -5px -5px 5px #2c272e;

}

// @media screen and (min-width: 916px) {
//   .container {
//     flex-wrap: wrap;
//   }

//   .panel {
//     flex: 1 0 300px;
//     //flex-basis: 1;
//     order: 1;
    
//   }
// }
</style>