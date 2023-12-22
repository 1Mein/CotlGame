export class Abilities{
    constructor(){
        this.x = 250;
        this.y = 250;
        this.width = 100;
        this.height = 50;
        this.firstSpellImage = new Image();
        this.firstSpellImage.src = "/Images/keeper_of_the_light_illuminate.png";
        this.firstSpellActiveImage = new Image();
        this.firstSpellActiveImage.src = "/Images/Release_Illuminate_icon.png";
        this.secondSpellImage = new Image();
        this.secondSpellImage.src = "/Images/keeper_of_the_light_blinding_light.png";
    }

    firstSpell(ctx,isActive){
        if(!isActive){
            ctx.drawImage(this.firstSpellImage, 5, 600-75,70,70);
        }
        else{
            ctx.drawImage(this.firstSpellActiveImage, 5, 600-75,70,70);
        }
    }

    secondSpell(ctx){
        ctx.drawImage(this.secondSpellImage,5+70+5, 600-75,70,70);
    }
}