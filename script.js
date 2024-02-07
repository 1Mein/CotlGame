import { Enemy } from "/Objects/Enemies/BaseEnemy.js"
import {Hero} from "/Objects/Default/Hero.js"
import {BlindingLight} from "/Objects/Default/BlindingLight.js"
import {Bullet} from "/Objects/Default/Bullet.js"
import { EnemyFactory } from "./Objects/Enemies/EnemyFactory.js";
import { Button } from "./Objects/Default/Button.js";
import {Abilities} from "./Objects/Default/Abilities.js";

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
    let buttons = new Button();
    const abilties = new Abilities();

    //visuals
    const currentDamage = document.querySelector(".current-damage");
    const currentScore = document.querySelector(".current-score");
    const timerValue = document.querySelector(".timer");
  
    //variables
    let score = 0;
    let curDamage = 0;
    let sa = false;
    let gameStarted = false;
    let gameEnded = false;
    let timer;
    let mouseX, mouseY;

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

    let activeAbility = "nothing"; // default is nothing active

    function shoot(event) {
        if (activeAbility === "nothing") {
           
        } 
        else if(activeAbility === "charging"){
            bullet.fireTime -=3000;
            // console.log(bullet.lastTimeUsed);
            // console.log("////");
            
            bullet.lastTimeUsed = new Date().getTime();
            
            
            return; 
        }
        else if (activeAbility === "shoot" && bullet.isAbilityReady()) {
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

        if(light.isAbilityReady()){
        const circleCenterX = cursorX; // X-координата центра круга
        const circleCenterY = cursorY; // Y-координата центра круга
    
        const enemyCenterX = enemy.x + enemy.width / 2;
        const enemyCenterY = enemy.y + enemy.height / 2;
        const distance = Math.sqrt((enemyCenterX - circleCenterX) ** 2 + (enemyCenterY - circleCenterY) ** 2);
        light.x = cursorX;
        light.y = cursorY;
        light.animateLight(ctx);

        if (distance <= light.repulsionRadius) {
            const repulsionVectorX = enemyCenterX - circleCenterX;
            const repulsionVectorY = enemyCenterY - circleCenterY;
    
            const normalizedRepulsionVectorX = repulsionVectorX / distance;
            const normalizedRepulsionVectorY = repulsionVectorY / distance;
            
            animateRepulsion(enemy, normalizedRepulsionVectorX, normalizedRepulsionVectorY, light.repulsionForce);
            
        }}
    }
    
    function animateRepulsion(enemy, repulsionVectorX, repulsionVectorY, repulsionForce) {
        const animationFrames = 60;
        let currentFrame = 0;
    
        function animate() {
            if (currentFrame < animationFrames) {
                enemy.x += (repulsionVectorX * repulsionForce) / animationFrames;
                enemy.y += (repulsionVectorY * repulsionForce) / animationFrames;
    
                currentFrame++;
                requestAnimationFrame(animate);
            }
        }
    
        animate();
    }
    
    


    function updateGameArea() {
        if(!gameStarted){
            buttons.createStartButton(ctx);
            requestAnimationFrame(updateGameArea);
            return;
        }   
        else if(gameStarted && gameEnded){
            buttons.createLabel(ctx,score);
            buttons.createRestartButton(ctx);            
            requestAnimationFrame(updateGameArea);
            return;
        }

        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        abilties.firstSpell(ctx,false);
        abilties.secondSpell(ctx);
        hero.drawHero(ctx);
        enemy.drawEnemy(ctx);
        bullet.drawBullet(ctx);
        if(sa && mouseX !== undefined && mouseY !== undefined){
            light.drawRange(ctx,mouseX,mouseY); 
        }
        else if(activeAbility === "shoot" && mouseX !== undefined && mouseY !== undefined){
            bullet.drawRange(ctx,hero.x + hero.width/2,hero.y,mouseX,mouseY);
        }
        

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
                abilties.firstSpell(ctx,false);
            }
            else{
                abilties.firstSpell(ctx,true);
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
        if(!gameStarted || (gameStarted && gameEnded)){
            return;
        }

        
        if (event.key === "Escape") {
            activeAbility = "nothing";
            sa = false;
        }
        else if (event.code === "KeyQ" && activeAbility === "nothing") {
            activeAbility = "shoot"; 
            sa = false;
        }
        else if (event.code === "KeyQ" && activeAbility === "charging" ){
            shoot(event);
            sa = false;
        }
        else if (event.code === "KeyW") {
            if(activeAbility === "shoot"){
                activeAbility = "nothing";
            }
            sa = true;
        }
    });

    document.addEventListener("mousedown", function(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if(!gameStarted || (gameStarted && gameEnded)){
            if(buttons.isButtonClicked(mouseX,mouseY)){
                gameStarted = true;
                gameEnded = false;

                enemy = new EnemyFactory().createEnemy(enemies[Math.floor(Math.random() * enemies.length)]);
                score = 0;
                curDamage = 0;
                currentScore.innerHTML = 0;
                bullet.isFired = false;
                sa = false;
                timerValue.innerHTML = 60;

                startTimer(60);
            }
            return;
        }

        if (activeAbility === "shoot") {
            shoot(event);
        } else if (sa) {
            secondAbility(mouseX, mouseY, enemy);
            sa = false;
        }

        
        let pressed = abilties.clickedSpell(mouseX,mouseY);
        if(!pressed){
            return;
        }
        else if (pressed === "KeyQ" && activeAbility === "nothing") {
            activeAbility = "shoot"; 
            sa = false;
        }
        else if (pressed === "KeyQ" && activeAbility === "charging" ){
            shoot(event);
            sa = false;
        }
        else if (pressed === "KeyW") {
            if(activeAbility === "shoot"){
                activeAbility = "nothing";
            }
            sa = true;
        }
    });
    
    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX - canvas.getBoundingClientRect().left;
        mouseY = event.clientY - canvas.getBoundingClientRect().top;
    });
    

    function startTimer(duration) {
        let timeLeft = duration;
        timer = setInterval(() => {
            timeLeft--;
            timerValue.textContent = timeLeft + ' sec';

            if (timeLeft <= 0) {
                clearInterval(timer);
                sendResults();
                gameEnded = true;
            }
        }, 1000);
    }

    function sendResults(){
        fetch('Php/saveResult.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'score=' + score
        })
    }

    updateGameArea();
});
