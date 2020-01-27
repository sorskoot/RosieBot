"use strict";

class ImgExplode {

    static get wrapperName() { return "explode-wrapper"; }

    /**
     * Create a new instance of the image exploder
     * @param {NodeListOf<HTMLImageElement> | HTMLImageElement} elementToExplode The element to explode
     */
    constructor(elementToExplode) {
        this.target = elementToExplode;
    }

    explodeRestore() {
        
        function restore(element){
            const wrapper = element.wrapperName;
            if (wrapper) {
                wrapper.replaceWith(element);
                element.wrapperName= null;
            }
        }

        if (!(this.target instanceof HTMLElement)) {
            for (let i = 0; i < this.target.length; i++) {
                restore(this.target[i]);
            }
        }else{
            restore(this.target);
        }
    };


    explode(opt) {
        if (!opt || typeof opt !== "object") {
            opt = {};
        }

        const {
            minWidth = 3,
            omitLastLine = false,
            radius = 80,
            minRadius = 0,
            release = true,
            fadeTime = 300,
            recycle = true,
            recycleDelay = 500,
            fill = true,
            explodeTime = 300,
            maxAngle = 360,
            gravity = 0,
            round = false,
            groundDistance = 400,
            land = true,
            checkOutBound,
            finish,
        } = opt;

        let {
            maxWidth
        } = opt;

        let targetImage;
        const args = arguments;

        let target = this.target;
        // if the target element is not an HTML Element, we assume it's a nodelist
        if (!(this.target instanceof HTMLElement)) {
            //if there's more then 1 element to explode, explode them separately
            if (this.target.length > 1) {
                this.target.forEach(elem => {
                    let expl = new ImgExplode(elem);
                    expl.explode(args);
                });
                return;
                // if there are no nodes to explode, return
            } else if (!this.target.length) {
                return;
            }
            target = this.target[0];
        }

        // if the document does not contain the target element, return
        if (!document.contains(target)) {
            return;
        }

        // 
        if (target.tagName === "IMG") {
            if (!target.complete) {
                target.onload = () => {
                    let expl = new ImgExplode(target);
                    expl.explode(args);
                };
                return;
            }
            targetImage = target;
        } else if (target.style.backgroundImage !== "") {

            const src = target.style.backgroundImage.match(/url\(\"([\S\s]*)\"\)/)[1];
            targetImage = document.createElement("img");
            targetImage.src = src;

            if (!opt.ignoreCompelete) {
                targetImage.onload = () => {
                    opt.ignoreCompelete = true;
                    let expl = new ImgExplode(target);
                    expl.explode(opt);
                };
                return;
            }
        }

        const w = target.width;
        const h = target.height;
        const minorDimension = Math.min(w, h);
        const radiusData = getRadiusData();

        const ctxWidth = Math.max(w, radius * 2);
        const ctxHeight = Math.max(h, radius * 2, groundDistance * 2);
        if (!maxWidth) {
            maxWidth = minorDimension / 4;
        }
        const wrapper = document.createElement('div');
        wrapper.classList.add(ImgExplode.wrapperName);

        const syncStyles = ["width", "height", "margin-top", "margin-right", "margin-bottom", "margin-left", "position", "top", "right", "bottom", "left", "float", "display"];
      
        let targetStyles = window.getComputedStyle(target);
      
        syncStyles.forEach((v) => {
            wrapper.style[v] = targetStyles[v];
        });

        if (wrapper.style.position == "static") {
            wrapper.style.position = "relative";
        }

        const startRatio = 0.3;

        //generate rags' body
        const rags = generateRags();
        getRagsFinalState();

        const canvas = document.createElement("canvas");

        //standard canvas, to draw the ideal target
        const canvas0 = document.createElement("canvas");
        canvas0.style.width = w;
        canvas0.style.height = h;
        canvas0.setAttribute("width", w);
        canvas0.setAttribute("height", h);

        canvas.style.position = "absolute";
        canvas.style.left= ((w - ctxWidth) / 2) +"px";
        canvas.style.right=((w - ctxWidth) / 2) +"px";
        canvas.style.top= ((h - ctxHeight) / 2) +"px";
        canvas.style.bottom= ((h - ctxHeight) / 2) +"px";
        canvas.style.margin= "auto";
        canvas.style.width= ctxWidth;
        canvas.style.height= ctxHeight;

        canvas.setAttribute("width", ctxWidth);
        canvas.setAttribute("height", ctxHeight);
        
        wrapper.append(canvas);

        const ctx = canvas.getContext("2d");
        const ctx0 = canvas0.getContext("2d");

        function warn(key, config) {
            console.warn(`Unsupported ${key} style:${config[key]}`);
        }
        const {
            naturalWidth,
            naturalHeight
        } = targetImage;

        if (target.tagName === "IMG") {
            ctx0.drawImage(targetImage, 0, 0, naturalWidth, naturalHeight, 0, 0, w, h);
        } else if (target.style.backgroundImage !== "") {
            let dx = 0,
                dy = 0,
                dWidth = naturalWidth,
                dHeight = naturalHeight;
            let config = {
                "background-repeat": target.style.backgroundRepeat,
                "background-size": target.style.backgroundSize,
                "background-position-x": target.style.backgroundPositionX,
                "background-position-y": target.style.backgroundPositionY,
            };


            const ratioW = w / naturalWidth;
            const ratioH = h / naturalHeight;


            if (config["background-size"] === "cover") {
                const ratio = Math.max(ratioW, ratioH);

                dWidth = naturalWidth * ratio;
                dHeight = naturalHeight * ratio;
            } else if (config["background-size"] === "contain") {
                const ratio = Math.min(ratioW, ratioH);

                dWidth = naturalWidth * ratio;
                dHeight = naturalHeight * ratio;
            } else {
                warn("background-size", config);

            }
            dx = parseInt(config["background-position-x"]) / 100 * (w - dWidth);
            dy = parseInt(config["background-position-y"]) / 100 * (h - dHeight);

            if (config["background-repeat"] === "repeat") {
                for (var i = 0 - Math.ceil(dx / dWidth); i < w / dWidth + Math.ceil(-dx / dWidth); i++) {
                    for (var j = 0 - Math.ceil(dy / dHeight); j < h / dHeight + Math.ceil(-dy / dHeight); j++) {
                        ctx0.drawImage(targetImage[0], 0, 0, naturalWidth, naturalHeight, dx + i * dWidth, dy + j * dHeight, dWidth, dHeight);
                    }
                }
            } else if (config["background-repeat"] === "no-repeat") {
                ctx0.drawImage(targetImage[0], 0, 0, naturalWidth, naturalHeight, dx, dy, dWidth, dHeight);
            } else {
                warn("background-repeat", config);
            }

        } else if (target.style.backgroundColor !== "rgba(0, 0, 0, 0)") {
            ctx0.fillStyle = target.style.backgroundColor;
            ctx0.fillRect(0, 0, w, h);
        } else {
            console.warn("There's nothing to explode.");
        }

        rags.forEach((rag) => {
            const {
                left,
                top,
                width: ragWidth,
                height: ragHeight,
            } = rag;

            rag.naturalParams = [left, top, ragWidth, ragHeight];
        });

        target.after(wrapper)
        target.wrapperName = wrapper;
        target.remove();

        let biasVy = 0;

        explode(function () {
            if (release) {
                doRelease(()=>{
                    wrapper.remove();
                });
            } else if (recycle) {
                doRecycle();
            } else {
                finish && finish();
            }
        });

        function doRelease(cb) {
            const startTime = Date.now();
            let leftCnt = rags.length;

            rags.forEach((rag) => {
                rag.time1 = 1000 / (rag.ratio * (maxWidth + 1 - rag.width) / maxWidth + 0.1);
                rag.time2 = rag.time1 + fadeTime;
            });
            draw();

            function draw() {
                const time = Date.now();
                const duration = time - startTime;

                ctx.clearRect(0, 0, ctxWidth, ctxHeight);

                rags.forEach((rag) => {
                    ctx.save();
                    const {
                        width: ragWidth,
                        height: ragHeight,
                    } = rag;

                    ctx.translate(rag.biasx, rag.biasy);

                    ctx.rotate(rag.lastAngle || rag.finalAngleRad);

                    if (round) {
                        ctx.beginPath();
                        ctx.arc(0, 0, ragWidth / 2, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.clip();
                    }
                    let alpha;
                    if (duration < rag.time1) {
                        alpha = 1;
                    } else if (duration > rag.time2) {
                        alpha = 0;
                    } else {
                        alpha = 1 - (duration - rag.time1) / fadeTime;
                    }
                    if (alpha === 0 && !rag.released) {
                        rag.released = true;
                        leftCnt--;
                    }
                    ctx.globalAlpha = alpha;
                    ctx.drawImage(canvas0, rag.left, rag.top, rag.width, rag.height, -ragWidth / 2, -ragHeight / 2, ragWidth, ragHeight);
                    ctx.restore();
                });
                if (!leftCnt) {
                    cb && cb();
                } else {
                    window.requestAnimationFrame(draw);
                }
            }
        }

        function doRecycle() {
            setTimeout( () => {
                explode( () => {
                    this.explodeRestore();
                }, true);
            }, recycleDelay);

        }

        function explode(cb, reverse) {
            const startTime = Date.now();
            let lastTime = startTime;
            let leftCnt = rags.length;

            if (!reverse) {
                rags.forEach((rag) => {
                    rag.vx = rag.translateX / explodeTime * 1000;
                    rag.vy = rag.translateY / explodeTime * 1000;

                    rag.biasx = rag.translateX0;
                    rag.biasy = rag.translateY0;
                    if (gravity) {
                        rag.transYMax = ctxHeight / 2 + groundDistance - rag.height / 2;
                    }

                });
            }

            draw();

            function draw() {
                const time = Date.now();
                let ratio;
                let angleRatio;
                ratio = (time - lastTime) / 1000;
                angleRatio = (time - startTime) / explodeTime;
                if (reverse) {
                    angleRatio = 1 - angleRatio;
                }
                if (gravity) {
                    biasVy += (gravity * ratio) * 300;
                } else {
                    if (angleRatio > 1 || angleRatio < 0) {
                        cb && cb();
                        return;
                    }
                    ratio *= Math.cos(angleRatio * Math.PI / 2) * Math.PI / 2;
                }
                if (reverse) {
                    ratio = -ratio;
                }
                lastTime = time;
                ctx.clearRect(0, 0, ctxWidth, ctxHeight);
                rags.forEach((rag) => {
                    ctx.save();
                    const {
                        width: ragWidth,
                        height: ragHeight,
                    } = rag;

                    if (!rag.land) {
                        rag.biasx += rag.vx * ratio;
                        rag.biasy += (rag.vy + biasVy) * ratio;

                        if (gravity) {
                            if (checkOutBound && checkOutBound(rag)
                                || rag.biasy > rag.transYMax
                                || rag.biasy < rag.height / 2) {
                                leftCnt--;
                                rag.land = true;
                                rag.lastAngle = rag.finalAngleRad * angleRatio;

                                if (land) {
                                    rag.biasy = gravity > 0 ? rag.transYMax : rag.height / 2;
                                } else {
                                    rag.biasy = rag.transYMax * 2;//hide
                                }
                            }

                        }
                    }

                    ctx.translate(rag.biasx, rag.biasy);

                    if (rag.lastAngle) {
                        ctx.rotate(rag.lastAngle);
                    } else {
                        ctx.rotate(rag.finalAngleRad * angleRatio);
                    }

                    if (round) {
                        ctx.beginPath();
                        ctx.arc(0, 0, ragWidth / 2, 0, Math.PI * 2, false);
                        ctx.closePath();
                        ctx.clip();
                    }

                    ctx.drawImage(canvas0, rag.left, rag.top, rag.width, rag.height, -ragWidth / 2, -ragHeight / 2, ragWidth, ragHeight);
                    ctx.restore();
                });
                if (gravity && !leftCnt) {
                    cb();
                } else {
                    window.requestAnimationFrame(draw);
                }
            }
        }

        function random(min, max) {
            return parseInt(Math.random() * (max + 1 - min), 10) + min;
        }
        function shuffle(array) {
            let currentIndex = array.length, temporaryValue, randomIndex;
            while (currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        //generate final position and angle of rags
        function getRagsFinalState() {
            rags.forEach((v, i) => {
                const finalAngle = (((Math.random() * maxAngle * 2) - maxAngle) / ((Math.random() + 2) * v.width)) * 10;

                //coordinate based on center point
                let x = v.left + v.width / 2 - w / 2;
                let y = v.top + v.width / 2 - h / 2;

                if (x === 0) {
                    x = i % 2 ? -1 : 1;
                }
                if (y === 0) {
                    y = (i % 4 < 2) ? -1 : 1;
                }

                const distance = Math.sqrt(x * x + y * y);


                let ratio = ((1 - startRatio) * (1 - (v.width - minWidth) / (maxWidth - minWidth)) + startRatio) * Math.random();
                ratio = 1 - (1 - ratio) * (1 - minRadius / radius);

                const finalDistance = (radius - distance) * ratio + distance;
                const distanceSquare = distance * distance;

                const attach = {
                    finalDistance,
                    ratio,
                    x,
                    y,
                    distance,
                    translateX: (finalDistance - distance) * Math.sqrt((distanceSquare - y * y) / (distanceSquare)) * (x > 0 ? 1 : -1),
                    translateY: (finalDistance - distance) * Math.sqrt((distanceSquare - x * x) / (distanceSquare)) * (y > 0 ? 1 : -1),
                    translateX0: (ctxWidth - w) / 2 + v.left + v.width / 2,
                    translateY0: (ctxHeight - h) / 2 + v.top + v.height / 2,
                    finalAngle,
                    finalAngleRad: finalAngle * (Math.PI / 180),
                };

                for (let i in attach) {
                    v[i] = attach[i];
                }

            });
        }
        //generate inital position and dimension of rags
        //rewrite it to fit for you demand
        function generateRags() {
            let rowCnt;
            const base = [[0, 1], [1, 1], [1, 0], [0, 0]];
            if (omitLastLine) {
                rowCnt = Math.floor(h / maxWidth);
            } else {
                rowCnt = Math.ceil(h / maxWidth);
            }

            const rags = [];

            const noRadius = radiusData.every(function (v) {
                return v === 0;
            });

            for (let row = 0; row < rowCnt; row++) {
                generateRow(row);
            }

            function isInner(x, y) {
                if (x < radiusData[0] && y > h - radiusData[0] ||
                    x > w - radiusData[1] && y > h - radiusData[1] ||
                    x > w - radiusData[2] && y < radiusData[2] ||
                    x < radiusData[3] && y < radiusData[3]) {
                    return false;
                }
                return true;
            }

            function distanceLessThan(x1, y1, x2, y2, d) {
                return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < d * d;
            }


            function tryPushRag({
                left,
                top,
                width,
                height
            }) {
                const x = left + width / 2;
                const y = h - top - height / 2;

                if (noRadius || isInner(x, y) || radiusData.some(function (v, i) {
                    return distanceLessThan(x, y, base[i][0] * w + 2 * (0.5 - base[i][0]) * v, base[i][1] * h + 2 * (0.5 - base[i][1]) * v, v);
                })) {
                    rags.push({
                        left,
                        top,
                        width,
                        height
                    });
                }
            }

            function generateRow(row) {
                let rowSum = 0;
                const topBase = row * maxWidth;

                function generate(width) {
                    const left = rowSum;
                    rowSum += width;
                    tryPushRag({
                        left,
                        top: topBase,
                        width,
                        height: width,
                    });
                    if (fill) {
                        for (let i = 1; i < parseInt(maxWidth / width); i++) {
                            tryPushRag({
                                left,
                                top: topBase + i * width,
                                width,
                                height: width,
                            });
                        }
                    }
                }
                let width;
                do {
                    if (width) {
                        generate(width);
                    }
                    width = random(minWidth, maxWidth);
                } while (w > rowSum + width);
                if (w - rowSum >= minWidth) {
                    generate(w - rowSum);
                }
            }
            shuffle(rags);
            return rags;
        }
        //get an array of 4 corners of radius        
        function getRadiusData() {
            let ret = ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius"];
            const width = target.width;
            ret = ret.map(function (key) {
                let radius = target.style[key];
                if (radius.match(/px$/)) {
                    return radius.match(/^\d+/)[0] * 1;
                } else if (radius.match(/%$/)) {
                    return radius.match(/^\d+/)[0] / 100 * width;
                }
                return radius;
            });
            ret = ret.map(function (radius) {
                if (radius > width / 2) {
                    radius = width / 2;
                }
                return radius;
            });
            return ret;
        }
    };
}
