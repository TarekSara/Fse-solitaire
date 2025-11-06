<?php
include 'Connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
if (!isset($_POST['name']) || !isset($_POST['score']) || empty($_POST['name'])) {
http_response_code(400);
echo "Invalid input";
exit;
}

$name = $_POST['name'];
$score = (int)$_POST['score'];

$minutes = rand(0, 59);
$seconds = rand(0, 59);
$duration ="00:". $minutes .":". $seconds;

$stmt = $conn->prepare("INSERT INTO leaderboard (name, score, duration) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $name, $score, $duration);

$stmt->execute();

$response=[];
$response["success"]= true;

echo json_encode($response);

$stmt->close();
$conn->close();
} else {
http_response_code(405);
echo "Method Not Allowed";
}
?>