import { GlobalVariables } from '../GlobalVariables.js';
import { Enemy } from './BaseEnemy.js';

export class AntiMage extends Enemy {
    constructor() {
        super();
        let gv = new GlobalVariables();
        this.name = 'Anti Mage';
        this.image.src = "Images/am.jpg";
        this.blinkInterval = setInterval(() => this.blink(), 2000);
        this.blinkRange = 50;
    }

    blink() {
        // const deltaX = Math.floor(Math.random() * 100) - 50; // Small random X distance (-50 to 50)
        // const deltaY = Math.floor(Math.random() * 100) - 50; // Small random Y distance (-50 to 50)

        // const newX = this.x + deltaX;
        // const newY = this.y + deltaY;

        const radians = (this.direction * Math.PI) / 180;
        
        const newX = this.x + Math.cos(radians) * this.blinkRange;
        const newY = this.y + Math.sin(radians) * this.blinkRange;

        this.x = newX;
        this.y = newY;
    }

    drawEnemy(ctx) {
        super.drawEnemy(ctx);
        // this.blink();
    }
}
