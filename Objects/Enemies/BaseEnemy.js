export class Enemy {
    constructor() {
        this.x = Math.floor(Math.random() * 550);
        this.y = Math.floor(Math.random() * 400);
        this.moveSpeed = 1; // Adjust the speed as needed
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "Images/creep1.jpg";
        this.direction = Math.random() * 360; // Initial random direction in degrees
        this.timerSetDir = 0;
    }

    drawEnemy(ctx) {
        this.move();

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 1, 0, 2 * Math.PI);
        ctx.stroke();
        this.setDirection();
    }

    setDirection() {
        if(this.timerSetDir === 0){
            this.timerSetDir = Date.now() + 1000;
        }
        if(this.timerSetDir < Date.now()){
            this.direction += (Math.random() * 100) - 50; // Set a new random direction in degrees
            this.timerSetDir = Date.now() + 500
        }
        
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
}
