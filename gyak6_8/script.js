addEventListener('load', () => {
    let ctx = gameArea.getContext('2d');

    ctx.width = gameArea.width;
    ctx.height = gameArea.height;

    //IDK(ctx);

    game = new FlappyGame(gameArea);
})

function IDK(ctx)
{
    //ctx.fillStyle = 'white';
    //ctx.fillRect(0, 0, ctx.width, ctx.height)

    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    //ctx.lineWidth = 10;
    ctx.moveTo(200, 300);
    ctx.stroke();
    ctx.strokeStyle = 'green';
    ctx.lineTo(400, 300);
    ctx.stroke();
    ctx.strokeStyle = 'yellow';
    ctx.lineTo(300, 100);
    ctx.stroke();
    ctx.strokeStyle = 'purple';
    //ctx.stroke();
    ctx.closePath();
    //ctx.fill();
    //ctx.stroke();
}



class FlappyGame {
    constructor(canvas) {
        this.gameArea = canvas;
        this.ctx = this.gameArea.getContext('2d');

        canvas.addEventListener('click', () => this.jump());

        this.fps = 10;
        this.lastFrame = Date.now();

        this.bird = new Bird();
        this.pipe = new Pipe();

        this.nextFrame();
    }

    update(deltatime) {
        if (!this.isReady()) return;

        this.bird.update(deltatime);
        this.pipe.update(deltatime);
    }

    render() {
        this.ctx.fillStyle = '#79c6d3';
        this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height);

        if (!this.isReady()) return;

        let left = this.bird.position[0] - 100;

        this.bird.render(this.ctx, left, 0, this.ctx.width, this.ctx.height);
        this.pipe.render(this.ctx, left , 0, this.ctx.width, this.ctx.height);
    }

    nextFrame() {
        this.update((Date.now() - this.lastFrame)/1000);
        this.render();
        setTimeout(() => this.nextFrame(), (1000/this.fps) - (Date.now() - this.lastFrame))
        this.lastFrame = Date.now();
    }

    isReady() {
        return this.bird.isReady() && this.pipe.isReady();
    }

    jump() {
        this.bird.velocity[1] += 100;
    }
}

class Bird {
    static texture;

    constructor() {
        this.waitingFor = []
        this.textureWidth = 25; //TODO not used

        this.velocity = [100, 0]
        this.acceleration = [0, -100]
        this.position = [0, 0]

        if (!Bird.texture) {
            Bird.texture = new Image();
            Bird.texture.src = 'bird.png';
            this.waitingFor.push(Bird.texture);

            Bird.texture.addEventListener('load', () => {
                this.waitingFor.splice(this.waitingFor.indexOf(Bird.texture));
            })
        }
    }

    update(deltatime) {
        this.velocity[0] += this.acceleration[0] * deltatime;
        this.velocity[1] += this.acceleration[1] * deltatime;

        this.position[0] += this.velocity[0] * deltatime;
        this.position[1] += this.velocity[1] * deltatime;

        console.log([this.velocity[0], this.velocity[1], this.position[0], this.position[1]])
    }

    render(ctx, left, top, width, height) {
        let rotation = Math.atan2(-this.velocity[1], this.velocity[0]);

        ctx.save();
        ctx.translate(this.position[0] - left, top - this.position[1])
        ctx.rotate(rotation);
        ctx.drawImage(Bird.texture, -Bird.texture.width/2, -Bird.texture.height/2, Bird.texture.width, Bird.texture.height);
        ctx.restore();
    }

    isReady() {
        return this.waitingFor.length == 0;
    }
}

class Pipe {
    static texture;

    constructor() {
        this.waitingFor = []
        this.textureWidth = 25; //TODO not used

        this.position = [200, 0]

        if (!Pipe.texture) {
            Pipe.texture = new Image();
            Pipe.texture.src = 'tube.png';
            this.waitingFor.push(Pipe.texture);

            Pipe.texture.addEventListener('load', () => {
                this.waitingFor.splice(this.waitingFor.indexOf(Pipe.texture));
            })
        }
    }

    isReady() {
        return this.waitingFor.length == 0;
    }

    update(deltatime) {

    }

    render(ctx, left, top, width, height) {
        ctx.drawImage(Pipe.texture, this.position[0] - left, top - this.position[1], Pipe.texture.width, Pipe.texture.height);
    }
}