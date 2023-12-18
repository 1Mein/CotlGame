export class Bullet{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 150;
        this.height = 10;
        this.angle = 0;
        this.speed = 1;
        this.isFired = false;
        this.fireTime = 0;
        this.color = "#FFF";
    }

    setFireTime(){
        this.fireTime = Date.now() + 3000;
    }

    drawBullet(ctx){
        if(!this.isFired) return;

        ctx.fillStyle = this.color;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);

        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();

        ctx.beginPath();
        // ctx.translate(this.x,this.y);
        ctx.arc(this.x,this.y,1,0,2*Math.PI);
        ctx.stroke();
    }
}