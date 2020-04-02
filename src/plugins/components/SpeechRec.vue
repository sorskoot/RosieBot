<template>
  <div>
    <span>{{something}}</span>
    <!-- <select>
      <option
        v-for="option in options"
        v-bind:key="option.id"
        v-bind:value="option.id"
      >{{ option.name }}</option>
    </select> -->
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      something: "",
      options: []
    };
  },
  beforeCreate: function() {
    this.$store.watch(
      state => state.config.config["com.sorskoot.speechrecognition"],
      newValue => {
        if (!this.speechRecService) {
          this.speechRecService = new SpeechRecService(newValue);
            this.speechRecService.on("wakeup",()=>{

            });         
          this.speechRecService.setupRecognizer();
          this.speechRecService.startRecognizing();
        }
      }
    );

    // if (
    //   navigator &&
    //   navigator.mediaDevices &&
    //   navigator.mediaDevices.enumerateDevices
    // ) {
    //   // Enumerate the media devices.
    //   navigator.mediaDevices.enumerateDevices().then(devices => {
    //     for (const device of devices) {
    //       if (device.kind === "audioinput") {
    //         this.options.push({ id: device.deviceId, name: device.label });
    //       }
    //     }
    //   });
    // }
  },
  beforeMount: function() {}
};
</script>

<style lang="scss" scoped>
</style>