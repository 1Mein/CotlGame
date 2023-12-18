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
    }
}