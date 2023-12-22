import { GlobalVariables } from '../GlobalVariables.js';
import { Enemy } from './BaseEnemy.js';

export class Riki extends Enemy {
    constructor() {
        super();
        this.enemyName = 'Riki';
        this.image.src = "Images/riki.jpg";
        this.invisible = false;

        this.disableInvisibility();
    }

    activateInvisibility() {
        this.invisible = true;
        setTimeout(() => this.disableInvisibility(), 1000);
    }

    disableInvisibility() {
        this.invisible = false;
        setTimeout(() => this.activateInvisibility(), 4000);   
    }
        

    drawEnemy(ctx) {
        super.move();

        if (!this.invisible) { // Draw the enemy only if it is visible
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        super.setDirection();
    }
}
