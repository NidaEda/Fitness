<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

// Get the postedmmm datjjjja.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Validate.kcdkkk
if (isset($request->email) && isset($request->password)) {
    $email = mysqli_real_escape_string($conn, trim($request->email));
    $password = password_hash(trim($request->password), PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        $response = ['success' => true];
    } else {
        $response = ['success' => false, 'message' => $conn->error];
    }
} else {
    $response = ['success' => false, 'message' => 'Invalid input'];
}

echo json_encode($response);
$conn->close();
