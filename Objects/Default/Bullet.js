import { GlobalVariables } from "../GlobalVariables.js";

export class Bullet{
    constructor(){
        this.gv = new GlobalVariables();
        this.x = 0;
        this.y = 0;

        this.cooldown= 2000;//cooldown skill` 
        this.lastTimeUsed = 0;



        this.width = 150;
        this.height = 10;
        this.angle = 0;
        this.speed = 3; // speed of bullet movement
        this.isFired = false;
        this.fireTime = 0; // when bullet will be fired
        this.color = "#FFF"; // color of bullet

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
    isAbilityReady() {
        // Check if enough time has passed since the last time the ability was used
        const currentTime = new Date().getTime();
        
        console.log(currentTime - this.lastTimeUsed >= this.cooldown)
        return currentTime - this.lastTimeUsed >= this.cooldown;
    }

    calculateDistance(){
        const distance = Math.sqrt((this.startX1 - this.currX1)*(this.startX1 - this.currX1) + (this.startY1 - this.currY1)*(this.startY1 - this.currY1));
        return distance;
    }

    drawBullet(ctx){
        if(!this.isFired) return;
        //this.lastTimeUsed = new Date().getTime();
        ctx.fillStyle = this.color;

        ctx.save();

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);

        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();
        this.drawPositions(ctx);
        this.checkOutOfBounds();
    }



////////////////////////////////////////////////////////////////
    drawPositions(ctx) {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height/2;

        ctx.beginPath();
        ctx.arc(centerX,centerY,1,0,2*Math.PI);
        ctx.stroke();


        this.currX1 = centerX + (this.width / 2) * Math.cos(this.angle);
        this.currY1 = centerY + (this.width / 2) * Math.sin(this.angle);

        ctx.beginPath();
        ctx.arc(this.currX1,this.currY1,1,0,2*Math.PI);
        ctx.stroke();

        this.currX2 = centerX + (-this.width / 2) * Math.cos(this.angle);
        this.currY2 = centerY + (-this.width / 2) * Math.sin(this.angle);

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


    ////////////////////////
    checkOutOfBounds(){
        //set positions
        const X1 = this.currX1;
        const Y1 = this.currY1;
        const X2 = this.currX2;
        const Y2 = this.currY2;

        const X3 = X1;
        const Y3 = Y2;
        
        const X4 = X2;
        const Y4 = Y1;

        let points = [[X1,Y1], [X2,Y2], [X3,Y3], [X4,Y4]];

        let counter = 0;

        points.forEach(point => {
            if (point[1] < 0 || point[0] < 0 || point[0] > this.gv.boxWidth || point[1] > this.gv.boxHeight) {
                counter++;
            }
        });

        if(counter === 4){
            this.isFired = false;
        }
    }
}

