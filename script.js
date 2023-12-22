import { Enemy } from "/Objects/Enemies/BaseEnemy.js"
import {Hero} from "/Objects/Default/Hero.js"
import {BlindingLight} from "/Objects/Default/BlindingLight.js"
import {Bullet} from "/Objects/Default/Bullet.js"
import { EnemyFactory } from "./Objects/Enemies/EnemyFactory.js";

document.addEventListener("DOMContentLoaded", function () {

    //game box
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    //enemies
    let enemies = ['AntiMage','Riki','Creep']

    //objects
    let enemy = new EnemyFactory().createEnemy(enemies[Math.floor(Math.random() * enemies.length)]);
    const hero = new Hero();
    let bullet = new Bullet();
    let light = new BlindingLight();

    //visuals
    const currentDamage = document.querySelector(".current-damage");
    const currentScore = document.querySelector(".current-score");
    const timerValue = document.querySelector(".timer");
  
    //variables
    let score = 0;
    let curDamage = 0;
    let timeLeft =60;
    let collised = false;
    let sa;
   
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
        
    }
    function secondAbility(cursorX, cursorY, enemy) {
        
        const circleCenterX = cursorX; // X-координата центра круга
        const circleCenterY = cursorY; // Y-координата центра круга
    
        const enemyCenterX = enemy.x + enemy.width / 2; // X-координата центра врага
        const enemyCenterY = enemy.y + enemy.height / 2; // Y-координата центра врага
    
        // Рассчитываем расстояние между центром врага и центром круга
        const distance = Math.sqrt((enemyCenterX - circleCenterX) ** 2 + (enemyCenterY - circleCenterY) ** 2);
        light.x = cursorX;
        light.y = cursorY;
        light.animateLight(ctx);
        // Проверяем, находится ли враг в пределах радиуса отталкивания
        if (distance <= light.repulsionRadius) {
            // Рассчитываем вектор от центра круга к центру врага
            const repulsionVectorX = enemyCenterX - circleCenterX;
            const repulsionVectorY = enemyCenterY - circleCenterY;
    
            // Нормализуем вектор отталкивания
            const normalizedRepulsionVectorX = repulsionVectorX / distance;
            const normalizedRepulsionVectorY = repulsionVectorY / distance;
            
           
            // Применяем силу отталкивания с использованием анимации
            animateRepulsion(enemy, normalizedRepulsionVectorX, normalizedRepulsionVectorY, light.repulsionForce);
            
        }
    }
    
    function animateRepulsion(enemy, repulsionVectorX, repulsionVectorY, repulsionForce) {
        const animationFrames = 60; // Количество кадров анимации
        let currentFrame = 0;
    
        function animate() {
            if (currentFrame < animationFrames) {
                // Интерполируем позицию врага с использованием анимации
                enemy.x += (repulsionVectorX * repulsionForce) / animationFrames;
                enemy.y += (repulsionVectorY * repulsionForce) / animationFrames;
    
                currentFrame++;
                requestAnimationFrame(animate);
            }
        }
    
        animate();
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
                    score +=curDamage;
                    currentScore.innerHTML = score;
                    enemy = new EnemyFactory().createEnemy(enemies[Math.floor(Math.random() * enemies.length)]);
                }
                activeAbility="nothing";


                bullet.x += Math.cos(bullet.angle - Math.PI / 2) * bullet.speed;
                bullet.y += Math.sin(bullet.angle - Math.PI / 2) * bullet.speed;
            }
            else{
                var countedTime = 3000-bullet.fireTime + Date.now();
                curDamage = Math.ceil(countedTime/100)*10;
                currentDamage.innerHTML = curDamage;
            }
        }
        else{
            currentDamage.innerHTML = 'Shoot';
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
            
            sa = true;
            
        }
    });

    document.addEventListener("mousedown", function(event) {
        if (activeAbility === "shoot") {
            shoot(event);
        } else if (sa) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;
            secondAbility(mouseX, mouseY, enemy);
            sa = false;
        }
    });
    
    setInterval(() => {
        timeLeft--;
        timerValue.textContent = timeLeft + ' sec';
    
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Время вышло!");
        }
    }, 1000);

    updateGameArea();
});
