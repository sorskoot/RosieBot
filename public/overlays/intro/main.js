/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
            /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
        /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
}
        /******/
};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function (exports) {
/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
        /******/
};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function (value, mode) {
/******/ 		if (mode & 1) value = __webpack_require__(value);
/******/ 		if (mode & 8) return value;
/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
        /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
        /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
    /******/
})
/************************************************************************/
/******/({

/***/ "./src/classes/components/countdown.component.js":
/*!*******************************************************!*\
  !*** ./src/classes/components/countdown.component.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function (module, exports) {

            AFRAME.registerComponent('countdown', {
                schema: {},
                init: function () {
                    this.neon = this.el.components['neotext'];
                    this.time = 10 * 60;
                },
                update: function (oldData) {

                },
                tick: function (time, timeDelta) {
                    this.time -= (timeDelta / 1000);
                    if (this.time < 0) {
                        this.el.setAttribute('neontext', {
                            text: `Almost Ready!`
                        });
                    } else {
                        let min = ~~(this.time / 60);
                        let sec = ~~(this.time % 60);
                        this.el.setAttribute('neontext', {
                            text: `${("00" + min).slice(-2)}:${("00" + sec).slice(-2)}`
                        });
                    }


                },
                tock: function (time, timeDelta, camera) { },
                remove: function () { },
                pause: function () { },
                play: function () { },
                updateSchema: function (data) { }
            });

            /***/
}),

/***/ "./src/classes/components/game.component.js":
/*!**************************************************!*\
  !*** ./src/classes/components/game.component.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('game', {
                schema: {
                    currentwave: { default: 0 }
                },

                init: function () {

                }

            }));

            /***/
}),

/***/ "./src/classes/components/ground.component.js":
/*!****************************************************!*\
  !*** ./src/classes/components/ground.component.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_geom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/geom */ "./src/classes/utils/geom.js");


/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('ground', {
                schema: {},
                init: function () {
                    const canvas = { width: 500, height: 500 }

                    //var bufferGeometry = new THREE.PlaneBufferGeometry( 500,500, 500, 500 );
                    this.geometry = new THREE.Geometry();

                    let usedVerts = [];
                    this.vertices = [];
                    let faces = [];
                    for (let x = 0; x < canvas.width; x++) {
                        for (let y = 0; y < canvas.height; y++) {
                            let i = (y * canvas.width + x) * 4;
                            this.geometry.vertices.push(
                                new THREE.Vector3((x - canvas.width / 2),
                                    0,
                                    (y - canvas.height / 2))
                            );

                        }
                    }

                    for (let x = 0; x < canvas.width - 1; x++) {
                        for (let y = 0; y < canvas.height - 1; y++) {
                            let d = x;
                            let v1 = (y * canvas.width + d);
                            let v2 = (y * canvas.width + d + 1);
                            let v3 = ((y + 1) * canvas.width + d);
                            let v4 = ((y + 1) * canvas.width + d + 1);
                            if (this.geometry.vertices[v1] &&
                                this.geometry.vertices[v2] &&
                                this.geometry.vertices[v3] &&
                                this.geometry.vertices[v4]) {

                                this.geometry.faces.push(
                                    new THREE.Face3(v1, v2, v3)
                                );


                                this.geometry.faces.push(
                                    new THREE.Face3(v2, v4, v3)
                                );

                            }
                        }
                    }
                    let bufferGeometry = new THREE.BufferGeometry().
                        fromGeometry(this.geometry);

                    Object(_utils_geom__WEBPACK_IMPORTED_MODULE_0__["unindexBufferGeometry"])(bufferGeometry);
                    Object(_utils_geom__WEBPACK_IMPORTED_MODULE_0__["addBarycentricCoordinates"])(bufferGeometry, true);

                    var plane = new THREE.Mesh(bufferGeometry);

                    this.el.setObject3D('mesh', plane);

                }
            }));

            /***/
}),

/***/ "./src/classes/components/mountains.component.js":
/*!*******************************************************!*\
  !*** ./src/classes/components/mountains.component.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_perlin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/perlin */ "./src/classes/utils/perlin.js");
/* harmony import */ var _utils_geom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/geom */ "./src/classes/utils/geom.js");



/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('mountains', {
                init: function () {
                    //let geometry = new THREE.Geometry();

                    let canvas = document.createElement("canvas");
                    canvas.width = canvas.height = 100;

                    let ctx = canvas.getContext("2d");
                    let gradient = ctx.createRadialGradient(50, 50, 20, 50, 50, 80);
                    gradient.addColorStop(0, '#ffffff00');
                    gradient.addColorStop(.2, '#ffffffff');
                    gradient.addColorStop(.4, '#ffffff00');

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(canvas.height / 2, canvas.height / 2, 412, 0, 2 * Math.PI);
                    ctx.fill();

                    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let data = imageData.data;
                    for (let x = 0; x < canvas.width; x++) {
                        for (let y = 0; y < canvas.height; y++) {
                            let v = Object(_utils_perlin__WEBPACK_IMPORTED_MODULE_0__["noise2d"])(20 * x / canvas.width, 20 * y / canvas.height);
                            let i = (y * canvas.width + x) * 4;
                            data[i + 0] = Math.min(v * data[i + 0] + data[i + 0] / 8, 255);
                            data[i + 1] = 0;//Math.min(v * data[i + 1]+ data[i + 1]/8,255);
                            data[i + 2] = 0;//Math.min(v * data[i + 2]+ data[i + 2]/8,255);
                            data[i + 3] = 0xff;
                        }
                    }
                    ctx.putImageData(imageData, 0, 0);

                    let heightmap = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                    let geometry = new THREE.Geometry();

                    for (let x = 0; x < canvas.width; x++) {
                        for (let y = 0; y < canvas.height; y++) {
                            let i = (y * canvas.width + x) * 4;
                            if (heightmap[i] !== undefined) {
                                geometry.vertices.push(
                                    new THREE.Vector3((x - canvas.width / 2) * 10, heightmap[i] / 5,
                                        (y - canvas.height / 2) * 10)
                                );
                            };
                        }
                    }
                    let usedVerts = []

                    for (let x = 0; x < canvas.width - 1; x++) {
                        for (let y = 0; y < canvas.height - 1; y++) {
                            let v1 = (y * canvas.width + x);
                            let v2 = (y * canvas.width + x + 1);
                            let v3 = ((y + 1) * canvas.width + x);
                            let v4 = ((y + 1) * canvas.width + x + 1);
                            if (geometry.vertices[v1] && geometry.vertices[v2] && geometry.vertices[v3] && geometry.vertices[v4]) {
                                if (isNotZero(geometry.vertices[v1], geometry.vertices[v2], geometry.vertices[v3])) {
                                    geometry.faces.push(
                                        new THREE.Face3(v1, v2, v3)
                                    );
                                    usedVerts[v1] = usedVerts[v2] = usedVerts[v3] = true;
                                }
                                if (isNotZero(geometry.vertices[v2], geometry.vertices[v4], geometry.vertices[v3])) {
                                    geometry.faces.push(
                                        new THREE.Face3(v2, v4, v3)
                                    );
                                    usedVerts[v2] = usedVerts[v4] = usedVerts[v3] = true;
                                }
                            }
                        }
                    }

                    // let geometry = new THREE.PlaneGeometry(20, 20, 1, 1);

                    // let texture = new THREE.CanvasTexture(canvas);

                    // let material = new THREE.MeshBasicMaterial( {
                    //     map: texture, side: THREE.DoubleSide} );

                    let mountainsGeomety = new THREE.BufferGeometry().fromGeometry(geometry);//new THREE.Points(geometry);

                    Object(_utils_geom__WEBPACK_IMPORTED_MODULE_1__["unindexBufferGeometry"])(mountainsGeomety);
                    Object(_utils_geom__WEBPACK_IMPORTED_MODULE_1__["addBarycentricCoordinates"])(mountainsGeomety, false);

                    let mountains = new THREE.Mesh(mountainsGeomety);
                    this.el.setObject3D('mesh', mountains);

                    // this.el.setAttribute('material', {
                    //     shader: 'flat',
                    //     src: canvas,
                    // });

                },
            }));

            function isNotZero(v1, v2, v3) {
                return !(v1.y === 0 && v2.y === 0 && v3.y === 0);
            }

            /***/
}),

/***/ "./src/classes/components/music.component.js":
/*!***************************************************!*\
  !*** ./src/classes/components/music.component.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_perlin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/perlin */ "./src/classes/utils/perlin.js");
/* harmony import */ var _utils_geom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/geom */ "./src/classes/utils/geom.js");



            const WIDTH = 1080;
            const HEIGHT = 128;
            const BARWIDTH = 40;

            const SMOOTHING = 0.8;
            const FFT_SIZE = 2048;
            const canvas = { width: 50, height: 50 }

            AFRAME.registerComponent('music', {
                schema: {},
                init: function () {
                    this.registers = []; //order of eventing after render
                    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    this.analyser = audioCtx.createAnalyser();
                    this.analyser.connect(audioCtx.destination);
                    this.analyser.minDecibels = -80;
                    this.analyser.maxDecibels = 0;
                    this.analyser.fftSize = FFT_SIZE;
                    this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
                    this.times = new Uint8Array(this.analyser.frequencyBinCount);
                    const audioElement = document.createElement('audio');

                    // myAudio.addEventListener('ended', function() {
                    //     this.currentTime = 0;
                    //     this.play();
                    // }, false);
                    
                    fetch('Kaiolyn_PressStart.mp3')//'EVA_Strt.mp3')
                    .then(x=>{
                        x.text().then(
                             data=>{
                            audioElement.dataset.id = 1;
                            audioElement.controls = false;
                            audioElement.volume = 1;
                            audioElement.loop = true;
                            let source = document.createElement('source');
                            source.src = data;
                            audioElement.append(source);
                            audioElement.play();
                            let track = audioCtx.createMediaElementSource(audioElement);
                            track.connect(this.analyser);    
                        })
                    });
                    

                    this.update();
                },

                update: function (oldData) {
                    this.canvas = document.createElement("canvas");
                    this.canvas.width = this.canvas.height = 1024;
                    this.ctx = this.canvas.getContext("2d");
                    //  for (let i = 0; i < 1024; i++) {
                    //}

                    this.texture = new THREE.Texture(this.canvas); //renders straight from a canvas

                    if (this.el.object3D.children.length > 0) { //backwards compatibility
                        this.el.object3D.children[0].material = new THREE.MeshBasicMaterial();
                        this.el.object3D.children[0].material.transparent = true;
                        this.el.object3D.children[0].material.map = this.texture;

                    }
                    else { //backwards compatibility
                        this.el.object3D.material = new THREE.MeshBasicMaterial();
                        this.el.object3D.material.map = this.texture;
                        this.el.object3D.material.transparent = true;
                    }
                    this.render();
                },
                tick: function (time, timeDelta) {

                    this.analyser.smoothingTimeConstant = SMOOTHING;
                    this.analyser.fftSize = FFT_SIZE;

                    // Get the frequency data from the currently playing music
                    this.analyser.getByteFrequencyData(this.freqs);
                    this.analyser.getByteTimeDomainData(this.times);
                    this.ctx.fillStyle = 'hsla(0, 0%, 100%, 0)';
                    this.ctx.clearRect(0, 0, 1024, 1024);

                    for (let i = 0; i < 32; i++) {
                        this.ctx.fillStyle = "#e21b90";
                        this.ctx.shadowColor = "#ff0d77ff";
                        this.ctx.shadowBlur = 15;
                        this.ctx.fillRect(32 + i * 16, 512 - this.freqs[i * 16] * 4, 8, this.freqs[i * 16] * 8);
                        this.ctx.fillRect(1024 - 32 - i * 16, 512 - this.freqs[i * 16] * 4, 8, this.freqs[i * 16] * 8);
                    }

                    this.render();
                }, register: function (render) {
                    this.registers.push(render);
                },
                tock: function (time, timeDelta, camera) { },
                remove: function () { },
                pause: function () { },
                play: function () { },
                updateSchema: function (data) { },
                render: function () {
                    if (this.registers.length > 0) { //backwards compatibility
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.ctx.fillStyle = this.data.background;
                        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                        this.registers.forEach(function (item) {
                            item();
                        });
                    }
                    this.texture.needsUpdate = true;
                },
            });

            /***/
}),

