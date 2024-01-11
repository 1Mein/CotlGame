<?php
session_start();
require_once('./connection.php');
$username = "";
if (isset($_POST["username"])){
    $_SESSION["username"] = $_POST["username"];
    $username = $_POST["username"];
}

$query = $connection->query("SELECT username FROM users where username = '$username'");
if($query->num_rows==0){
    $query = $connection->query("INSERT INTO users (username) VALUES('{$username}')");
}
header("Location:../index.php");