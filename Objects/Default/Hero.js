import { GlobalVariables } from "../GlobalVariables.js";

export class Hero{
    constructor(){
        var vars = new GlobalVariables();
        this.x = vars.boxWidth / 2 - 25;
        this.y = vars.boxHeight - 50;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "Images/kotl.jpg";
    }

    drawHero(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}