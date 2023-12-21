import { GlobalVariables } from '../GlobalVariables.js';
import { Enemy } from './BaseEnemy.js';

export class Riki extends Enemy {
    constructor(gameWidth, gameHeight) {
        super();
        this.enemyName = 'Riki'; // Changed from 'name' to 'enemyName'
        this.image.src = "Images/riki.jpg";
        this.boxWidth = GlobalVariables.boxWidth;
        this.boxHeight = GlobalVariables.boxHeight;
        this.invisible = false;

        // Set interval for invisibility every 10 seconds
        setInterval(() => this.activateInvisibility(), 4000);
    }

    activateInvisibility() {
        this.invisible = true;
        setTimeout(() => {
            this.invisible = false;
        }, 2000);
    }

    move() {
        // Convert direction from degrees to radians
        const radians = (this.direction * Math.PI) / 180;

        // Calculate the new position based on the direction and move speed
        const newX = this.x + Math.cos(radians) * this.moveSpeed;
        const newY = this.y + Math.sin(radians) * this.moveSpeed;

        // Check if the new position is within the canvas boundaries
        if (newX >= 0 && newX <= 600 - this.width && newY >= 0 && newY <= 450 - this.height) {
            // Update the position if within boundaries
            this.x = newX;
            this.y = newY;
        } else {
            // Change direction if hitting a corner
            this.direction += 180; // Change direction by 180 degrees
        }
    }

    drawEnemy(ctx) {
        this.move();

        if (!this.invisible) {
            // Draw the enemy only if it is visible
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 1, 0, 2 * Math.PI);
            ctx.stroke();
        }

        this.setDirection();
    }
}
