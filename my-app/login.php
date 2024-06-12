<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Validate.
if (isset($request->email) && isset($request->password)) {
    $email = mysqli_real_escape_string($conn, trim($request->email));
    $password = trim($request->password);

    $sql = "SELECT password FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $response = ['success' => true];
        } else {
            $response = ['success' => false, 'message' => 'Invalid password'];
        }
    } else {
        $response = ['success' => false, 'message' => 'No user found'];
    }
} else {
    $response = ['success' => false, 'message' => 'Invalid input'];
}

echo json_encode($response);
$conn->close();
?>
