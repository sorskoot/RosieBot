import { } from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'
import path from 'path';
import { EventEmitter } from 'events';

/**
 * Service for working with the webcam
 */
export class WebCamService extends EventEmitter {

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
    // the link to your model provided by Teachable Machine export panel
    constructor() {
        super();
        this.model = undefined;
        this.webcam = undefined;
        this.maxPredictions = undefined;
        this.latestPrediction = "No Prediction";
        this.predictionRecord = [];
    }

    // Load the image model and setup the webcam
    async init() {
        /** @type {number} The number of frames that have to be predicted in a row before emitting an event */
        this.predictionThreshold = 10;
        const modelURL = path.join(__static, '/model.json');
        const metadataURL = path.join(__static, '/metadata.json');

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        this.model = await tmImage.load(modelURL, metadataURL);
        this.maxPredictions = this.model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        this.webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
        await this.webcam.setup(); // request access to the webcam
        await this.webcam.play();

        this.interval = setInterval(
            async () => {
                this.webcam.update(); // update the webcam frame
                await this.predict();
            }
            , 500);

        this.s = document.createElement("canvas");
        let div = document.createElement('div');
        this.s.width = this.s.height = 200;
        div.appendChild(this.s);
        document.body.appendChild(div);
        // append elements to the DOM
        // document.getElementById("webcam-container").appendChild(webcam.canvas);
        // labelContainer = document.getElementById("label-container");
        // for (let i = 0; i < maxPredictions; i++) { // and class labels
        //     labelContainer.appendChild(document.createElement("div"));
        // }
    }

    // run the webcam image through the image model
    async predict() {
        // predict can take in an image, video or canvas html element
        var wc = this.webcam.canvas.getContext("2d");
        var cropped = this.s.getContext("2d");
        cropped.drawImage(this.webcam.canvas, 50, 50, 200, 200, 0, 0, 200, 200)
        const prediction = await this.model.predict(this.s);
        let pred = {
            "No Headset": 0,
            "Quest": 0
        }

        for (let i = 0; i < this.maxPredictions; i++) {
            pred[prediction[i].className] = prediction[i].probability;
        }
        let newPrediction;
        if (pred["No Headset"] > pred.Quest && pred["No Headset"] > .9) {
            newPrediction = "No Headset";
        }else
            if (pred["No Headset"] < pred.Quest && pred.Quest > .9) {
            newPrediction = "Quest";
        }

        if (this.addLatestPrediction(newPrediction)) {
            if (newPrediction && this.latestPrediction !== newPrediction) {
                this.latestPrediction = newPrediction;
                this.emit('webcam-prediction-change', newPrediction);
            }
        }

    }

    addLatestPrediction(prediction) {
        if(!prediction) return false;
    if (this.predictionRecord[this.predictionRecord.length-1] === prediction) {
            this.predictionRecord.push(prediction);
            if (this.predictionRecord.length === this.predictionThreshold) {
                return true;
            }
        } else {
            this.predictionRecord = [prediction]
        }

        return false;
    }
}
