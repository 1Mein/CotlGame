<?php
require_once('connection.php');
$username = "";

if (isset($_SESSION["username"])){
    $username = $_SESSION["username"];
}
else{
    return;
}

$user = $connection->query("SELECT * FROM users where username = '$username'");
$subscribe = $user->fetch_assoc();
$query = $connection->query("SELECT * FROM users order by score desc limit 1");
if ($query !== false) {
    while ($row = $query->fetch_assoc()) {
        if($row["score"] > 800 && $subscribe["subscribe"]){
            echo $row["username"]." reached more than 1000 points at ".$row["date"];
        }
    }
}