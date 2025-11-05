<?php
include 'connection.php';

$stmt= $conn->prepare("SELECT name, score, duration FROM leaderboard ORDER BY score DESC");
$stmt->execute();

$result= $stmt->get_result();

$leaderboard= [];
$rank= 1;

while($row = $result->fetch_assoc()){
    $row['rank']= $rank++;
    $leaderboard[]= $row;
}

header('Content-Type: application/json');
echo json_encode($leaderboard);

$stmt->close();
$conn->close();

?>