/***/ "./src/classes/components/neontext.component.js":
/*!******************************************************!*\
  !*** ./src/classes/components/neontext.component.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('neontext', {
                schema: {
                    text: { default: 'Neon text' },
                    fontsize: { default: 150 },
                    font: { default: 'Serif' },
                    color: { default: '#e21b90' }

                },
                init: function () {
                    this.update();
                },
                update: function () {

                    let canvas = document.createElement("canvas");
                    canvas.width = canvas.height = 1024;
                    let ctx = canvas.getContext("2d");

                    ctx.fillStyle = 'white';
                    ctx.font = `${this.data.fontsize}px ${this.data.font}`;
                    ctx.textAlign = 'center';

                    while (ctx.measureText(this.data.text).width > canvas.width && this.data.fontsize > 1) {
                        this.data.fontsize--;
                        ctx.font = `${this.data.fontsize}px ${this.data.font}`;
                    }

                    ctx.fillText(this.data.text, 512, 123);

                    ctx.strokeStyle = this.data.color;
                    ctx.lineWidth = (this.data.fontsize / 75);
                    ctx.strokeText(this.data.text, 512, 123);


                    ctx.fillStyle = this.data.color;
                    ctx.shadowColor = this.data.color;
                    ctx.shadowBlur = 15;
                    ctx.fillText(this.data.text, 512 + (this.data.fontsize / 50), 123 + (this.data.fontsize / 50));

                    this.el.setAttribute('material', {
                        transparent: true,
                        src: canvas,
                    });
                },
            }));

            /***/
}),

/***/ "./src/classes/components/space.component.js":
/*!***************************************************!*\
  !*** ./src/classes/components/space.component.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_perlin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/perlin */ "./src/classes/utils/perlin.js");


/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('space', {
                schema: {},
                init: function () {
                    var canvas = document.createElement("canvas");
                    canvas.width = 2048;
                    canvas.height = 2048;
                    var c2d = canvas.getContext("2d");
                    c2d.fillStyle = "#FF00FF";
                    c2d.fillRect(0, 0, canvas.width, canvas.height)
                    var imageData = c2d.createImageData(canvas.width, canvas.height);
                    var data = imageData.data;
                    for (var x = 0; x < canvas.width; x++) {
                        for (var y = 0; y < canvas.height; y++) {
                            var v = Object(_utils_perlin__WEBPACK_IMPORTED_MODULE_0__["noise2d"])(5 * x / canvas.width, 5 * y / canvas.height);
                            var i = (y * canvas.width + x) * 4;
                            data[i + 0] = -25 * v + 41;//((1 + v) / 2 * 255)/2 + 128;
                            data[i + 1] = 7 * v + 10//0x00;
                            data[i + 2] = -8 * v + 59//0x4f;
                            data[i + 3] = 0xff;// | ((1 + v) / 2 * 255);
                        }
                    }

                    for (let s = 0; s < 10000; s++) {
                        let x = ~~(Math.random() * canvas.width);
                        let y = ~~(Math.random() * canvas.height);
                        var i = (y * canvas.width + x) * 4;
                        const v = ~~(Math.random() * 255);
                        data[i + 0] = v / 2 + 128;
                        data[i + 1] = v;
                        data[i + 2] = v / 2 + 128;
                        data[i + 3] = 0xff;
                    }
                    //66, 10, 77
                    //41, 17, 69
                    //-25*v+41, 7*v+10, -8*v+59
                    c2d.putImageData(imageData, 0, 0);

                    this.el.setAttribute('material', {
                        shader: 'flat',
                        color: 'white',
                        src: canvas,
                    });
                    this.el.setAttribute('rotation', "0 -90 0");
                }
            }));

            /***/
}),

/***/ "./src/classes/components/sun.component.js":
/*!*************************************************!*\
  !*** ./src/classes/components/sun.component.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('sun', {
                init: function () {
                    let canvas = document.createElement("canvas");
                    canvas.width = canvas.height = 1024;
                    let ctx = canvas.getContext("2d");

                    let s = document.createElement("canvas");
                    s.width = s.height = 1024;
                    let sun = s.getContext("2d");


                    let gradient = sun.createLinearGradient(0, 100, 0, canvas.height - 100);
                    gradient.addColorStop(0, '#fbf120ff');

                    gradient.addColorStop(0.355, "#fd8227ff");
                    gradient.addColorStop(0.356, "#fd822700");
                    gradient.addColorStop(0.364, "#fd822700");
                    gradient.addColorStop(0.365, "#fd8227ff");

                    gradient.addColorStop(0.42, "#fe6828ff");
                    gradient.addColorStop(0.421, "#fe682800");
                    gradient.addColorStop(0.434, "#fe682800");
                    gradient.addColorStop(0.435, "#fe6828ff");

                    gradient.addColorStop(0.49, "#fe5430ff");
                    gradient.addColorStop(0.491, "#fe543000");
                    gradient.addColorStop(0.509, "#fe543000");
                    gradient.addColorStop(0.51, "#fe5430ff");

                    gradient.addColorStop(0.562, "#fe4b38ff");
                    gradient.addColorStop(0.563, "#fe4b3800");
                    gradient.addColorStop(0.582, "#fe4b3800");
                    gradient.addColorStop(0.584, "#fe4b38ff");

                    //64 -- fe3446
                    gradient.addColorStop(0.63, "#fe3446ff");
                    gradient.addColorStop(0.631, "#fe344600");
                    gradient.addColorStop(0.657, "#fe344600");
                    gradient.addColorStop(0.658, "#fe3446ff");

                    //73 -- fe2558
                    gradient.addColorStop(0.710, "#fe2558ff");
                    gradient.addColorStop(0.711, "#fe255800");
                    gradient.addColorStop(0.739, "#fe255800");
                    gradient.addColorStop(0.74, "#fe2558ff");

                    //80 -- fe1f5f
                    gradient.addColorStop(0.785, "#fe1f5fff");
                    gradient.addColorStop(0.786, "#fe1f5f00");
                    gradient.addColorStop(0.825, "#fe1f5f00");
                    gradient.addColorStop(0.826, "#fe1f5fff");
                    //87 -- fe1967
                    gradient.addColorStop(0.860, "#fe1967ff");
                    gradient.addColorStop(0.861, "#fe196700");
                    gradient.addColorStop(0.905, "#fe196700");
                    gradient.addColorStop(0.906, "#fe1967ff");
                    //94 -- ff1270
                    gradient.addColorStop(.940, '#ff1270ff');
                    gradient.addColorStop(.941, '#ff127000');
                    sun.fillStyle = gradient;
                    sun.beginPath();
                    sun.arc(canvas.height / 2, canvas.height / 2, 412, 0, 2 * Math.PI);
                    sun.fill();

                    ctx.shadowColor = '#ff0d77ff';
                    ctx.shadowBlur = 100;
                    ctx.drawImage(s, 0, 0);

                    this.el.setAttribute('material', {
                        transparent: true,
                        src: canvas,
                    });
                },
            }));

            /***/
}),

/***/ "./src/classes/components/titlescreen.component.js":
/*!*********************************************************!*\
  !*** ./src/classes/components/titlescreen.component.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('titlescreen', {
                schema: {
                    text: { default: 'BACK TO SPACE' },
                    fontsize: { type: 'number', default: 150 },
                    font: { type: 'string', default: 'Fantasy' },
                },
                init: function () {
                    let canvas = document.createElement("canvas");
                    canvas.width = canvas.height = 1024;

                    let ctx = canvas.getContext("2d");
                    let gradient = ctx.createLinearGradient(0, 8, 0, 120);
                    gradient.addColorStop(0, '#1f1f75');
                    gradient.addColorStop(0.25, '#52a5e7');
                    gradient.addColorStop(0.5, '#e1e0f2');
                    gradient.addColorStop(0.51, '#10100e');
                    gradient.addColorStop(0.75, '#7b257c')
                    gradient.addColorStop(0.95, '#f3abd0');
                    gradient.addColorStop(1, '#e3f3f2');

                    ctx.shadowColor = '#131a9b';
                    ctx.shadowBlur = 15;
                    ctx.textAlign = 'center';
                    ctx.fillStyle = gradient;
                    ctx.font = `${this.data.fontsize}px ${this.data.font}`;;
                    while (ctx.measureText(this.data.text).width > canvas.width && this.data.fontsize > 1) {
                        this.data.fontsize--;
                        ctx.font = `${this.data.fontsize}px ${this.data.font}`;
                    }
                    ctx.fillText(this.data.text, 512, 123);
                    let gradient2 = ctx.createLinearGradient(0, 5, 0, 140);
                    gradient2.addColorStop(0.0, '#e3f3f2');
                    gradient2.addColorStop(0.1, '#131a9b');
                    gradient2.addColorStop(0.2, '#e3f3f2');
                    gradient2.addColorStop(0.3, '#1f1f75');
                    gradient2.addColorStop(0.4, '#01000a');
                    gradient2.addColorStop(0.5, '#1f1f75');
                    gradient2.addColorStop(0.6, '#aa1885');
                    gradient2.addColorStop(0.7, '#1f1f75');
                    gradient2.addColorStop(0.8, '#aa1885');
                    gradient2.addColorStop(0.9, '#e3f3f2');

                    ctx.shadowColor = '#7b257c';
                    ctx.shadowBlur = 1;

                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 5;
                    ctx.strokeText(this.data.text, 512, 123);


                    ctx.strokeStyle = gradient2;
                    ctx.lineWidth = 4;
                    ctx.strokeText(this.data.text, 512, 123);

                    this.el.setAttribute('material', {
                        transparent: true,
                        src: canvas,
                    });
                },
            }));

            /***/
}),

