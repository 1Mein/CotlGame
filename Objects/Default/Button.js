export class Button{
    constructor(){
        this.x = 250;
        this.y = 250;
        this.width = 100;
        this.height = 50;
    }

    createStartButton(ctx){
        ctx.fillStyle = '#00FF00'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#000000';
        ctx.font = '20px Arial';
        ctx.fillText('Start', this.x + 30, this.y + 30);
    }

    createRestartButton(ctx){
        ctx.fillStyle = '#00FF00'; 
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#000000';
        ctx.font = '20px Arial';
        ctx.fillText('Restart', this.x + 18, this.y + 30);
    }

    createLabel(ctx,score){
        ctx.fillStyle = '#000000'
        ctx.font = '20px Arial';

        ctx.fillText('Your score: ' + score, this.x-30, this.y - 30);
    }

    isButtonClicked(x, y) {
        return x > this.x && x < this.x + this.width &&
               y > this.y && y < this.y + this.height;
    }
}