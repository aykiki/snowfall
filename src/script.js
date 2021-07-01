"use strict"

class Snowflakes {

    constructor(scene) {
        this.scene = scene;
        this.context = this.scene.getContext('2d');
        this.angle = 0;
        this.countSnow = 20;
        this.x = 50;
        this.y = 0;
        this.snowflakes = [];
        this.onResize();
        window.addEventListener('resize', () => this.onResize());
    }


    onResize() {
        console.log(this.scene)
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        this.scene.width = this.windowWidth;
        this.scene.height = this.windowHeight;

        this.scene.style.width = this.windowWidth + 'px';
        this.scene.style.height = this.windowHeight + 'px';
        //this.draw();

        for (let i = 0; i < this.countSnow; i++) {
            this.snowflakes.push({
                x: Math.random() * this.windowWidth, 
                y: Math.random() * this.windowHeight, //y-coordinate
                r: Math.random() * 4 + 1, //radius
                d: Math.random() * this.countSnow //density
            });
        }

        setInterval(this.drawAnimation.bind(this), 0);

    }
    drawAnimation() {

        this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);
        this.context.fillStyle = "#F8F8FF";
        this.context.beginPath();
        for(var i = 0; i < this.countSnow; i++)
		{
			this.context.arc(this.snowflakes[i].x, this.snowflakes[i].y, this.snowflakes[i].r, 0, Math.PI*2, true);
            this.context.fill();
            this.context.closePath();
            if (this.snowflakes[i].y <= this.windowHeight)
                this.snowflakes[i].y += 0.03;
            else {
                this.snowflakes[i].y = -1;
            }
            
		}
        window.requestAnimationFrame(this.drawAnimation.bind(this));

    }

}

const scenes = document.querySelectorAll('.snow');
for (let i = 0; scenes.length > i; i++) {
    new Snowflakes(scenes[i]);
}
