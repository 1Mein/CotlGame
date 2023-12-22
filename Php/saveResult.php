<?php
session_start();
require_once('connection.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(!isset($_POST['score']) || !isset($_SESSION["username"])){
        return;
    }
    $score = $_POST['score'];
    $username = $_SESSION["username"];

    $query = $connection->query("UPDATE leaderboard.users SET score = {$score},date = NOW() WHERE username = '{$username}'");
}
?>