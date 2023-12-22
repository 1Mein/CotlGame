export class Enemy {
    constructor() {
        this.moveSpeed = 0; // Adjust the speed as needed
        this.width = 50;
        this.height = 50;
        this.x = Math.floor(Math.random() * 600 - this.width);
        this.y = Math.floor(Math.random() * 450 - this.height);
        this.image = new Image();
        this.image.src = "Images/creep1.jpg";
        this.direction = Math.random() * 360;
        this.timerSetDir = 0;
        this.velocityX = 0; // Ensure it is initialized with a numerical value
        this.velocityY = 0;
    }

    drawEnemy(ctx) {
        this.move();
        
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        this.setDirection();
    }

    setDirection() {
        if(this.timerSetDir === 0){
            this.timerSetDir = Date.now() + 500;
        }
        if(this.timerSetDir < Date.now()){
            this.direction += (Math.random() * 100) - 50; // Set a new random direction in degrees +-50
            this.timerSetDir = Date.now() + 500
        }
        
    }

    move() {
        const radians = (this.direction * Math.PI) / 180;

        const newX = this.x + Math.cos(radians) * this.moveSpeed;
        const newY = this.y + Math.sin(radians) * this.moveSpeed;

        if (newX >= 0 && newX <= 600 - this.width && newY >= 0 && newY <= 450 - this.height) {
            this.x = newX;
            this.y = newY;
        } else {
            this.x = Math.max(0,Math.min(newX,600-this.width))
            this.y = Math.max(0,Math.min(newY,450-this.width))

            this.direction += 180; 
        }
    }
}
