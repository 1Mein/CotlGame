export class Enemy{
    constructor(){
        this.x = Math.floor((Math.random()*550));
        this.y = Math.floor((Math.random()*400));;
        // this.x = 550;
        // this.y =400;
        this.moveSpeed = 100;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "Images/creep.png";
    }

    drawEnemy(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        ctx.beginPath();
        ctx.arc(this.x + this.width/2,this.y + this.height/2,1,0,2*Math.PI);
        ctx.stroke()
    }
}