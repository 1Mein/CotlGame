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
    function checkEllipseSegmentCollision(ellipseCenterX, ellipseCenterY, ellipseRadiusX, ellipseRadiusY, CurrX1, CurrY1, CurrX2, CurrY2, numChecks = 100) {
        const dx = (CurrX2 - CurrX1) / numChecks;
        const dy = (CurrY2 - CurrY1) / numChecks;

        for (let i = 0; i <= numChecks; i++) {
            const x = CurrX1 + i * dx;
            const y = CurrY1 + i * dy;
    
            const dx_normalized = x - ellipseCenterX;
            const dy_normalized = y - ellipseCenterY;
    
            if ((dx_normalized / ellipseRadiusX) ** 2 + (dy_normalized / ellipseRadiusY) ** 2 <= 1) {
                return true; // Collised
            }
        }
    
        return false; // NotCollised
    }

    
    // function shoot(event) {
    //     //stop sum damage
    //     if(bullet.isFired){
    //         bullet.fireTime -=3000;
    //         return;
    //     }

    //     //take position of click
    //     const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    //     const mouseY = event.clientY - canvas.getBoundingClientRect().top;


    //     const angle = Math.atan2(mouseY - hero.y, mouseX - (hero.x + hero.width / 2));
        
    //     setTimeout(() => {
            
    //         bullet.x = hero.x + hero.width/2 - bullet.width / 2;
    //         bullet.y = hero.y; //MUST BE CHANGED!!!

    //         bullet.angle= angle + Math.PI / 2;

    //         bullet.setFireTime();
    //         bullet.isFired = true;

    //         const centerX = bullet.x + bullet.width / 2;
    //         const centerY = bullet.y + bullet.height/2;

    //         bullet.startX1 = centerX + (bullet.width / 2) * Math.cos(bullet.angle);
    //         bullet.startY1 = centerY + (bullet.width / 2) * Math.sin(bullet.angle);
    //         bullet.startX2 = centerX + (-bullet.width / 2) * Math.cos(bullet.angle);
    //         bullet.startY2 = centerY + (-bullet.width / 2) * Math.sin(bullet.angle);    
    //     }, 10); //NEED TEST

    // }


    let activeAbility = "nothing"; // По умолчанию ничего не активировано

    function shoot(event) {
        if (activeAbility === "nothing") {
           
        } 
        else if(activeAbility === "charging"){
            bullet.fireTime -=3000;
            return;
        }
        else if (activeAbility === "shoot") {
            //take position of click
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    
            const angle = Math.atan2(mouseY - hero.y, mouseX - (hero.x + hero.width / 2));
            
            setTimeout(() => {
                
                bullet.x = hero.x + hero.width/2 - bullet.width / 2;
                bullet.y = hero.y; //MUST BE CHANGED!!!
    
                bullet.angle= angle + Math.PI / 2;
    
                bullet.setFireTime();
                bullet.isFired = true;
    
                const centerX = bullet.x + bullet.width / 2;
                const centerY = bullet.y + bullet.height/2;
    
                bullet.startX1 = centerX + (bullet.width / 2) * Math.cos(bullet.angle);
                bullet.startY1 = centerY + (bullet.width / 2) * Math.sin(bullet.angle);
                bullet.startX2 = centerX + (-bullet.width / 2) * Math.cos(bullet.angle);
                bullet.startY2 = centerY + (-bullet.width / 2) * Math.sin(bullet.angle);    
            }, 10); //NEED TEST

                activeAbility="charging";

        } 
        
        else if (activeAbility === "secondAbility") {
            // Логика для второй способности
            // ...

            
        }
    }
    function secondAbility() {
        const repulsionForce = 10; // Сила отталкивания

    const enemyCenterX = enemy.x + enemy.width / 2; // X-координата центра врага
    const enemyCenterY = enemy.y + enemy.height / 2; // Y-координата центра врага

    // Рассчитываем вектор отталкивания от центра врага
    const repulsionVectorX = enemyCenterX - canvas.width / 2;
    const repulsionVectorY = enemyCenterY - canvas.height / 2;

    // Нормализуем вектор отталкивания
    const distance = Math.sqrt(repulsionVectorX ** 2 + repulsionVectorY ** 2);
    const normalizedRepulsionVectorX = repulsionVectorX / distance;
    const normalizedRepulsionVectorY = repulsionVectorY / distance;

    // Применяем силу отталкивания к врагу
    enemy.x += normalizedRepulsionVectorX * repulsionForce;
    enemy.y += normalizedRepulsionVectorY * repulsionForce;


    activeAbility="nothing";
    }
   
    


    function updateGameArea() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hero.drawHero(ctx);
        enemy.drawEnemy(ctx);
        bullet.drawBullet(ctx);
        
        

        if (bullet.isFired) {
            if (bullet.fireTime <= Date.now()) {
                const isCollis = checkEllipseSegmentCollision(
                    enemy.x+enemy.width/2, enemy.y+enemy.height/2, 
                    enemy.width/2, enemy.height/2, 
                    bullet.currX1, bullet.currY1, 
                    bullet.currX2, bullet.currY2);
                
                if (isCollis) {
                    console.log('Коллизия!');
                }
                activeAbility="nothing";


                bullet.x += Math.cos(bullet.angle - Math.PI / 2) * bullet.speed;
                bullet.y += Math.sin(bullet.angle - Math.PI / 2) * bullet.speed;
            }
            else{
                var countedTime = 3000-bullet.fireTime + Date.now();
                currentDamage.innerHTML = Math.ceil(countedTime/100)*10;
            }
        }
        

        requestAnimationFrame(updateGameArea);
    }


    document.addEventListener("keydown", function(event) {
        if (event.key === "q" && activeAbility == "nothing") {
            activeAbility = "shoot"; // Переключение на способ стрельбы
        
        }
        else if (event.key === "q" && activeAbility == "charging" ){
            shoot(event);
        }
        else if (event.key === "w") {
            activeAbility = "secondAbility"; // Переключение на вторую способность
        }
    });

    document.addEventListener("mousedown", function(event) {
        if (activeAbility === "nothing") {
            // Логика, если ничего не активировано
            // ...
        } else if (activeAbility === "shoot") {
            shoot(event);
        } else if (activeAbility === "secondAbility") {
            secondAbility();
        }
    });
    

    updateGameArea();
});
