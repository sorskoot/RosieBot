<template>
  <div>
    <span>{{something}}</span>
    <select>
          <option v-for="option in options" v-bind:key="option.id"
            v-bind:value="option.id" >{{ option.name }}</option>
    </select>
  </div>
</template>

<script>
 import { SpeechRecService } from "./SpeechRecService/speechrec.service";

export default {
  data: function() {
    return {
      something: "",
      options:[]
    };
  },
  beforeCreate: function() {
    
    // this.$store.watch(
    //   state => state.config.config["com.sorskoot.speechrecognition"],
    //   newValue => {
    //         if (!this.speechRecService) {
    //           this.speechRecService = new SpeechRecService(newValue);
    //          // this.speechRecService.getToken().then(x => {
    //             this.speechRecService.setupRecognizer();
    //             this.speechRecService.startRecognizing(r => {
    //               this.something = r;
    //             });
    //           //});
    //         }
    //   });

    //    if (navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {

    //             // Enumerate the media devices.
    //             navigator.mediaDevices.enumerateDevices().then((devices) => {
    //                 // var opt = document.createElement('option');
    //                 // opt.appendChild(document.createTextNode(""));
    //                 // opt.value = undefined;
    //                 // microphoneSource.appendChild(opt);

    //                 for (const device of devices) {
    //                     if (device.kind === "audioinput") {
    //                         // microphoneSource.style = "";
    //                         // // create new option element
    //                         // var opt = document.createElement('option');
    //                         this.options.push({id:device.deviceId, name:device.label})
    //                         // create text node to add to option element (opt)
    //                         // opt.appendChild(document.createTextNode(device.label));

    //                         // // set value property of opt
    //                         // opt.value = device.deviceId;

    //                         //microphoneSource.appendChild(opt);
    //                     }
    //                 }
    //             });
    //         }
  },
  beforeMount: function() {}
};
</script>

<style lang="scss" scoped>
</style>