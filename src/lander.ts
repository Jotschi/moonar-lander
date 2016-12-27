const GRAVITY = -0.02;

export default class Lander {
    width = 12
    height = 16
    thrust = 0.1
    position = {
        x: 50,
        y: 50
    }
    angle = 0
    velocity = {
        x: 0,
        y: 0
    }
    engine: "off" | "half" | "full"
    rotate: "off" | "left" | "right"

    constructor() {
        this.engine = "off";
        this.rotate = "off";
    }

    public tick() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.rotate === "right") {
            this.angle += Math.PI / 180 * 0.5;
        }
        else if (this.rotate === "left") {
            this.angle -= Math.PI / 180 * 0.5;
        }

        if (this.engine !== "off") {
            this.velocity.x += this.thrust * Math.sin(-this.angle) * -1;
            this.velocity.y += this.thrust * Math.cos(this.angle) * -1;
        }
        this.velocity.y -= GRAVITY;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle);

        ctx.moveTo(this.width / -2, this.height / 2);
        ctx.lineTo(this.width / -2.4, this.height / -2);
        ctx.lineTo(this.width / 2.4, this.height / -2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.fillStyle = "grey";
        ctx.fill();

        // ctx.rect(this.width * -0.5, this.height * -0.5, this.width, this.height);
        ctx.closePath();

        // Draw the flame if engine is on
        if (this.engine !== "off") {
            ctx.beginPath();
            ctx.moveTo(this.width * -0.5, this.height * 0.5);
            ctx.lineTo(this.width * 0.5, this.height * 0.5);
            ctx.lineTo(0, this.height * 0.5 + Math.random() * 10);
            ctx.lineTo(this.width * -0.5, this.height * 0.5);
            ctx.closePath();
            ctx.fillStyle = "orange";
            ctx.fill();
        }
        ctx.restore();

    }
}