<?php
require_once('./connection.php');
$username  = $_POST["username"];
// echo $username;

$query = $connection->query("INSERT INTO users (username) VALUES('{$username}')");
header("Location:index.php?error=1&reg=1");