<template>
  <div>
    <h1>Hello!</h1>
    <div>{{t.text}}</div>
  </div>
</template>

<script>
import Test from "../js/test";

export default {
  name: "hello",
  data() {
    return {
      t: new Test()
    };
  }
};
</script>

<style>
</style>