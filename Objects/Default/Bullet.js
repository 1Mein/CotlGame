import { GlobalVariables } from "../GlobalVariables.js";

export class Bullet{
    constructor(){
        this.gv = new GlobalVariables();
        this.x = 0;
        this.y = 0;
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

    calculateDistance(){
        const distance = Math.sqrt((this.startX1 - this.currX1)*(this.startX1 - this.currX1) + (this.startY1 - this.currY1)*(this.startY1 - this.currY1));
        return distance;
    }

    drawBullet(ctx){
        if(!this.isFired) return;

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

        this.currX1 = centerX + (this.width / 2) * Math.cos(this.angle);
        this.currY1 = centerY + (this.width / 2) * Math.sin(this.angle);

        this.currX2 = centerX + (-this.width / 2) * Math.cos(this.angle);
        this.currY2 = centerY + (-this.width / 2) * Math.sin(this.angle);
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

    
    drawRange(ctx,startX,startY,cursorX,cursorY){
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(cursorX, cursorY);

        ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();    
    }
}

