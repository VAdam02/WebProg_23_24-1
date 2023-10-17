addEventListener('load', () => {
    demoDraw(gamearea);

    game = new FlappyGame(gamearea);
    game.nextFrame();

})

let game;

function demoDraw(canvas)
{
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 300, 200);

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 200);
    ctx.moveTo(100, 300);
    ctx.lineTo(300, 400)
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(300, 300, 100, 0, 1.5)
    //ctx.closePath();
    ctx.stroke();
}


class FlappyGame {
    constructor(canvas) {
        this.fpsLimit = 10;
        this.ctx = canvas.getContext('2d');
        this.ctx.width = canvas.width;
        this.ctx.height = canvas.height;

        canvas.addEventListener('click', () => this.jump());

        this.bird = new Bird();
        this.pipes = [];
    }

    update(deltatime) {
        if (!this.isReady()) return;

        this.bird.update(deltatime);

        if (this.pipes.length == 0) { this.pipes.push(new Pipe(300)); }

        while (this.pipes[this.pipes.length - 1].position[0] < this.bird.position[0] + this.ctx.width)
        {
            this.pipes.push(new Pipe(this.pipes[this.pipes.length - 1].position[0] + 200));
        }

        this.pipes.forEach(pipe => pipe.update(deltatime));
    }

    render(ctx) {
        ctx.fillStyle = '#79c6d3';
        ctx.fillRect(0, 0, this.ctx.width, this.ctx.height)

        if (!this.isReady()) return;

        let left = this.bird.position[0] - 100;
        this.bird.render(ctx, left, 0, this.ctx.width, this.ctx.height);
        this.pipes.forEach(pipe => pipe.render(ctx, left, 0, this.ctx.width, this.ctx.height));
    }

    nextFrame() {
        setTimeout(() => {
            this.update((Date.now() - this.lastFrame)/1000);
            this.render(this.ctx);
            this.nextFrame()
        }, (1000 / this.fpsLimit) - (Date.now() - (this.lastFrame ? this.lastFrame : Date.now())));
        this.lastFrame = Date.now();
    }

    isReady() {
        return this.bird.isReady() && this.pipes.every(pipe => pipe.isReady());
    }

    jump() {
        this.bird.velocity[1] += 100;
    }
}

class Bird {
    static texture;

    constructor() {
        this.position = [0, 0];
        this.velocity = [100, 0];
        this.acceleration = [0, -100];
        this.isWaitingFor = [];

        this.width = 25;

        if (!Bird.texture)
        {
            Bird.texture = new Image();
            Bird.texture.src = 'bird.png';
        }
    }

    isReady() {
        return Bird.texture.complete;
    }

    update(deltatime) {
        this.velocity[0] += this.acceleration[0] * deltatime;
        this.velocity[1] += this.acceleration[1] * deltatime;

        this.position[0] += this.velocity[0] * deltatime;
        this.position[1] += this.velocity[1] * deltatime;
    }

    render(ctx, left, top, width, height) {
        let rotation = Math.atan2(-this.velocity[1], this.velocity[0]);

        ctx.save();

        ctx.translate(this.position[0] - left, (-this.position[1])-top + (ctx.height / 2));
        ctx.rotate(rotation)
        ctx.drawImage(Bird.texture, this.width/-2, this.width * Bird.texture.height / Bird.texture.width / -2, this.width, this.width * Bird.texture.height / Bird.texture.width);

        ctx.restore();
    }
}

class Pipe {
    static pipeTop
    static pipeBottom

    constructor(x) {
        this.position = [x, 0];
        this.width = 50;

        if (!Pipe.pipeTop)
        {
            Pipe.pipeTop = new Image();
            Pipe.pipeTop.src = 'tube.png';
        }

        if (!Pipe.pipeBottom)
        {
            Pipe.pipeBottom = new Image();
            Pipe.pipeBottom.src = 'tubeLong.png';
        }
    }

    update(deltatime) {

    }

    render(ctx, left, top, width, height) {
        ctx.save();

        ctx.translate(this.position[0]-left, (-this.position[1])-top + (ctx.height / 2));
        ctx.drawImage(Pipe.pipeTop, this.width/-2, this.width * Pipe.pipeTop.height / Pipe.pipeTop.width / -2, this.width, this.width * Pipe.pipeTop.height / Pipe.pipeTop.width);    

        ctx.restore();
    }

    isReady() {
        return Pipe.pipeTop.complete && Pipe.pipeBottom.complete;
    }
}