/***/ "./src/classes/components/wireframematerial.component.js":
/*!***************************************************************!*\
  !*** ./src/classes/components/wireframematerial.component.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shaders_shader_vert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shaders/shader.vert */ "./src/shaders/shader.vert");
/* harmony import */ var _shaders_shader_frag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shaders/shader.frag */ "./src/shaders/shader.frag");



/* harmony default export */ __webpack_exports__["default"] = (AFRAME.registerComponent('wireframe-material', {
                schema: {
                    color: {
                        type: 'color',
                        default: "white"
                    },
                    fillcolor: {
                        type: 'color',
                        default: '#000000'
                    },
                    thickness: {
                        type: 'number',
                        default: 0.05
                    }
                },
                init: function () {
                    this.update();
                },
                update: function () {
                    var material = new THREE.ShaderMaterial({
                        extensions: {
                            derivatives: true
                        },
                        uniforms: { // some parameters for the shader
                            time: { value: 0 },
                            fill: { value: new THREE.Color(this.data.fillcolor) },
                            stroke: { value: new THREE.Color(this.data.color) },
                            noiseA: { value: false },
                            noiseB: { value: false },
                            dualStroke: { value: false },
                            seeThrough: { value: false },
                            insideAltColor: { value: true },
                            thickness: { value: this.data.thickness },
                            secondThickness: { value: 0.05 },
                            dashEnabled: { value: false },
                            dashRepeats: { value: 2.0 },
                            dashOverlap: { value: false },
                            dashLength: { value: 0.55 },
                            dashAnimate: { value: false },
                            squeeze: { value: false },
                            squeezeMin: { value: 0.1 },
                            squeezeMax: { value: 1.0 }
                        },
                        vertexShader: _shaders_shader_vert__WEBPACK_IMPORTED_MODULE_0__["default"],
                        fragmentShader: _shaders_shader_frag__WEBPACK_IMPORTED_MODULE_1__["default"],
                    });
                    material.needsUpdate = true;
                    this.el.getObject3D('mesh').material = material;
                },

            }));

            /***/
}),

/***/ "./src/classes/utils/geom.js":
/*!***********************************!*\
  !*** ./src/classes/utils/geom.js ***!
  \***********************************/
/*! exports provided: addBarycentricCoordinates, unindexBufferGeometry */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBarycentricCoordinates", function () { return addBarycentricCoordinates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unindexBufferGeometry", function () { return unindexBufferGeometry; });
            function addBarycentricCoordinates(bufferGeometry, removeEdge = false) {
                const attrib = bufferGeometry.getIndex() || bufferGeometry.getAttribute('position');
                const count = attrib.count / 3;
                const barycentric = [];

                // for each triangle in the geometry, add the barycentric coordinates
                for (let i = 0; i < count; i++) {
                    const even = i % 2 === 0;
                    const Q = removeEdge ? 1 : 0;
                    if (even) {
                        barycentric.push(
                            0, 0, 1,
                            0, 1, 0,
                            1, 0, Q
                        );
                    } else {
                        barycentric.push(
                            0, 1, 0,
                            0, 0, 1,
                            1, 0, Q
                        );
                    }
                }

                // add the attribute to the geometry
                const array = new Float32Array(barycentric);
                const attribute = new THREE.BufferAttribute(array, 3);
                bufferGeometry.addAttribute('barycentric', attribute);
            };

            /**
             * 
             * @param {THREE.BufferGeometry} bufferGeometry 
             */
            function unindexBufferGeometry(bufferGeometry) {
                // un-indices the geometry, copying all attributes like position and uv
                const index = bufferGeometry.getIndex();
                if (!index) return; // already un-indexed

                const indexArray = index.array;
                const triangleCount = indexArray.length / 3;

                const attributes = bufferGeometry.attributes;
                const newAttribData = Object.keys(attributes).map(key => {
                    return {
                        key,
                        array: [],
                        attribute: bufferGeometry.getAttribute(key)
                    };
                });

                for (let i = 0; i < triangleCount; i++) {
                    // indices into attributes
                    const a = indexArray[i * 3 + 0];
                    const b = indexArray[i * 3 + 1];
                    const c = indexArray[i * 3 + 2];
                    const indices = [a, b, c];

                    // for each attribute, put vertex into unindexed list
                    newAttribData.forEach(data => {
                        const attrib = data.attribute;
                        const dim = attrib.itemSize;
                        // add [a, b, c] vertices
                        for (let i = 0; i < indices.length; i++) {
                            const index = indices[i];
                            for (let d = 0; d < dim; d++) {
                                const v = attrib.array[index * dim + d];
                                data.array.push(v);
                            }
                        }
                    });
                }
                index.array = null;
                bufferGeometry.setIndex(null);
                // // now copy over new data
                newAttribData.forEach(data => {
                    const newArray = new data.attribute.array.constructor(data.array);
                    bufferGeometry.setAttribute(data.key, newArray)
                    //     data.attribute.setArray(newArray);
                    //   //  bufferGeometry.setAttribute()
                });
            };

            /***/
}),

/***/ "./src/classes/utils/perlin.js":
/*!*************************************!*\
  !*** ./src/classes/utils/perlin.js ***!
  \*************************************/
/*! exports provided: noise2d */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noise2d", function () { return noise2d; });
            var mask = 0xff;
            var size = mask + 1;
            var values = new Uint8Array(size * 2);
            for (var i = 0; i < size; i++) {
                values[i] = values[size + i] = 0 | (Math.random() * 0xff);
            }

            var lerp = function (t, a, b) {
                return a + t * (b - a);
            };
            var fade = function (t) {
                return t * t * t * (t * (t * 6 - 15) + 10);
            };

            var grad2d = function (hash, x, y) {
                var u = (hash & 2) === 0 ? x : -x;
                var v = (hash & 1) === 0 ? y : -y;
                return u + v;
            };

            const noise2d = function (x, y) {
                var intX = (0 | x) & mask;
                var intY = (0 | y) & mask;
                var fracX = x - (0 | x);
                var fracY = y - (0 | y);
                var r1 = values[intX] + intY;
                var r2 = values[intX + 1] + intY;
                var t1 = fade(fracX);
                var t2 = fade(fracY);

                var a1 = grad2d(values[r1], fracX, fracY);
                var b1 = grad2d(values[r2], fracX - 1, fracY);
                var a2 = grad2d(values[r1 + 1], fracX, fracY - 1);
                var b2 = grad2d(values[r2 + 1], fracX - 1, fracY - 1);
                return lerp(t2, lerp(t1, a1, b1), lerp(t1, a2, b2));
            };


            /***/
}),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_components_game_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/components/game.component */ "./src/classes/components/game.component.js");
/* harmony import */ var _classes_components_space_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/components/space.component */ "./src/classes/components/space.component.js");
/* harmony import */ var _classes_components_ground_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/components/ground.component */ "./src/classes/components/ground.component.js");
/* harmony import */ var _classes_components_titlescreen_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/components/titlescreen.component */ "./src/classes/components/titlescreen.component.js");
/* harmony import */ var _classes_components_neontext_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes/components/neontext.component */ "./src/classes/components/neontext.component.js");
/* harmony import */ var _classes_components_sun_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./classes/components/sun.component */ "./src/classes/components/sun.component.js");
/* harmony import */ var _classes_components_music_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./classes/components/music.component */ "./src/classes/components/music.component.js");
/* harmony import */ var _classes_components_mountains_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./classes/components/mountains.component */ "./src/classes/components/mountains.component.js");
/* harmony import */ var _classes_components_wireframematerial_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./classes/components/wireframematerial.component */ "./src/classes/components/wireframematerial.component.js");
/* harmony import */ var _classes_components_countdown_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./classes/components/countdown.component */ "./src/classes/components/countdown.component.js");
/* harmony import */ var _classes_components_countdown_component__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_classes_components_countdown_component__WEBPACK_IMPORTED_MODULE_9__);












            /***/
}),

/***/ "./src/shaders/shader.frag":
/*!*********************************!*\
  !*** ./src/shaders/shader.frag ***!
  \*********************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define GLSLIFY 1\nvarying vec3 vBarycentric;\nvarying float vEven;\nvarying vec2 vUv;\nvarying vec3 vPosition;\n\nuniform float time;\nuniform float thickness;\nuniform float secondThickness;\n\nuniform float dashRepeats;\nuniform float dashLength;\nuniform bool dashOverlap;\nuniform bool dashEnabled;\nuniform bool dashAnimate;\n\nuniform bool seeThrough;\nuniform bool insideAltColor;\nuniform bool dualStroke;\nuniform bool noiseA;\nuniform bool noiseB;\n\nuniform bool squeeze;\nuniform float squeezeMin;\nuniform float squeezeMax;\n\nuniform vec3 stroke;\nuniform vec3 fill;\n\nfloat aastep (float threshold, float dist) {\n  float afwidth = fwidth(dist) * 0.5;\n  return smoothstep(threshold - afwidth, threshold + afwidth, dist);\n}\n\nfloat computeScreenSpaceWireframe (vec3 barycentric, float lineWidth) {\n  vec3 dist = fwidth(barycentric);\n  vec3 smoothed = smoothstep(dist * ((lineWidth * 0.5) - 0.5), dist * ((lineWidth * 0.5) + 0.5), barycentric);\n  return 1.0 - min(min(smoothed.x, smoothed.y), smoothed.z);\n}\nvec4 getStyledWireframe (vec3 barycentric) {\n  float d = min(min(barycentric.x, barycentric.y), barycentric.z);\n  float positionAlong = max(barycentric.x, barycentric.y);\n  if (barycentric.y < barycentric.x && barycentric.y < barycentric.z) {\n    positionAlong = 1.0 - positionAlong;\n  }\n  float computedThickness = thickness;\n  float edge = 1.0 - aastep(computedThickness, d);\n  vec4 outColor = vec4(0.0);\n  if (seeThrough) {\n    outColor = vec4(stroke, edge);\n    if (insideAltColor && !gl_FrontFacing) {\n      outColor.rgb = fill;\n    }\n  } else {\n    vec3 mainStroke = mix(fill, stroke, edge);\n    outColor.a = 1.0;\n    if (dualStroke) {\n      float inner = 1.0 - aastep(secondThickness, d);\n      vec3 wireColor = mix(fill, stroke, abs(inner - edge));\n      outColor.rgb = wireColor;\n    } else {\n      outColor.rgb = mainStroke;\n    }\n  }\n\n  return outColor;\n}\n\nvoid main () {\n  gl_FragColor = getStyledWireframe(vBarycentric);\n}\n");

            /***/
}),

