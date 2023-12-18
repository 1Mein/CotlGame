export class Bullet{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 150;
        this.height = 10;
        this.angle = 0;
        this.speed = 1;
        this.isFired = false;
        this.fireTime = 0; //when bullet will be fired
        this.color = "#FFF";

        this.startX1 = 0;
        this.startY1 = 0;
        this.startX2 = 0;
        this.startY2 = 0;

        this.currX1 = 0;
        this.currY1 = 0;
        this.currX2 = 0;
        this.currY2 = 0;
    }

    setFireTime(){
        this.fireTime = Date.now() + 3000; //3 seconds can wait for bullet to fire
    }

    calculateDistance(){
        const distance = Math.sqrt((this.startX1 - this.currX1)*(this.startX1 - this.currX1) + (this.startY1 - this.currY1)*(this.startY1 - this.currY1));
        return distance;
    }

    drawBullet(ctx){
        if(!this.isFired) return;

        ctx.fillStyle = this.color;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle + Math.PI / 2);

        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
        this.setPositions(ctx);
    }



////////////////////////////////////////////////////////////////
    setPositions(ctx) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,4,0,this.angle);
        // console.log(this.angle)
        ctx.stroke();


        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height/2;

        ctx.beginPath();
        ctx.arc(centerX,centerY,1,0,2*Math.PI);
        ctx.stroke();


        this.currX1 = centerX + (this.width / 2) * Math.cos(this.angle+ Math.PI / 2);
        this.currY1 = centerY + (this.width / 2) * Math.sin(this.angle+ Math.PI / 2);

        ctx.beginPath();
        ctx.arc(this.currX1,this.currY1,1,0,2*Math.PI);
        ctx.stroke();

        this.currX2 = centerX + (-this.width / 2) * Math.cos(this.angle+ Math.PI / 2);
        this.currY2 = centerY + (-this.width / 2) * Math.sin(this.angle+ Math.PI / 2);

        ctx.beginPath();
        ctx.arc(this.currX2,this.currY2,1,0,2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.startX1,this.startY1,1,0,2*Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.startX2,this.startY2,1,0,2*Math.PI);
        ctx.stroke();
    }
}