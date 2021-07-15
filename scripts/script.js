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

        this.cnvs = cnvs;
        this.initVars();
    }


    initVars() {
        this.countSnow = (this.cnvs.windowWidth + this.cnvs.windowHeight) / 2;

        for (let i = 0; i < this.countSnow; i++) {
            this.snowflakes.push({
                x: Math.random(),
                y: Math.random(),

                size: Math.random(),
                speed: Math.random(),
                c: Math.random(), //amplituda

                imgNumber: Math.random(), //for randomize images

                wind: false, // for changing direction and speed
                direction: 1,
            });
        }

    }


    drawSnowflakes() {
        
        window.requestAnimationFrame(this.drawSnowflakes.bind(this));
        this.cnvs.context.clearRect(0, 0, this.cnvs.windowWidth, this.cnvs.windowHeight);


        for (let i = 0; i < this.countSnow; i++) {

            this.image.src = `img/snowflake_${Math.floor(0 + this.snowflakes[i].imgNumber * 11)}.png`;

            //draw images with sinusoidal motion in x and cosine motion in y
            this.cnvs.context.drawImage(this.image,
                this.cnvs.windowWidth * this.snowflakes[i].x + this.snowflakes[i].c *
                Math.sin(this.snowflakes[i].c * this.snowflakes[i].y),
                this.cnvs.windowHeight * this.snowflakes[i].y + this.snowflakes[i].c *
                Math.cos(this.snowflakes[i].c * this.snowflakes[i].x),
                this.snowflakes[i].size * 11, this.snowflakes[i].size * 11);

            // changing x and y
            this.snowflakes[i].x += this.snowflakes[i].speed;
            this.snowflakes[i].y += this.snowflakes[i].speed;

            //return snowflakes on the start of the screen
            this.snowflakes[i].x %= this.cnvs.windowWidth;
            this.snowflakes[i].y %= this.cnvs.windowHeight;

        }
    }
}




function createSnowfall() {

    const scenes = document.querySelectorAll('.snow');

    for(let i = 0; scenes.length > i; i++) {

        let cnvs = new Canvas(scenes[i]);
        let snowfall = new Snowflake(cnvs);
        snowfall.drawSnowflakes();

    }
}

window.onload = createSnowfall;