

export class BlindingLight {
    constructor() {
        this.repulsionForce = 100;
        this.repulsionRadius = 100;
        this.lightRadius = 5;  // Initial radius of the light
        this.x = 0;
        this.y = 0;
        this.cooldown = 5000;  // Cooldown time in milliseconds (5 seconds in this example)
        this.lastTimeUsed = 0;  // Timestamp of the last time the ability was used
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

    isAbilityReady() {
        // Check if enough time has passed since the last time the ability was used
        const currentTime = new Date().getTime();
        return currentTime - this.lastTimeUsed >= this.cooldown;
    }

    animateLight(ctx) {
        const animateFrame = () => {
            // Clear the canvas or update it as needed
            // ...

            // Check if the ability is ready to be used
            if(this.lightRadius >= this.repulsionRadius){
                this.lightRadius = 0;
                return;
            }   
                // Draw the light
                
                this.drawLight(ctx);
                
                // Update the timestamp of the last time the ability was used
                this.lastTimeUsed = new Date().getTime();
                

            // Continue the animation loop
            requestAnimationFrame(animateFrame);
        };

        // Start the animation loop
        animateFrame();
    }

    drawRange(ctx,cursorX,cursorY){
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, this.repulsionRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)';  // Adjust color and transparency as needed
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
}