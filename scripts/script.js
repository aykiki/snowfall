"use strict";

class Canvas {

    constructor(scene) {
        this.scene = scene;
        this.context = this.scene.getContext('2d');

        this.windowWidth = 0;
        this.windowHeight = 0;

        this.setSize();
        window.addEventListener('resize', () => this.setSize());
    }


    setSize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.scene.width = this.windowWidth;
        this.scene.height = this.windowHeight;

        this.scene.style.width = this.windowWidth + 'px';
        this.scene.style.height = this.windowHeight + 'px';
    }
}





class Snowflake {

    constructor(cnvs) {
        this.countSnow = 0;
        this.snowflakes = [];
        this.image = new Image();

        this.startWind = 0; // changing direction and speed
        this.finishWind = 0;
        this.time = 0;
        this.startWindTime = Math.floor(100000 + Math.random() * 1000000);
        this.finishWindTime = 10 * this.startWindTime + Math.floor(100000 + Math.random() * 1000000);
        this.direction = -1;
        

        this.cnvs = cnvs;
        this.initVars();
    }


    initVars() {
        this.countSnow = (this.cnvs.windowWidth + this.cnvs.windowHeight) / 2;

        for (let i = 0; i < this.countSnow; i++) {

            this.snowflakes.push({

                x: Math.random() * 10,
                y: Math.random(),

                size: Math.floor(1 + Math.random() * 101),

                speedX: Math.random(),
                speedY: Math.random(),

                imgNumber: Math.floor(0 + Math.random() * 11), //randomize images

                //init below
                c: 0, //amplituda
                eps: 0, // eps
                cameraDist: 0,
            });



            // init vars which related with others features for every snowflake
            this.snowflakes[i].speedX = (100 - (this.snowflakes[i].size - 1)) * 0.001;
            this.snowflakes[i].speedY = 1 + (100 - (this.snowflakes[i].size - 1)) * 0.001;

            this.snowflakes[i].eps = this.snowflakes[i].size * 1.5; //for smoothly falling and and disappearing snowflakes 
            this.snowflakes[i].cameraDist = (100 - (this.snowflakes[i].size - 1)) * 0.01; // from start of Z-axis to us [0, 100] -> [0, 1]
            this.snowflakes[i].c = Math.floor(0 + this.snowflakes[i].cameraDist * 11);

        }

    }



    drawSnowflakes() {

        window.requestAnimationFrame(this.drawSnowflakes.bind(this));
        this.cnvs.context.clearRect(0, 0, this.cnvs.windowWidth, this.cnvs.windowHeight);
        
        for (let i = 0; i < this.countSnow; i++) {

            this.image.src = `images/snowflake_${this.snowflakes[i].imgNumber}.png`;

            //draw images with sinusoidal motion in x and cosine motion in y
            this.cnvs.context.drawImage(this.image,
                this.cnvs.windowWidth * this.snowflakes[i].x - this.snowflakes[i].eps + this.snowflakes[i].c * //amplituda related with size
                Math.sin(this.snowflakes[i].c * this.snowflakes[i].y),
                this.cnvs.windowHeight * this.snowflakes[i].y - this.snowflakes[i].eps + this.snowflakes[i].c *
                Math.cos(this.snowflakes[i].c * this.snowflakes[i].x),
                this.snowflakes[i].size, this.snowflakes[i].size);

            // changing x and y          
            this.snowflakes[i].x = (this.snowflakes[i].x * this.cnvs.windowWidth + this.direction * (this.snowflakes[i].speedX + this.startWind)) < 0 ?
                                    this.cnvs.windowWidth + this.snowflakes[i].eps + (this.snowflakes[i].x * this.cnvs.windowWidth + this.direction * 
                                    (this.snowflakes[i].speedX + this.startWind)):(this.snowflakes[i].x * this.cnvs.windowWidth + this.direction * 
                                    (this.snowflakes[i].speedX + this.startWind));
                                    this.snowflakes[i].y = (this.snowflakes[i].y * this.cnvs.windowHeight + (this.snowflakes[i].speedY + this.startWind / 2));

            //return snowflakes on the start of the screen
            this.snowflakes[i].x %= (this.cnvs.windowWidth + this.snowflakes[i].eps);
            this.snowflakes[i].y %= (this.cnvs.windowHeight + this.snowflakes[i].eps);


            //return to initial scale
            this.snowflakes[i].x /= this.cnvs.windowWidth;
            this.snowflakes[i].y /= this.cnvs.windowHeight;

            //do wind 
            this.time++;
            if (this.time == this.startWindTime) {
                this.finishWind= this.speedX + Math.random();
                this.snowflakes[i].direction *= -1;

            }else if (this.time == this.finishWindTime){
                this.wind = 0;
                this.time = 0;
                this.finishWind= 0;
                this.startWind = 0;
            }else if ((this.time > this.startWindTime) && (this.time < this.startWindTime + (this.finishWindTime - this.startWindTime) / 2)){
                this.startWind += 0.00001;
                this.time++;
            }else if ((this.time > this.startWindTime + (this.finishWindTime - this.startWindTime) / 2) && (this.time < this.finishWindTime)){
                this.startWind -= 0.00001;
                this.time++;
            }
            
            if(this.time == this.startWindTime + Math.random() * 1000){
                this.direction *= -1;
                this.time++;
            }

        }


    }
}


function createSnowfall() {

    const scenes = document.querySelectorAll('.snow');

    for (let i = 0; scenes.length > i; i++) {

        let cnvs = new Canvas(scenes[i]);
        let snowfall = new Snowflake(cnvs);
        snowfall.drawSnowflakes();

    }
}

window.onload = createSnowfall;