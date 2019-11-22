<template>
  <div class="container">
    <div class="panel"><HelloWorld/></div>
    <div class="panel"><core-chat-trigger/></div>
    <div class="panel"></div>
  </div>
  
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
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

@media screen and (min-width:916px) {
   .container {
       flex-wrap:nowrap;
   } 
   
    .panel {
        flex-basis:1;
        order:1;
    }
}
</style>