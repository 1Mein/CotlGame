<?php
session_start();
require_once('./connection.php');
$username = "";
if (isset($_SESSION["username"])){
    $username = $_SESSION["username"];
}

if(isset($_POST["subscribe"])){
    $query = $connection->query("UPDATE users SET subscribe = true WHERE username = '{$username}'");
}
else{
    $query = $connection->query("UPDATE users SET subscribe = false WHERE username = '{$username}'");
}
header("Location:../index.php");