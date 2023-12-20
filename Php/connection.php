<?php 
$connection = new mysqli('localhost', 'root', '2156513', 'serverdb');

if ($connection -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
}
?>