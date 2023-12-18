document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const currentDamage = document.querySelector(".current-damage");

    var onAir = false;

    const hero = {
        x: canvas.width / 2 - 25,
        y: canvas.height - 50,
        width: 50,
        height: 50,
    };

    const heroImage = new Image();
    heroImage.src = 'images/kotl.jpg'; // Укажите путь к изображению вашего героя

    var bullet = {
        x: -1,
        y: -1,
        width: 0,
        height: 0,
        angle: 0,
        speed: 0,
        isFired: false,
        fireTime: 0,
    };

    function drawHero() {
        ctx.drawImage(heroImage, hero.x, hero.y, hero.width, hero.height);
    }

    function drawBullet() {
        if(!bullet.isFired) return;

        ctx.fillStyle = "#FFF";

        ctx.save();
        ctx.translate(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2);
        ctx.rotate(bullet.angle + Math.PI / 2); // Добавляем 90 градусов к углу
        ctx.fillRect(-bullet.width / 2, -bullet.height / 2, bullet.width, bullet.height);
        ctx.restore();
    }

    function shoot(event) {
        if(onAir) return;
        if(bullet.isFired){
            bullet.fireTime -=3000;
            return;
        }
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        const bulletSpeed = 10;
        const bulletWidth = 90; // Увеличим размер снарядов
        const bulletHeight = 10;

        const angle = Math.atan2(mouseY - hero.y, mouseX - (hero.x + hero.width / 2));
        
        setTimeout(() => {
            
            bullet.x = hero.x + hero.width / 2 - bulletWidth / 2;
            bullet.y = hero.y;
            bullet.width= bulletWidth;
            bullet.height= bulletHeight;
            bullet.angle= angle;
            bullet.speed= bulletSpeed;

            if(!bullet.isFired) {
                bullet.fireTime = Date.now() + 3000;
                bullet.isFired = true;
            }
        }, 10); 

    }

    function updateGameArea() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHero();
        drawBullet();

        
        if (bullet.isFired) {
            if (bullet.fireTime <= Date.now()) {
                onAir = true;
                bullet.x += Math.cos(bullet.angle) * bullet.speed;
                bullet.y += Math.sin(bullet.angle) * bullet.speed;

                if (bullet.y < 0 || bullet.x < 0 || bullet.x > canvas.width || bullet.y > canvas.height) {
                    bullet.isFired = false;
                    onAir = false;
                }
            }
            else{
                currentDamage.innerHTML = (Math.ceil((3000-(bullet.fireTime - Date.now()))/10)/10)*10;
            }
        }
        

        requestAnimationFrame(updateGameArea);
    }

    document.addEventListener("mousedown", shoot);

    updateGameArea();
});
