import { GlobalVariables } from "../GlobalVariables.js";

export class BlindingLight{
    constructor() {
        this.repulsionForce = 100;
        this.repulsionRadius = 100;
        this.lightRadius = 5;  // Initial radius of the light
        this.x = 0;
        this.y = 0;

    }

    drawLight(ctx) {
        // Increase the light radius gradually
        this.lightRadius += 5;

        // Draw the light as a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.lightRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';  // Adjust color and transparency as needed
        ctx.fill();
         ctx.closePath();
    }

    animateLight(ctx) {
        // Assuming you have an animation loop or timer
        // Example: requestAnimationFrame, setInterval, etc.
        const animateFrame = () => {
            // Clear the canvas or update it as needed
            // ...

            // Draw the light
            this.drawLight(ctx);
            if(this.lightRadius >= this.repulsionRadius){
                this.lightRadius = 0;
                return;
            }
            // Continue the animation loop
            requestAnimationFrame(animateFrame);
        };

        // Start the animation loop
        animateFrame();
    }

    
}