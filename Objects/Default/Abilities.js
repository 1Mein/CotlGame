export class Abilities{
    constructor(){
        this.firstSpellImage = new Image();
        this.firstSpellImage.src = "/Images/keeper_of_the_light_illuminate.png";
        this.firstSpellActiveImage = new Image();
        this.firstSpellActiveImage.src = "/Images/Release_Illuminate_icon.png";
        this.secondSpellImage = new Image();
        this.secondSpellImage.src = "/Images/keeper_of_the_light_blinding_light.png";
        this.buttonQ = new Image();
        this.buttonQ.src = "/Images/ButtonQ.png";
        this.buttonW = new Image();
        this.buttonW.src = "/Images/ButtonW.png";

        this.height = 70;
        this.width = 70;
        this.gap = 5;
        this.x1 = this.gap;
        this.y1 = 600 - this.height - this.gap;
        this.x2 = this.x1 + this.width + this.gap;
        this.y2 = this.y1; 
    }

    firstSpell(ctx,isActive){
        if(!isActive){
            ctx.drawImage(this.firstSpellImage, this.x1, this.y1,this.width,this.height);
        }
        else{
            ctx.drawImage(this.firstSpellActiveImage, this.x1, this.y1,this.width,this.height);
        }
        ctx.drawImage(this.buttonQ, this.x1 + this.width - 12, this.y1 - 3,15,15);
    }

    secondSpell(ctx){
        ctx.drawImage(this.secondSpellImage,this.x2, this.y2,this.width,this.height);   
        ctx.drawImage(this.buttonW, this.x2 + this.width - 12, this.y1 - 3,15,15);
    }

    clickedSpell(x,y){
        if(x > this.x1 && x < this.x1 + this.width &&
            y > this.y1 && y < this.y1 + this.height){
                return "KeyQ";
        }
        if(x > this.x2 && x < this.x2 + this.width &&
            y > this.y2 && y < this.y2 + this.height){
                return "KeyW";
        }
        return false;
    }

}