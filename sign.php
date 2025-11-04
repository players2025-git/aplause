<?php
include 'db_conn.php';

$first = $_POST['first_name'];
$last = $_POST['last_name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$pass = password_hash($_POST['password'], PASSWORD_BCRYPT);

// Check if email already exists
$check = $conn->prepare("SELECT * FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
  echo "Email already exists!";
  exit();
}

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $first, $last, $phone, $email, $pass);

if ($stmt->execute()) {
  echo "success";
} else {
  echo "Error saving user!";
}

$stmt->close();
$conn->close();