/***/ "./src/shaders/shader.vert":
/*!*********************************!*\
  !*** ./src/shaders/shader.vert ***!
  \*********************************/
/*! exports provided: default */
/***/ (function (module, __webpack_exports__, __webpack_require__) {

            "use strict";
            __webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define GLSLIFY 1\nattribute vec3 barycentric;\nattribute float even;\n\nvarying vec3 vBarycentric;\n\nvarying vec3 vPosition;\nvarying float vEven;\nvarying vec2 vUv;\n\nvoid main () {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);\n  vBarycentric = barycentric;\n  vPosition = position.xyz;\n  vEven = even;\n  vUv = uv;\n}");

            /***/
})

    /******/
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvY29tcG9uZW50cy9jb3VudGRvd24uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2NvbXBvbmVudHMvZ2FtZS5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvY29tcG9uZW50cy9ncm91bmQuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2NvbXBvbmVudHMvbW91bnRhaW5zLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9jb21wb25lbnRzL211c2ljLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9jb21wb25lbnRzL25lb250ZXh0LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9jb21wb25lbnRzL3NwYWNlLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9jb21wb25lbnRzL3N1bi5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvY29tcG9uZW50cy90aXRsZXNjcmVlbi5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvY29tcG9uZW50cy93aXJlZnJhbWVtYXRlcmlhbC5jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvdXRpbHMvZ2VvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy91dGlscy9wZXJsaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL3NoYWRlci5mcmFnIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXJzL3NoYWRlci52ZXJ0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtR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QUFDSTtBQUNRO0FBQ1I7Ozs7Ozs7Ozs7Ozs7QUNUbEQ7QUFBZSw2R0FBOEMsc0JBQXNCLG1CQUFtQix5QkFBeUIsdUJBQXVCLDBCQUEwQixnQ0FBZ0MsOEJBQThCLDJCQUEyQiwyQkFBMkIsMkJBQTJCLDJCQUEyQiw0QkFBNEIsOEJBQThCLDBCQUEwQixzQkFBc0Isc0JBQXNCLHlCQUF5QiwyQkFBMkIsMkJBQTJCLHdCQUF3QixvQkFBb0IsZ0RBQWdELHVDQUF1QyxzRUFBc0UsR0FBRywyRUFBMkUsb0NBQW9DLGdIQUFnSCw4REFBOEQsR0FBRyw4Q0FBOEMsb0VBQW9FLDREQUE0RCx5RUFBeUUsMENBQTBDLEtBQUssd0NBQXdDLG9EQUFvRCw4QkFBOEIscUJBQXFCLG9DQUFvQyw4Q0FBOEMsNEJBQTRCLE9BQU8sS0FBSyxPQUFPLGdEQUFnRCx1QkFBdUIsdUJBQXVCLHVEQUF1RCw4REFBOEQsaUNBQWlDLE9BQU8sT0FBTyxrQ0FBa0MsT0FBTyxLQUFLLHNCQUFzQixHQUFHLGtCQUFrQixvREFBb0QsR0FBRyxHOzs7Ozs7Ozs7Ozs7QUNBNzlEO0FBQWUsOEdBQStDLHVCQUF1Qiw4QkFBOEIsMkJBQTJCLHNCQUFzQixtQkFBbUIsa0JBQWtCLCtFQUErRSwrQkFBK0IsNkJBQTZCLGlCQUFpQixhQUFhLEdBQUcsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2NvdW50ZG93bicsIHtcclxuICAgIHNjaGVtYToge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5uZW9uID0gdGhpcy5lbC5jb21wb25lbnRzWyduZW90ZXh0J107XHJcbiAgICAgICAgdGhpcy50aW1lID0gMTAqNjA7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob2xkRGF0YSkge1xyXG5cclxuICAgIH0sXHJcbiAgICB0aWNrOiBmdW5jdGlvbiAodGltZSwgdGltZURlbHRhKSB7XHJcbiAgICAgICAgdGhpcy50aW1lIC09ICh0aW1lRGVsdGEgLyAxMDAwKTtcclxuICAgICAgICBpZiAodGhpcy50aW1lIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnbmVvbnRleHQnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBgQWxtb3N0IFJlYWR5IWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG1pbiA9IH5+KHRoaXMudGltZSAvIDYwKTtcclxuICAgICAgICAgICAgbGV0IHNlYyA9IH5+KHRoaXMudGltZSAlIDYwKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ25lb250ZXh0Jywge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogYCR7KFwiMDBcIiArIG1pbikuc2xpY2UoLTIpfTokeyhcIjAwXCIgKyBzZWMpLnNsaWNlKC0yKX1gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG5cclxuICAgIH0sXHJcbiAgICB0b2NrOiBmdW5jdGlvbiAodGltZSwgdGltZURlbHRhLCBjYW1lcmEpIHsgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKCkgeyB9LFxyXG4gICAgcGF1c2U6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHBsYXk6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHVwZGF0ZVNjaGVtYTogZnVuY3Rpb24gKGRhdGEpIHsgfVxyXG59KTsiLCJleHBvcnQgZGVmYXVsdCBBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2dhbWUnLCB7XHJcbiAgICBzY2hlbWE6IHtcclxuICAgICAgICBjdXJyZW50d2F2ZTogeyBkZWZhdWx0OiAwIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgIFxyXG4gICAgfVxyXG5cclxufSk7IiwiaW1wb3J0IHsgYWRkQmFyeWNlbnRyaWNDb29yZGluYXRlcyxcclxuICAgIHVuaW5kZXhCdWZmZXJHZW9tZXRyeX0gZnJvbSAnLi4vdXRpbHMvZ2VvbSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBRlJBTUUucmVnaXN0ZXJDb21wb25lbnQoJ2dyb3VuZCcsIHtcclxuICAgIHNjaGVtYToge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7IFxyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MDAgfVxyXG5cclxuICAgICAgICAvL3ZhciBidWZmZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCA1MDAsNTAwLCA1MDAsIDUwMCApO1xyXG4gICAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuXHJcbiAgICAgICAgbGV0IHVzZWRWZXJ0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbXTtcclxuICAgICAgICBsZXQgZmFjZXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaSA9ICh5ICogY2FudmFzLndpZHRoICsgeCkgKiA0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKCh4IC0gY2FudmFzLndpZHRoIC8gMiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICh5IC0gY2FudmFzLmhlaWdodCAvIDIpKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzLndpZHRoIC0gMTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodCAtIDE7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGQgPSB4O1xyXG4gICAgICAgICAgICAgICAgbGV0IHYxID0gKHkgKiBjYW52YXMud2lkdGggKyBkKTtcclxuICAgICAgICAgICAgICAgIGxldCB2MiA9ICh5ICogY2FudmFzLndpZHRoICsgZCArIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHYzID0gKCh5ICsgMSkgKiBjYW52YXMud2lkdGggKyBkKTtcclxuICAgICAgICAgICAgICAgIGxldCB2NCA9ICgoeSArIDEpICogY2FudmFzLndpZHRoICsgZCArIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2VvbWV0cnkudmVydGljZXNbdjFdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW9tZXRyeS52ZXJ0aWNlc1t2Ml0gJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlb21ldHJ5LnZlcnRpY2VzW3YzXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkudmVydGljZXNbdjRdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkuZmFjZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRIUkVFLkZhY2UzKHYxLCB2MiwgdjMpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VvbWV0cnkuZmFjZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRIUkVFLkZhY2UzKHYyLCB2NCwgdjMpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJ1ZmZlckdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCkuXHJcbiAgICAgICAgICAgIGZyb21HZW9tZXRyeSh0aGlzLmdlb21ldHJ5KTtcclxuXHJcbiAgICAgICAgdW5pbmRleEJ1ZmZlckdlb21ldHJ5KGJ1ZmZlckdlb21ldHJ5KTtcclxuICAgICAgICBhZGRCYXJ5Y2VudHJpY0Nvb3JkaW5hdGVzKGJ1ZmZlckdlb21ldHJ5LCB0cnVlKTtcclxuXHJcbiAgICAgICAgdmFyIHBsYW5lID0gbmV3IFRIUkVFLk1lc2goYnVmZmVyR2VvbWV0cnkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZWwuc2V0T2JqZWN0M0QoJ21lc2gnLCBwbGFuZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0pOyIsImltcG9ydCB7IG5vaXNlMmQgfSBmcm9tICcuLi91dGlscy9wZXJsaW4nO1xyXG5pbXBvcnQge1xyXG4gICAgYWRkQmFyeWNlbnRyaWNDb29yZGluYXRlcyxcclxuICAgIHVuaW5kZXhCdWZmZXJHZW9tZXRyeVxyXG59IGZyb20gJy4uL3V0aWxzL2dlb20nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdtb3VudGFpbnMnLCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy9sZXQgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuXHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IDEwMDtcclxuXHJcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KDUwLCA1MCwgMjAsIDUwLCA1MCwgODApO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnI2ZmZmZmZjAwJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKC4yLCAnI2ZmZmZmZmZmJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKC40LCAnI2ZmZmZmZjAwJyk7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LmFyYyhjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDQxMiwgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IG5vaXNlMmQoMjAgKiB4IC8gY2FudmFzLndpZHRoLCAyMCAqIHkgLyBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGxldCBpID0gKHkgKiBjYW52YXMud2lkdGggKyB4KSAqIDQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAwXSA9IE1hdGgubWluKHYgKiBkYXRhW2kgKyAwXSArIGRhdGFbaSArIDBdIC8gOCwgMjU1KTtcclxuICAgICAgICAgICAgICAgIGRhdGFbaSArIDFdID0gMDsvL01hdGgubWluKHYgKiBkYXRhW2kgKyAxXSsgZGF0YVtpICsgMV0vOCwyNTUpO1xyXG4gICAgICAgICAgICAgICAgZGF0YVtpICsgMl0gPSAwOy8vTWF0aC5taW4odiAqIGRhdGFbaSArIDJdKyBkYXRhW2kgKyAyXS84LDI1NSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAzXSA9IDB4ZmY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xyXG5cclxuICAgICAgICBsZXQgaGVpZ2h0bWFwID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpLmRhdGE7XHJcblxyXG4gICAgICAgIGxldCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaSA9ICh5ICogY2FudmFzLndpZHRoICsgeCkgKiA0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlaWdodG1hcFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnkudmVydGljZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKHggLSBjYW52YXMud2lkdGggLyAyKSAqIDEwLCBoZWlnaHRtYXBbaV0gLyA1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHkgLSBjYW52YXMuaGVpZ2h0IC8gMikgKiAxMClcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXNlZFZlcnRzID0gW11cclxuICAgIFxyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzLndpZHRoIC0gMTsgeCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodCAtIDE7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHYxID0gKHkgKiBjYW52YXMud2lkdGggKyB4KTtcclxuICAgICAgICAgICAgICAgIGxldCB2MiA9ICh5ICogY2FudmFzLndpZHRoICsgeCArIDEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHYzID0gKCh5ICsgMSkgKiBjYW52YXMud2lkdGggKyB4KTtcclxuICAgICAgICAgICAgICAgIGxldCB2NCA9ICgoeSArIDEpICogY2FudmFzLndpZHRoICsgeCArIDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdlb21ldHJ5LnZlcnRpY2VzW3YxXSAmJiBnZW9tZXRyeS52ZXJ0aWNlc1t2Ml0gJiYgZ2VvbWV0cnkudmVydGljZXNbdjNdICYmIGdlb21ldHJ5LnZlcnRpY2VzW3Y0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05vdFplcm8oZ2VvbWV0cnkudmVydGljZXNbdjFdLCBnZW9tZXRyeS52ZXJ0aWNlc1t2Ml0sIGdlb21ldHJ5LnZlcnRpY2VzW3YzXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnkuZmFjZXMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBUSFJFRS5GYWNlMyh2MSwgdjIsIHYzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkVmVydHNbdjFdID0gdXNlZFZlcnRzW3YyXSA9IHVzZWRWZXJ0c1t2M10gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNOb3RaZXJvKGdlb21ldHJ5LnZlcnRpY2VzW3YyXSwgZ2VvbWV0cnkudmVydGljZXNbdjRdLCBnZW9tZXRyeS52ZXJ0aWNlc1t2M10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5LmZhY2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVEhSRUUuRmFjZTModjIsIHY0LCB2MylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZFZlcnRzW3YyXSA9IHVzZWRWZXJ0c1t2NF0gPSB1c2VkVmVydHNbdjNdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMjAsIDIwLCAxLCAxKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xyXG5cclxuICAgICAgICAvLyBsZXQgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHtcclxuICAgICAgICAvLyAgICAgbWFwOiB0ZXh0dXJlLCBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlfSApO1xyXG5cclxuICAgICAgICBsZXQgbW91bnRhaW5zR2VvbWV0eSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpLmZyb21HZW9tZXRyeShnZW9tZXRyeSk7Ly9uZXcgVEhSRUUuUG9pbnRzKGdlb21ldHJ5KTtcclxuXHJcbiAgICAgICAgdW5pbmRleEJ1ZmZlckdlb21ldHJ5KG1vdW50YWluc0dlb21ldHkpO1xyXG4gICAgICAgIGFkZEJhcnljZW50cmljQ29vcmRpbmF0ZXMobW91bnRhaW5zR2VvbWV0eSwgZmFsc2UpO1xyXG5cclxuICAgICAgICBsZXQgbW91bnRhaW5zID0gbmV3IFRIUkVFLk1lc2gobW91bnRhaW5zR2VvbWV0eSk7XHJcbiAgICAgICAgdGhpcy5lbC5zZXRPYmplY3QzRCgnbWVzaCcsIG1vdW50YWlucyk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsIHtcclxuICAgICAgICAvLyAgICAgc2hhZGVyOiAnZmxhdCcsXHJcbiAgICAgICAgLy8gICAgIHNyYzogY2FudmFzLFxyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaXNOb3RaZXJvKHYxLCB2MiwgdjMpIHtcclxuICAgIHJldHVybiAhKHYxLnkgPT09IDAgJiYgdjIueSA9PT0gMCAmJiB2My55ID09PSAwKTtcclxufSIsImltcG9ydCB7IG5vaXNlMmQgfSBmcm9tICcuLi91dGlscy9wZXJsaW4nO1xyXG5pbXBvcnQge1xyXG4gICAgYWRkQmFyeWNlbnRyaWNDb29yZGluYXRlcyxcclxuICAgIHVuaW5kZXhCdWZmZXJHZW9tZXRyeVxyXG59IGZyb20gJy4uL3V0aWxzL2dlb20nO1xyXG5cclxuY29uc3QgV0lEVEggPSAxMDgwO1xyXG5jb25zdCBIRUlHSFQgPSAxMjg7XHJcbmNvbnN0IEJBUldJRFRIID0gNDA7XHJcblxyXG5jb25zdCBTTU9PVEhJTkcgPSAwLjg7XHJcbmNvbnN0IEZGVF9TSVpFID0gMjA0ODtcclxuY29uc3QgY2FudmFzID0geyB3aWR0aDogNTAsIGhlaWdodDogNTAgfVxyXG5cclxuQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdtdXNpYycsIHtcclxuICAgIHNjaGVtYToge30sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlcnMgPSBbXTsgLy9vcmRlciBvZiBldmVudGluZyBhZnRlciByZW5kZXJcclxuICAgICAgICBsZXQgYXVkaW9DdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2VyID0gYXVkaW9DdHguY3JlYXRlQW5hbHlzZXIoKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2VyLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzZXIubWluRGVjaWJlbHMgPSAtODA7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5tYXhEZWNpYmVscyA9IDA7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gRkZUX1NJWkU7XHJcbiAgICAgICAgdGhpcy5mcmVxcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG4gICAgICAgIHRoaXMudGltZXMgPSBuZXcgVWludDhBcnJheSh0aGlzLmFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KTtcclxuICAgICAgICBjb25zdCBhdWRpb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG4gICAgICAgIGF1ZGlvRWxlbWVudC5jb250cm9scyA9IGZhbHNlO1xyXG4gICAgICAgIGF1ZGlvRWxlbWVudC52b2x1bWUgPSAxO1xyXG4gICAgICAgIGF1ZGlvRWxlbWVudC5sb29wID0gdHJ1ZTtcclxuICAgICAgICAvLyBteUF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAvLyB9LCBmYWxzZSk7XHJcbiAgICAgICAgYXVkaW9FbGVtZW50LmRhdGFzZXQuaWQgPSAxO1xyXG4gICAgICAgIGF1ZGlvRWxlbWVudC5zcmMgPSAnRVZBX1N0cnQubXAzJztcclxuICAgICAgICBhdWRpb0VsZW1lbnQucHJlbG9hZCA9IFwiYXV0b1wiO1xyXG4gICAgICAgIGF1ZGlvRWxlbWVudC5wbGF5KCk7XHJcbiAgICAgICAgbGV0IHRyYWNrID0gYXVkaW9DdHguY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGF1ZGlvRWxlbWVudCk7XHJcbiAgICAgICAgdHJhY2suY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAob2xkRGF0YSkge1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMuY2FudmFzLmhlaWdodCA9IDEwMjQ7XHJcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgLy8gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAyNDsgaSsrKSB7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXMudGV4dHVyZSA9IG5ldyBUSFJFRS5UZXh0dXJlKHRoaXMuY2FudmFzKTsgLy9yZW5kZXJzIHN0cmFpZ2h0IGZyb20gYSBjYW52YXNcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZWwub2JqZWN0M0QuY2hpbGRyZW4ubGVuZ3RoID4gMCkgeyAvL2JhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgICAgIHRoaXMuZWwub2JqZWN0M0QuY2hpbGRyZW5bMF0ubWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5vYmplY3QzRC5jaGlsZHJlblswXS5tYXRlcmlhbC50cmFuc3BhcmVudD0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbC5vYmplY3QzRC5jaGlsZHJlblswXS5tYXRlcmlhbC5tYXAgPSB0aGlzLnRleHR1cmU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgLy9iYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgICAgICB0aGlzLmVsLm9iamVjdDNELm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwub2JqZWN0M0QubWF0ZXJpYWwubWFwID0gdGhpcy50ZXh0dXJlO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm9iamVjdDNELm1hdGVyaWFsLnRyYW5zcGFyZW50PSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfSxcclxuICAgIHRpY2s6IGZ1bmN0aW9uICh0aW1lLCB0aW1lRGVsdGEpIHtcclxuXHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSBTTU9PVEhJTkc7XHJcbiAgICAgICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gRkZUX1NJWkU7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgZnJlcXVlbmN5IGRhdGEgZnJvbSB0aGUgY3VycmVudGx5IHBsYXlpbmcgbXVzaWNcclxuICAgICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZnJlcXMpO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKHRoaXMudGltZXMpO1xyXG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdoc2xhKDAsIDAlLCAxMDAlLCAwKSc7XHJcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIDEwMjQsIDEwMjQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIiNlMjFiOTBcIjtcclxuICAgICAgICAgICAgdGhpcy5jdHguc2hhZG93Q29sb3IgPSBcIiNmZjBkNzdmZlwiO1xyXG4gICAgICAgICAgICB0aGlzLmN0eC5zaGFkb3dCbHVyID0gMTU7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDMyK2kqMTYsIDUxMiAtIHRoaXMuZnJlcXNbaSoxNl0qNCwgOCwgdGhpcy5mcmVxc1tpKjE2XSo4KTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoMTAyNC0zMi1pKjE2LCA1MTIgLSB0aGlzLmZyZXFzW2kqMTZdKjQsIDgsIHRoaXMuZnJlcXNbaSoxNl0qOCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfSwgcmVnaXN0ZXI6IGZ1bmN0aW9uIChyZW5kZXIpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVycy5wdXNoKHJlbmRlcik7XHJcbiAgICB9LFxyXG4gICAgdG9jazogZnVuY3Rpb24gKHRpbWUsIHRpbWVEZWx0YSwgY2FtZXJhKSB7IH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHsgfSxcclxuICAgIHBhdXNlOiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICBwbGF5OiBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICB1cGRhdGVTY2hlbWE6IGZ1bmN0aW9uIChkYXRhKSB7IH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWdpc3RlcnMubGVuZ3RoID4gMCkgeyAvL2JhY2t3YXJkcyBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5kYXRhLmJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgfSxcclxufSk7IiwiZXhwb3J0IGRlZmF1bHQgQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCduZW9udGV4dCcsIHtcclxuICAgIHNjaGVtYToge1xyXG4gICAgICAgIHRleHQ6IHsgZGVmYXVsdDogJ05lb24gdGV4dCcgfSxcclxuICAgICAgICBmb250c2l6ZTogeyBkZWZhdWx0OiAxNTAgfSxcclxuICAgICAgICBmb250OiB7IGRlZmF1bHQ6ICdTZXJpZicgfSxcclxuICAgICAgICBjb2xvcjoge2RlZmF1bHQ6ICcjZTIxYjkwJyB9XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IDEwMjQ7XHJcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICAgIGN0eC5mb250ID0gYCR7dGhpcy5kYXRhLmZvbnRzaXplfXB4ICR7dGhpcy5kYXRhLmZvbnR9YCA7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG5cclxuICAgICAgICB3aGlsZShjdHgubWVhc3VyZVRleHQodGhpcy5kYXRhLnRleHQpLndpZHRoID4gY2FudmFzLndpZHRoICYmIHRoaXMuZGF0YS5mb250c2l6ZT4xKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZvbnRzaXplLS07XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gYCR7dGhpcy5kYXRhLmZvbnRzaXplfXB4ICR7dGhpcy5kYXRhLmZvbnR9YCA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguZmlsbFRleHQodGhpcy5kYXRhLnRleHQsIDUxMiwgMTIzKTtcclxuXHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5kYXRhLmNvbG9yO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAodGhpcy5kYXRhLmZvbnRzaXplLzc1KTtcclxuICAgICAgICBjdHguc3Ryb2tlVGV4dCh0aGlzLmRhdGEudGV4dCwgNTEyLCAxMjMpO1xyXG5cclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuZGF0YS5jb2xvcjtcclxuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSB0aGlzLmRhdGEuY29sb3I7XHJcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxNTtcclxuICAgICAgICBjdHguZmlsbFRleHQodGhpcy5kYXRhLnRleHQsIDUxMisodGhpcy5kYXRhLmZvbnRzaXplLzUwKSwgMTIzKyh0aGlzLmRhdGEuZm9udHNpemUvNTApKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoJ21hdGVyaWFsJywge1xyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgc3JjOiBjYW52YXMsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG59KTsiLCJpbXBvcnQgeyBub2lzZTJkIH0gZnJvbSAnLi4vdXRpbHMvcGVybGluJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFGUkFNRS5yZWdpc3RlckNvbXBvbmVudCgnc3BhY2UnLCB7XHJcbiAgICBzY2hlbWE6IHt9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IDIwNDg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IDIwNDg7XHJcbiAgICAgICAgdmFyIGMyZCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgYzJkLmZpbGxTdHlsZSA9IFwiI0ZGMDBGRlwiO1xyXG4gICAgICAgIGMyZC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpXHJcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGMyZC5jcmVhdGVJbWFnZURhdGEoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB2YXIgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xyXG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgY2FudmFzLndpZHRoOyB4KyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB2ID0gbm9pc2UyZCg1ICogeCAvIGNhbnZhcy53aWR0aCwgNSAqIHkgLyBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gKHkgKiBjYW52YXMud2lkdGggKyB4KSAqIDQ7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAwXSA9IC0yNSAqIHYgKyA0MTsvLygoMSArIHYpIC8gMiAqIDI1NSkvMiArIDEyODtcclxuICAgICAgICAgICAgICAgIGRhdGFbaSArIDFdID0gNyAqIHYgKyAxMC8vMHgwMDtcclxuICAgICAgICAgICAgICAgIGRhdGFbaSArIDJdID0gLTggKiB2ICsgNTkvLzB4NGY7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2kgKyAzXSA9IDB4ZmY7Ly8gfCAoKDEgKyB2KSAvIDIgKiAyNTUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IDEwMDAwOyBzKyspIHtcclxuICAgICAgICAgICAgbGV0IHggPSB+fihNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoKTtcclxuICAgICAgICAgICAgbGV0IHkgPSB+fihNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIHZhciBpID0gKHkgKiBjYW52YXMud2lkdGggKyB4KSAqIDQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSB+fihNYXRoLnJhbmRvbSgpICogMjU1KTtcclxuICAgICAgICAgICAgZGF0YVtpICsgMF0gPSB2LzIrMTI4O1xyXG4gICAgICAgICAgICBkYXRhW2kgKyAxXSA9IHY7XHJcbiAgICAgICAgICAgIGRhdGFbaSArIDJdID0gdi8yKzEyODtcclxuICAgICAgICAgICAgZGF0YVtpICsgM10gPSAweGZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzY2LCAxMCwgNzdcclxuICAgICAgICAvLzQxLCAxNywgNjlcclxuICAgICAgICAvLy0yNSp2KzQxLCA3KnYrMTAsIC04KnYrNTlcclxuICAgICAgICBjMmQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsIHtcclxuICAgICAgICAgICAgc2hhZGVyOiAnZmxhdCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxyXG4gICAgICAgICAgICBzcmM6IGNhbnZhcyxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgncm90YXRpb24nLFwiMCAtOTAgMFwiKTtcclxuICAgIH1cclxufSk7IiwiZXhwb3J0IGRlZmF1bHQgQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCdzdW4nLCB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IDEwMjQ7XHJcbiAgICAgICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG4gICAgICAgIGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBzLndpZHRoID0gcy5oZWlnaHQgPSAxMDI0O1xyXG4gICAgICAgIGxldCBzdW4gPSBzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBncmFkaWVudCA9IHN1bi5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAxMDAsIDAsIGNhbnZhcy5oZWlnaHQtMTAwKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgJyNmYmYxMjBmZicpO1xyXG5cclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4zNTUsIFwiI2ZkODIyN2ZmXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjM1NiwgXCIjZmQ4MjI3MDBcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMzY0LCBcIiNmZDgyMjcwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4zNjUsIFwiI2ZkODIyN2ZmXCIpO1xyXG5cclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40MiwgXCIjZmU2ODI4ZmZcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNDIxLCBcIiNmZTY4MjgwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40MzQsIFwiI2ZlNjgyODAwXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQzNSwgXCIjZmU2ODI4ZmZcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNDksXCIjZmU1NDMwZmZcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNDkxLFwiI2ZlNTQzMDAwXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUwOSxcIiNmZTU0MzAwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41MSxcIiNmZTU0MzBmZlwiKTtcclxuXHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTYyLFwiI2ZlNGIzOGZmXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjU2MyxcIiNmZTRiMzgwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41ODIsXCIjZmU0YjM4MDBcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTg0LFwiI2ZlNGIzOGZmXCIpO1xyXG5cclxuICAgICAgICAvLzY0IC0tIGZlMzQ0NlxyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjYzLFwiI2ZlMzQ0NmZmXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjYzMSxcIiNmZTM0NDYwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC42NTcsXCIjZmUzNDQ2MDBcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNjU4LFwiI2ZlMzQ0NmZmXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vNzMgLS0gZmUyNTU4XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNzEwLFwiI2ZlMjU1OGZmXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjcxMSxcIiNmZTI1NTgwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC43MzksXCIjZmUyNTU4MDBcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNzQsXCIjZmUyNTU4ZmZcIik7XHJcblxyXG4gICAgICAgIC8vODAgLS0gZmUxZjVmXHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNzg1LFwiI2ZlMWY1ZmZmXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjc4NixcIiNmZTFmNWYwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC44MjUsXCIjZmUxZjVmMDBcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuODI2LFwiI2ZlMWY1ZmZmXCIpO1xyXG4gICAgICAgIC8vODcgLS0gZmUxOTY3XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuODYwLFwiI2ZlMTk2N2ZmXCIpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjg2MSxcIiNmZTE5NjcwMFwiKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC45MDUsXCIjZmUxOTY3MDBcIik7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuOTA2LFwiI2ZlMTk2N2ZmXCIpO1xyXG4gICAgICAgIC8vOTQgLS0gZmYxMjcwXHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKC45NDAsICcjZmYxMjcwZmYnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoLjk0MSwgJyNmZjEyNzAwMCcpO1xyXG4gICAgICAgIHN1bi5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICBzdW4uYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgc3VuLmFyYyhjYW52YXMuaGVpZ2h0LzIsIGNhbnZhcy5oZWlnaHQvMiwgNDEyLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgc3VuLmZpbGwoKTtcclxuICAgICAgICBcclxuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSAnI2ZmMGQ3N2ZmJztcclxuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwMDtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHMsIDAsMCk7XHJcblxyXG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsIHtcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNyYzogY2FudmFzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufSk7IiwiZXhwb3J0IGRlZmF1bHQgQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCd0aXRsZXNjcmVlbicsIHtcclxuICAgIHNjaGVtYToge1xyXG4gICAgICAgIHRleHQ6IHsgZGVmYXVsdDogJ0JBQ0sgVE8gU1BBQ0UnIH0sXHJcbiAgICAgICAgZm9udHNpemU6IHsgdHlwZTogJ251bWJlcicsZGVmYXVsdDogMTUwIH0sXHJcbiAgICAgICAgZm9udDogeyB0eXBlOiAnc3RyaW5nJyxkZWZhdWx0OiAnRmFudGFzeScgfSxcclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IDEwMjQ7XHJcblxyXG4gICAgICAgIGxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCA4LCAwLCAxMjApO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAnIzFmMWY3NScpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjI1LCAnIzUyYTVlNycpO1xyXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjUsICcjZTFlMGYyJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNTEsICcjMTAxMDBlJyk7XHJcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNzUsICcjN2IyNTdjJylcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC45NSwgJyNmM2FiZDAnKTtcclxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgJyNlM2YzZjInKTtcclxuXHJcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMxMzFhOWInO1xyXG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTU7XHJcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICBjdHguZm9udCA9IGAke3RoaXMuZGF0YS5mb250c2l6ZX1weCAke3RoaXMuZGF0YS5mb250fWAgOztcclxuICAgICAgICB3aGlsZShjdHgubWVhc3VyZVRleHQodGhpcy5kYXRhLnRleHQpLndpZHRoID4gY2FudmFzLndpZHRoICYmIHRoaXMuZGF0YS5mb250c2l6ZT4xKXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZvbnRzaXplLS07XHJcbiAgICAgICAgICAgIGN0eC5mb250ID0gYCR7dGhpcy5kYXRhLmZvbnRzaXplfXB4ICR7dGhpcy5kYXRhLmZvbnR9YCA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN0eC5maWxsVGV4dCh0aGlzLmRhdGEudGV4dCwgNTEyLCAxMjMpO1xyXG4gICAgICAgIGxldCBncmFkaWVudDIgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgNSwgMCwgMTQwKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuMCwgJyNlM2YzZjInKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuMSwgJyMxMzFhOWInKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuMiwgJyNlM2YzZjInKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuMywgJyMxZjFmNzUnKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuNCwgJyMwMTAwMGEnKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuNSwgJyMxZjFmNzUnKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuNiwgJyNhYTE4ODUnKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuNywgJyMxZjFmNzUnKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuOCwgJyNhYTE4ODUnKTtcclxuICAgICAgICBncmFkaWVudDIuYWRkQ29sb3JTdG9wKDAuOSwgJyNlM2YzZjInKTtcclxuXHJcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyM3YjI1N2MnO1xyXG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTtcclxuXHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3doaXRlJztcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gNTtcclxuICAgICAgICBjdHguc3Ryb2tlVGV4dCh0aGlzLmRhdGEudGV4dCwgNTEyLCAxMjMpO1xyXG5cclxuXHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gZ3JhZGllbnQyO1xyXG4gICAgICAgIGN0eC5saW5lV2lkdGggPSA0O1xyXG4gICAgICAgIGN0eC5zdHJva2VUZXh0KHRoaXMuZGF0YS50ZXh0LCA1MTIsIDEyMyk7XHJcblxyXG4gICAgICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKCdtYXRlcmlhbCcsIHtcclxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNyYzogY2FudmFzLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxufSk7IiwiaW1wb3J0IHZlcnRTaGFkZXIgZnJvbSAnLi4vLi4vc2hhZGVycy9zaGFkZXIudmVydCc7XHJcbmltcG9ydCBmcmFnU2hhZGVyIGZyb20gJy4uLy4uL3NoYWRlcnMvc2hhZGVyLmZyYWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQUZSQU1FLnJlZ2lzdGVyQ29tcG9uZW50KCd3aXJlZnJhbWUtbWF0ZXJpYWwnLCB7XHJcbiAgICBzY2hlbWE6IHtcclxuICAgICAgICBjb2xvcjp7XHJcbiAgICAgICAgICAgIHR5cGU6J2NvbG9yJyxcclxuICAgICAgICAgICAgZGVmYXVsdDpcIndoaXRlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbGxjb2xvcjp7XHJcbiAgICAgICAgICAgIHR5cGU6J2NvbG9yJyxcclxuICAgICAgICAgICAgZGVmYXVsdDonIzAwMDAwMCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoaWNrbmVzczp7XHJcbiAgICAgICAgICAgIHR5cGU6J251bWJlcicsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6MC4wNVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7IFxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uczoge1xyXG4gICAgICAgICAgICAgICAgZGVyaXZhdGl2ZXM6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdW5pZm9ybXM6IHsgLy8gc29tZSBwYXJhbWV0ZXJzIGZvciB0aGUgc2hhZGVyXHJcbiAgICAgICAgICAgICAgICB0aW1lOiB7IHZhbHVlOiAwIH0sXHJcbiAgICAgICAgICAgICAgICBmaWxsOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IodGhpcy5kYXRhLmZpbGxjb2xvcikgfSxcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogeyB2YWx1ZTogbmV3IFRIUkVFLkNvbG9yKHRoaXMuZGF0YS5jb2xvcikgfSxcclxuICAgICAgICAgICAgICAgIG5vaXNlQTogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIG5vaXNlQjogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIGR1YWxTdHJva2U6IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICBzZWVUaHJvdWdoOiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgaW5zaWRlQWx0Q29sb3I6IHsgdmFsdWU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHRoaWNrbmVzczogeyB2YWx1ZTogdGhpcy5kYXRhLnRoaWNrbmVzcyB9LFxyXG4gICAgICAgICAgICAgICAgc2Vjb25kVGhpY2tuZXNzOiB7IHZhbHVlOiAwLjA1IH0sXHJcbiAgICAgICAgICAgICAgICBkYXNoRW5hYmxlZDogeyB2YWx1ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIGRhc2hSZXBlYXRzOiB7IHZhbHVlOiAyLjAgfSxcclxuICAgICAgICAgICAgICAgIGRhc2hPdmVybGFwOiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgZGFzaExlbmd0aDogeyB2YWx1ZTogMC41NSB9LFxyXG4gICAgICAgICAgICAgICAgZGFzaEFuaW1hdGU6IHsgdmFsdWU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICBzcXVlZXplOiB7IHZhbHVlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgc3F1ZWV6ZU1pbjogeyB2YWx1ZTogMC4xIH0sXHJcbiAgICAgICAgICAgICAgICBzcXVlZXplTWF4OiB7IHZhbHVlOiAxLjAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2ZXJ0ZXhTaGFkZXI6IHZlcnRTaGFkZXIsXHJcbiAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyOiBmcmFnU2hhZGVyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVsLmdldE9iamVjdDNEKCdtZXNoJykubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuICAgIH0sXHJcbiAgICBcclxufSk7IiwiZXhwb3J0IGZ1bmN0aW9uIGFkZEJhcnljZW50cmljQ29vcmRpbmF0ZXMgKGJ1ZmZlckdlb21ldHJ5LCByZW1vdmVFZGdlID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGF0dHJpYiA9IGJ1ZmZlckdlb21ldHJ5LmdldEluZGV4KCkgfHwgYnVmZmVyR2VvbWV0cnkuZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpO1xyXG4gICAgY29uc3QgY291bnQgPSBhdHRyaWIuY291bnQgLyAzO1xyXG4gICAgY29uc3QgYmFyeWNlbnRyaWMgPSBbXTtcclxuICBcclxuICAgIC8vIGZvciBlYWNoIHRyaWFuZ2xlIGluIHRoZSBnZW9tZXRyeSwgYWRkIHRoZSBiYXJ5Y2VudHJpYyBjb29yZGluYXRlc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGV2ZW4gPSBpICUgMiA9PT0gMDtcclxuICAgICAgY29uc3QgUSA9IHJlbW92ZUVkZ2UgPyAxIDogMDtcclxuICAgICAgaWYgKGV2ZW4pIHtcclxuICAgICAgICBiYXJ5Y2VudHJpYy5wdXNoKFxyXG4gICAgICAgICAgMCwgMCwgMSxcclxuICAgICAgICAgIDAsIDEsIDAsXHJcbiAgICAgICAgICAxLCAwLCBRXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBiYXJ5Y2VudHJpYy5wdXNoKFxyXG4gICAgICAgICAgMCwgMSwgMCxcclxuICAgICAgICAgIDAsIDAsIDEsXHJcbiAgICAgICAgICAxLCAwLCBRXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLy8gYWRkIHRoZSBhdHRyaWJ1dGUgdG8gdGhlIGdlb21ldHJ5XHJcbiAgICBjb25zdCBhcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoYmFyeWNlbnRyaWMpO1xyXG4gICAgY29uc3QgYXR0cmlidXRlID0gbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShhcnJheSwgMyk7XHJcbiAgICBidWZmZXJHZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ2JhcnljZW50cmljJywgYXR0cmlidXRlKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1RIUkVFLkJ1ZmZlckdlb21ldHJ5fSBidWZmZXJHZW9tZXRyeSBcclxuICAgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVuaW5kZXhCdWZmZXJHZW9tZXRyeSAoYnVmZmVyR2VvbWV0cnkpIHtcclxuICAgIC8vIHVuLWluZGljZXMgdGhlIGdlb21ldHJ5LCBjb3B5aW5nIGFsbCBhdHRyaWJ1dGVzIGxpa2UgcG9zaXRpb24gYW5kIHV2XHJcbiAgICBjb25zdCBpbmRleCA9IGJ1ZmZlckdlb21ldHJ5LmdldEluZGV4KCk7XHJcbiAgICBpZiAoIWluZGV4KSByZXR1cm47IC8vIGFscmVhZHkgdW4taW5kZXhlZFxyXG4gIFxyXG4gICAgY29uc3QgaW5kZXhBcnJheSA9IGluZGV4LmFycmF5O1xyXG4gICAgY29uc3QgdHJpYW5nbGVDb3VudCA9IGluZGV4QXJyYXkubGVuZ3RoIC8gMztcclxuICBcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBidWZmZXJHZW9tZXRyeS5hdHRyaWJ1dGVzO1xyXG4gICAgY29uc3QgbmV3QXR0cmliRGF0YSA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLm1hcChrZXkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGtleSxcclxuICAgICAgICBhcnJheTogW10sXHJcbiAgICAgICAgYXR0cmlidXRlOiBidWZmZXJHZW9tZXRyeS5nZXRBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyaWFuZ2xlQ291bnQ7IGkrKykge1xyXG4gICAgICAvLyBpbmRpY2VzIGludG8gYXR0cmlidXRlc1xyXG4gICAgICBjb25zdCBhID0gaW5kZXhBcnJheVtpICogMyArIDBdO1xyXG4gICAgICBjb25zdCBiID0gaW5kZXhBcnJheVtpICogMyArIDFdO1xyXG4gICAgICBjb25zdCBjID0gaW5kZXhBcnJheVtpICogMyArIDJdO1xyXG4gICAgICBjb25zdCBpbmRpY2VzID0gWyBhLCBiLCBjIF07XHJcbiAgXHJcbiAgICAgIC8vIGZvciBlYWNoIGF0dHJpYnV0ZSwgcHV0IHZlcnRleCBpbnRvIHVuaW5kZXhlZCBsaXN0XHJcbiAgICAgIG5ld0F0dHJpYkRhdGEuZm9yRWFjaChkYXRhID0+IHtcclxuICAgICAgICBjb25zdCBhdHRyaWIgPSBkYXRhLmF0dHJpYnV0ZTtcclxuICAgICAgICBjb25zdCBkaW0gPSBhdHRyaWIuaXRlbVNpemU7XHJcbiAgICAgICAgLy8gYWRkIFthLCBiLCBjXSB2ZXJ0aWNlc1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBpbmRpY2VzW2ldO1xyXG4gICAgICAgICAgZm9yIChsZXQgZCA9IDA7IGQgPCBkaW07IGQrKykge1xyXG4gICAgICAgICAgICBjb25zdCB2ID0gYXR0cmliLmFycmF5W2luZGV4ICogZGltICsgZF07XHJcbiAgICAgICAgICAgIGRhdGEuYXJyYXkucHVzaCh2KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaW5kZXguYXJyYXkgPSBudWxsO1xyXG4gICAgYnVmZmVyR2VvbWV0cnkuc2V0SW5kZXgobnVsbCk7XHJcbiAgICAvLyAvLyBub3cgY29weSBvdmVyIG5ldyBkYXRhXHJcbiAgICAgbmV3QXR0cmliRGF0YS5mb3JFYWNoKGRhdGEgPT4ge1xyXG4gICAgICAgY29uc3QgbmV3QXJyYXkgPSBuZXcgZGF0YS5hdHRyaWJ1dGUuYXJyYXkuY29uc3RydWN0b3IoZGF0YS5hcnJheSk7XHJcbiAgICAgICBidWZmZXJHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoZGF0YS5rZXksIG5ld0FycmF5KVxyXG4gICAgLy8gICAgIGRhdGEuYXR0cmlidXRlLnNldEFycmF5KG5ld0FycmF5KTtcclxuICAgIC8vICAgLy8gIGJ1ZmZlckdlb21ldHJ5LnNldEF0dHJpYnV0ZSgpXHJcbiAgICAgfSk7XHJcbiAgfTsiLCJ2YXIgbWFzayA9IDB4ZmY7XHJcbnZhciBzaXplID0gbWFzayArIDE7XHJcbnZhciB2YWx1ZXMgPSBuZXcgVWludDhBcnJheShzaXplICogMik7XHJcbmZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICB2YWx1ZXNbaV0gPSB2YWx1ZXNbc2l6ZSArIGldID0gMCB8IChNYXRoLnJhbmRvbSgpICogMHhmZik7XHJcbn1cclxuXHJcbnZhciBsZXJwID0gZnVuY3Rpb24gKHQsIGEsIGIpIHtcclxuICAgIHJldHVybiBhICsgdCAqIChiIC0gYSk7XHJcbn07XHJcbnZhciBmYWRlID0gZnVuY3Rpb24gKHQpIHtcclxuICAgIHJldHVybiB0ICogdCAqIHQgKiAodCAqICh0ICogNiAtIDE1KSArIDEwKTtcclxufTtcclxuXHJcbnZhciBncmFkMmQgPSBmdW5jdGlvbiAoaGFzaCwgeCwgeSkge1xyXG4gICAgdmFyIHUgPSAoaGFzaCAmIDIpID09PSAwID8geCA6IC14O1xyXG4gICAgdmFyIHYgPSAoaGFzaCAmIDEpID09PSAwID8geSA6IC15O1xyXG4gICAgcmV0dXJuIHUgKyB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vaXNlMmQgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdmFyIGludFggPSAoMCB8IHgpICYgbWFzaztcclxuICAgIHZhciBpbnRZID0gKDAgfCB5KSAmIG1hc2s7XHJcbiAgICB2YXIgZnJhY1ggPSB4IC0gKDAgfCB4KTtcclxuICAgIHZhciBmcmFjWSA9IHkgLSAoMCB8IHkpO1xyXG4gICAgdmFyIHIxID0gdmFsdWVzW2ludFhdICsgaW50WTtcclxuICAgIHZhciByMiA9IHZhbHVlc1tpbnRYICsgMV0gKyBpbnRZO1xyXG4gICAgdmFyIHQxID0gZmFkZShmcmFjWCk7XHJcbiAgICB2YXIgdDIgPSBmYWRlKGZyYWNZKTtcclxuXHJcbiAgICB2YXIgYTEgPSBncmFkMmQodmFsdWVzW3IxXSwgZnJhY1gsIGZyYWNZKTtcclxuICAgIHZhciBiMSA9IGdyYWQyZCh2YWx1ZXNbcjJdLCBmcmFjWCAtIDEsIGZyYWNZKTtcclxuICAgIHZhciBhMiA9IGdyYWQyZCh2YWx1ZXNbcjEgKyAxXSwgZnJhY1gsIGZyYWNZIC0gMSk7XHJcbiAgICB2YXIgYjIgPSBncmFkMmQodmFsdWVzW3IyICsgMV0sIGZyYWNYIC0gMSwgZnJhY1kgLSAxKTtcclxuICAgIHJldHVybiBsZXJwKHQyLCBsZXJwKHQxLCBhMSwgYjEpLCBsZXJwKHQxLCBhMiwgYjIpKTtcclxufTtcclxuIiwiaW1wb3J0ICcuL2NsYXNzZXMvY29tcG9uZW50cy9nYW1lLmNvbXBvbmVudCc7XHJcbmltcG9ydCAnLi9jbGFzc2VzL2NvbXBvbmVudHMvc3BhY2UuY29tcG9uZW50JztcclxuaW1wb3J0ICcuL2NsYXNzZXMvY29tcG9uZW50cy9ncm91bmQuY29tcG9uZW50JztcclxuaW1wb3J0ICcuL2NsYXNzZXMvY29tcG9uZW50cy90aXRsZXNjcmVlbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgJy4vY2xhc3Nlcy9jb21wb25lbnRzL25lb250ZXh0LmNvbXBvbmVudCc7XHJcbmltcG9ydCAnLi9jbGFzc2VzL2NvbXBvbmVudHMvc3VuLmNvbXBvbmVudCc7XHJcbmltcG9ydCAnLi9jbGFzc2VzL2NvbXBvbmVudHMvbXVzaWMuY29tcG9uZW50JztcclxuaW1wb3J0ICcuL2NsYXNzZXMvY29tcG9uZW50cy9tb3VudGFpbnMuY29tcG9uZW50JztcclxuaW1wb3J0ICcuL2NsYXNzZXMvY29tcG9uZW50cy93aXJlZnJhbWVtYXRlcmlhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgJy4vY2xhc3Nlcy9jb21wb25lbnRzL2NvdW50ZG93bi5jb21wb25lbnQnO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMzIHZCYXJ5Y2VudHJpYztcXG52YXJ5aW5nIGZsb2F0IHZFdmVuO1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxudmFyeWluZyB2ZWMzIHZQb3NpdGlvbjtcXG5cXG51bmlmb3JtIGZsb2F0IHRpbWU7XFxudW5pZm9ybSBmbG9hdCB0aGlja25lc3M7XFxudW5pZm9ybSBmbG9hdCBzZWNvbmRUaGlja25lc3M7XFxuXFxudW5pZm9ybSBmbG9hdCBkYXNoUmVwZWF0cztcXG51bmlmb3JtIGZsb2F0IGRhc2hMZW5ndGg7XFxudW5pZm9ybSBib29sIGRhc2hPdmVybGFwO1xcbnVuaWZvcm0gYm9vbCBkYXNoRW5hYmxlZDtcXG51bmlmb3JtIGJvb2wgZGFzaEFuaW1hdGU7XFxuXFxudW5pZm9ybSBib29sIHNlZVRocm91Z2g7XFxudW5pZm9ybSBib29sIGluc2lkZUFsdENvbG9yO1xcbnVuaWZvcm0gYm9vbCBkdWFsU3Ryb2tlO1xcbnVuaWZvcm0gYm9vbCBub2lzZUE7XFxudW5pZm9ybSBib29sIG5vaXNlQjtcXG5cXG51bmlmb3JtIGJvb2wgc3F1ZWV6ZTtcXG51bmlmb3JtIGZsb2F0IHNxdWVlemVNaW47XFxudW5pZm9ybSBmbG9hdCBzcXVlZXplTWF4O1xcblxcbnVuaWZvcm0gdmVjMyBzdHJva2U7XFxudW5pZm9ybSB2ZWMzIGZpbGw7XFxuXFxuZmxvYXQgYWFzdGVwIChmbG9hdCB0aHJlc2hvbGQsIGZsb2F0IGRpc3QpIHtcXG4gIGZsb2F0IGFmd2lkdGggPSBmd2lkdGgoZGlzdCkgKiAwLjU7XFxuICByZXR1cm4gc21vb3Roc3RlcCh0aHJlc2hvbGQgLSBhZndpZHRoLCB0aHJlc2hvbGQgKyBhZndpZHRoLCBkaXN0KTtcXG59XFxuXFxuZmxvYXQgY29tcHV0ZVNjcmVlblNwYWNlV2lyZWZyYW1lICh2ZWMzIGJhcnljZW50cmljLCBmbG9hdCBsaW5lV2lkdGgpIHtcXG4gIHZlYzMgZGlzdCA9IGZ3aWR0aChiYXJ5Y2VudHJpYyk7XFxuICB2ZWMzIHNtb290aGVkID0gc21vb3Roc3RlcChkaXN0ICogKChsaW5lV2lkdGggKiAwLjUpIC0gMC41KSwgZGlzdCAqICgobGluZVdpZHRoICogMC41KSArIDAuNSksIGJhcnljZW50cmljKTtcXG4gIHJldHVybiAxLjAgLSBtaW4obWluKHNtb290aGVkLngsIHNtb290aGVkLnkpLCBzbW9vdGhlZC56KTtcXG59XFxudmVjNCBnZXRTdHlsZWRXaXJlZnJhbWUgKHZlYzMgYmFyeWNlbnRyaWMpIHtcXG4gIGZsb2F0IGQgPSBtaW4obWluKGJhcnljZW50cmljLngsIGJhcnljZW50cmljLnkpLCBiYXJ5Y2VudHJpYy56KTtcXG4gIGZsb2F0IHBvc2l0aW9uQWxvbmcgPSBtYXgoYmFyeWNlbnRyaWMueCwgYmFyeWNlbnRyaWMueSk7XFxuICBpZiAoYmFyeWNlbnRyaWMueSA8IGJhcnljZW50cmljLnggJiYgYmFyeWNlbnRyaWMueSA8IGJhcnljZW50cmljLnopIHtcXG4gICAgcG9zaXRpb25BbG9uZyA9IDEuMCAtIHBvc2l0aW9uQWxvbmc7XFxuICB9XFxuICBmbG9hdCBjb21wdXRlZFRoaWNrbmVzcyA9IHRoaWNrbmVzcztcXG4gIGZsb2F0IGVkZ2UgPSAxLjAgLSBhYXN0ZXAoY29tcHV0ZWRUaGlja25lc3MsIGQpO1xcbiAgdmVjNCBvdXRDb2xvciA9IHZlYzQoMC4wKTtcXG4gIGlmIChzZWVUaHJvdWdoKSB7XFxuICAgIG91dENvbG9yID0gdmVjNChzdHJva2UsIGVkZ2UpO1xcbiAgICBpZiAoaW5zaWRlQWx0Q29sb3IgJiYgIWdsX0Zyb250RmFjaW5nKSB7XFxuICAgICAgb3V0Q29sb3IucmdiID0gZmlsbDtcXG4gICAgfVxcbiAgfSBlbHNlIHtcXG4gICAgdmVjMyBtYWluU3Ryb2tlID0gbWl4KGZpbGwsIHN0cm9rZSwgZWRnZSk7XFxuICAgIG91dENvbG9yLmEgPSAxLjA7XFxuICAgIGlmIChkdWFsU3Ryb2tlKSB7XFxuICAgICAgZmxvYXQgaW5uZXIgPSAxLjAgLSBhYXN0ZXAoc2Vjb25kVGhpY2tuZXNzLCBkKTtcXG4gICAgICB2ZWMzIHdpcmVDb2xvciA9IG1peChmaWxsLCBzdHJva2UsIGFicyhpbm5lciAtIGVkZ2UpKTtcXG4gICAgICBvdXRDb2xvci5yZ2IgPSB3aXJlQ29sb3I7XFxuICAgIH0gZWxzZSB7XFxuICAgICAgb3V0Q29sb3IucmdiID0gbWFpblN0cm9rZTtcXG4gICAgfVxcbiAgfVxcblxcbiAgcmV0dXJuIG91dENvbG9yO1xcbn1cXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfRnJhZ0NvbG9yID0gZ2V0U3R5bGVkV2lyZWZyYW1lKHZCYXJ5Y2VudHJpYyk7XFxufVxcblwiIiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbmF0dHJpYnV0ZSB2ZWMzIGJhcnljZW50cmljO1xcbmF0dHJpYnV0ZSBmbG9hdCBldmVuO1xcblxcbnZhcnlpbmcgdmVjMyB2QmFyeWNlbnRyaWM7XFxuXFxudmFyeWluZyB2ZWMzIHZQb3NpdGlvbjtcXG52YXJ5aW5nIGZsb2F0IHZFdmVuO1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zaXRpb24ueHl6LCAxLjApO1xcbiAgdkJhcnljZW50cmljID0gYmFyeWNlbnRyaWM7XFxuICB2UG9zaXRpb24gPSBwb3NpdGlvbi54eXo7XFxuICB2RXZlbiA9IGV2ZW47XFxuICB2VXYgPSB1djtcXG59XCIiXSwic291cmNlUm9vdCI6IiJ9