import { Enemy } from "/Objects/Enemies/BaseEnemy.js"
import {Hero} from "/Objects/Default/Hero.js"
import {Bullet} from "/Objects/Default/Bullet.js"

document.addEventListener("DOMContentLoaded", function () {

    //game box
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    
    //objects
    const enemy = new Enemy();
    const hero = new Hero();
    var bullet = new Bullet();

    //visuals
    const currentDamage = document.querySelector(".current-damage");

   
    //functions
    function isCollision(rect, circ) {
        const closestX = Math.max(rect.x, Math.min(circ.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circ.y, rect.y + rect.height));
    
        const distanceX = circ.x - closestX;
        const distanceY = circ.y - closestY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
        return distance < circ.radius;
    }

    
    function shoot(event) {
        //stop sum damage
        if(bullet.isFired){
            bullet.fireTime -=3000;
            return;
        }

        //take position of click
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;


        const angle = Math.atan2(mouseY - hero.y, mouseX - (hero.x + hero.width / 2));
        
        setTimeout(() => {
            
            bullet.x = hero.x + hero.width/2 - bullet.width / 2;
            bullet.y = hero.y; //MUST BE CHANGED!!!

            bullet.angle= angle;

            bullet.setFireTime();
            bullet.isFired = true;

            const centerX = bullet.x + bullet.width / 2;
            const centerY = bullet.y + bullet.height/2;

            bullet.startX1 = centerX + (bullet.width / 2) * Math.cos(bullet.angle+ Math.PI / 2);
            bullet.startY1 = centerY + (bullet.width / 2) * Math.sin(bullet.angle+ Math.PI / 2);
            bullet.startX2 = centerX + (-bullet.width / 2) * Math.cos(bullet.angle+ Math.PI / 2);
            bullet.startY2 = centerY + (-bullet.width / 2) * Math.sin(bullet.angle+ Math.PI / 2);    
        }, 10); //NEED TEST

    }

    function updateGameArea() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hero.drawHero(ctx);
        enemy.drawEnemy(ctx);
        bullet.drawBullet(ctx);
        
        

        if (bullet.isFired) {
            if (bullet.fireTime <= Date.now()) {    
                bullet.x += Math.cos(bullet.angle) * bullet.speed;
                bullet.y += Math.sin(bullet.angle) * bullet.speed;
                
                var isCol = isCollision({
                    x:bullet.x + bullet.width / 2 , 
                    y:bullet.y + bullet.height/2, 
                    width: bullet.width,
                    height: bullet.calculateDistance()},
                    {
                        x:bullet.x + bullet.width/2,
                        y:bullet.y + bullet.height/2,
                        radius: Math.sqrt(2)*enemy.width
                    })
                    
                if(isCol){
                    // console.log(isCol);
                }

                if (bullet.y < 0 || bullet.x < 0 || bullet.x > canvas.width || bullet.y > canvas.height) {
                    bullet.isFired = false;
                }
            }
            else{
                var countedTime = 3000-bullet.fireTime + Date.now();
                currentDamage.innerHTML = Math.ceil(countedTime/100)*10;
            }
        }
        

        requestAnimationFrame(updateGameArea);
    }

    document.addEventListener("mousedown", shoot);

    updateGameArea();
});
