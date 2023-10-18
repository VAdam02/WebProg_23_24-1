addEventListener('load', () => {
    demoDraw(gameArea);

    game = new FlappyGame(gameArea);
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

function random(from, to)
{
    return Math.floor(Math.random() * (to - from) + from);
}

class FlappyGame {
    constructor(canvas) {
        this.gameArea = canvas;
        this.ctx = this.gameArea.getContext('2d');
        this.ctx.width = this.gameArea.width;
        this.ctx.height = this.gameArea.height;
        this.state = "playing"

        this.gapHeight = 75;

        this.bird = new Bird(this);

        canvas.addEventListener('click', () => this.bird.jump());

        this.fps = 60;
        this.lastFrame = Date.now();

        this.pipes = [];

        this.nextFrame();
    }

    update(deltatime) {
        if (!this.isReady()) return;

        this.bird.update(deltatime);

        if (this.pipes.length == 0) { this.pipes.push(new Pipe(this, 300, random(this.ctx.height/-2, this.ctx.height/2))); }

        while (this.pipes[this.pipes.length - 1].position[0] < this.bird.position[0] + this.ctx.width)
        {
            this.pipes.push(new Pipe(this, this.pipes[this.pipes.length - 1].position[0] + 200, random(this.ctx.height/-2, this.ctx.height/2)));
        }

        this.pipes.forEach(pipe => pipe.update(deltatime));
    }

    render(ctx) {
        ctx.fillStyle = '#79c6d3';
        ctx.fillRect(0, 0, ctx.width, ctx.height);

        if (!this.isReady()) return;

        let left = this.bird.position[0] - 100;

        this.bird.render(ctx, left, ctx.height/-2, ctx.width, ctx.height);
        
        this.pipes.forEach(pipe => pipe.render(ctx, left, ctx.height/-2, ctx.width, ctx.height))
    }

    nextFrame() {
        setTimeout(() => {
            this.update((Date.now() - this.lastFrame)/1000);
            this.render(this.ctx);
            this.nextFrame();
        }, (1000 / this.fps) - (Date.now() - (this.lastFrame ? this.lastFrame : Date.now())));
        this.lastFrame = Date.now();
    }

    isReady() {
        return this.bird.isReady() && this.pipes.every(pipe => pipe.isReady());
    }

    GameOver() {
        this.state = "gameover"
    }
}

class Bird {
    static texture;

    constructor(game) {
        this.game = game;
        this.width = 25;

        this.velocity = [100, 0]
        this.acceleration = [0, -100]
        this.position = [0, 0]

        if (!Bird.texture) {
            Bird.texture = new Image();
            Bird.texture.src = 'bird.png';
        }
    }

    update(deltatime) {
        if (this.game.state != "playing") return;

        this.velocity[0] += this.acceleration[0] * deltatime;
        this.velocity[1] += this.acceleration[1] * deltatime;

        this.position[0] += this.velocity[0] * deltatime;
        this.position[1] += this.velocity[1] * deltatime;

        let imgHeight = this.width * Bird.texture.height / Bird.texture.width;
        if (this.position[1] + imgHeight/2 > this.game.ctx.height/2) this.game.GameOver();
        if (this.position[1] - imgHeight/2 < this.game.ctx.height/-2) this.game.GameOver();
    }

    render(ctx, left, top, width, height) {
        let rotation = Math.atan2(-this.velocity[1], this.velocity[0]);

        ctx.save();
        ctx.translate(this.position[0] - left, (-this.position[1] - top))
        ctx.rotate(rotation);
        ctx.drawImage(Bird.texture, this.width/-2, this.width * Bird.texture.height / Bird.texture.width /-2, this.width, this.width * Bird.texture.height / Bird.texture.width)

        ctx.restore();
    }

    isReady() {
        return Bird.texture.complete;
    }

    jump() {
        if (this.game.state != "playing") return;

        this.velocity[1] += 100;
    }
}

class Pipe {
    static pipeTop;
    static pipeBottom;

    constructor(game, x, y) {
        this.game = game;
        this.width = 25;

        this.position = [x, y]

        if (!Pipe.pipeTop) {
            Pipe.pipeTop = new Image();
            Pipe.pipeTop.src = 'tube.png';
        }
        if (!Pipe.pipeBottom) {
            Pipe.pipeBottom = new Image();
            Pipe.pipeBottom.src = 'tubeLong.png';
        }
    }

    isReady() {
        return Pipe.pipeTop.complete && Pipe.pipeBottom.complete;
    }

    update(deltatime) {
        if (this.game.bird.position[0] - this.game.bird.width > this.position[0] + this.width/2) return;
        if (this.game.bird.position[0] + this.game.bird.width < this.position[0] - this.width/2) return;

        let birdImgHeight = this.game.bird.width * Bird.texture.height / Bird.texture.width;
        if (!(this.game.bird.position[1] + birdImgHeight/2 > this.position[1] + this.game.gapHeight/2
           || this.game.bird.position[1] - birdImgHeight/2 < this.position[1] - this.game.gapHeight/2)) return;

        this.game.GameOver();
    }

    render(ctx, left, top, width, height) {
        if (this.position[0] < left - this.width/2) return;

        let imgHeight = this.width * Pipe.pipeTop.height / Pipe.pipeTop.width;

        ctx.save();
        ctx.translate(this.position[0]-left, (-this.position[1]) - top + this.game.gapHeight/2);
        ctx.drawImage(Pipe.pipeTop, this.width/-2, 0, this.width, imgHeight);
        ctx.restore();

        ctx.save();
        ctx.scale(1, -1);
        ctx.translate(this.position[0]-left, -((-this.position[1]) - top - this.game.gapHeight/2));
        ctx.drawImage(Pipe.pipeTop, this.width/-2, 0, this.width, imgHeight);
        ctx.restore();

        ctx.save();
        ctx.translate(this.position[0]-left, (-this.position[1]) - top + this.game.gapHeight/2 + imgHeight);
        ctx.drawImage(Pipe.pipeBottom, this.width/-2, -100, this.width, (this.position[1] - top)-imgHeight/2-this.game.gapHeight);

        console.log((this.position[1]+(height/2)))
        
        

        ctx.restore();
    }
}