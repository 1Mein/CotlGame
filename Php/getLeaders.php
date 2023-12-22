<?php
require_once('connection.php');
$query = $connection->query("SELECT username,score FROM leaderboard.users");
if ($query !== false) {
    while ($row = $query->fetch_assoc()) {
        echo "<tr><th>" . $row["username"] . "</th><th>" . $row["score"] . "</th></tr>";
    }
}
else{
    echo "Ошибка при выполнении запроса: " . $connection->error;
}

?>