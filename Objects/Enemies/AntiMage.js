import { GlobalVariables } from '../GlobalVariables.js';
import { Enemy } from './BaseEnemy.js';

export class AntiMage extends Enemy {
    constructor(gameWidth, gameHeight) {
        super();
        this.name = 'Anti Mage';
        this.image.src = "Images/am.jpg";
        this.boxWidth = GlobalVariables.boxWidth;
        this.boxHeight = GlobalVariables.boxHeight;
        // Set initial Y position
        this.blinkInterval = setInterval(() => this.blink(), 2000);
    }

    blink() {
        // Move the enemy by a small distance
        const deltaX = Math.floor(Math.random() * 100) - 50; // Small random X distance (-50 to 50)
        const deltaY = Math.floor(Math.random() * 100) - 50; // Small random Y distance (-50 to 50)

        // Calculate the new position
        const newX = this.x + deltaX;
        const newY = this.y + deltaY;

        // Check if the new position is within the canvas boundaries
        if (newX >= 0 && newX <= 600 - this.width && newY >= 0 && newY <= 450 - this.height) {
            // Update the position if within boundaries
            this.x = newX;
            this.y = newY;
        } else {
            // If the new position is outside boundaries, perform another blink in a different direction
            this.blink();
        }
    }

    drawEnemy(ctx) {
        super.drawEnemy(ctx);
    }
}
