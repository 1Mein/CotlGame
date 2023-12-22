<?php
require_once('connection.php');
$query = $connection->query("SELECT username,score FROM leaderboard.users order by score  desc limit 10");
if ($query !== false) {
    while ($row = $query->fetch_assoc()) {
        echo "<tr><th>" . $row["username"] . "</th><th>" . $row["score"] . "</th></tr>";
    }
}
else{
    echo "Ошибка при выполнении запроса: " . $connection->error;
}

?>