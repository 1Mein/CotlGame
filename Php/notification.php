<?php
require_once('connection.php');
$username = "";

if (isset($_SESSION["username"])){
    $username = $_SESSION["username"];
}
else{
    return;
}

$user = $connection->query("SELECT * FROM leaderboard.users where username = '$username'");
$subscribe = $user->fetch_assoc();

$query = $connection->query("SELECT username,score FROM leaderboard.users order by score  desc limit 1");
if ($query !== false) {
    while ($row = $query->fetch_assoc()) {
        if($row["score"] > 1000 && $subscribe["subscribe"]){
            echo $row["username"]." reached more than 1000 points at ".$subscribe["date"];
        }
    }
}