<?php 
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Your Mini Game</title>
</head>
<body>
    <div class="tv-container">
        <div>
            <div class="info-wrapper">
                <div class="current-damage-wrapper">
                    <p class="current-damage-text">Current damage:</p>
                    <p class="current-damage">Shoot</p>
                </div>
                <div class="timer-wrapper">
                    <p class="timer-text">Time left</p>
                    <p class="timer">60 sec</p>
                </div>
                <div class="current-score-wrapper">
                    <p class="current-score-text">Current score:</p>
                    <p class="current-score">0</p>
                </div>
            </div>

            <div class="game-screen">
                <canvas id="gameCanvas" width="600" height="600"></canvas>
            </div>


        </div>
        <div>
            <div class="username">
                <p>Your username: <?php 
                if(isset($_SESSION["username"]))
                {
                    echo $_SESSION["username"];
                }
                else{
                    echo "";
                }?></p>
            </div>
            <form action="Php/setUser.php" class="username-set" method="post">
                <input type="text" name="username">
                <button type="submit" class="username-set-button">set</button>
            </form>
            <form action="Php/setSubscribe.php" method="post">
                <label for="subscribe" class="notify-text">Notify leader changes</label>
                <input type="checkbox" name="subscribe" class="subscribe" id = "subscribe">
                <button type="submit">Set</button>
            </form>
            <p class="notify">Notify: <?php include('Php/notification.php') ?></p>
            <div class="control-panel">
                <div class="table-container">
                    <table id="results-table">
                        <thead>
                            <tr>
                                <th colspan="3">Scores</th>
                            </tr>
                            <tr>
                                <th>Игрок</th>
                            
                                <th>Очки</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                include('Php/getLeaders.php');
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- <script src="your-game-script.js"></script> -->
    <script type="module" src="script.js"></script>
    <!-- <script type="module" src="Objects/GlobalVariables.js"></script> -->
</body>
</html>