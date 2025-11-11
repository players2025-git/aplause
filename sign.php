<?php
// Database connection
$servername = "localhost";
$username = "root"; // your phpMyAdmin username
$password = ""; // your phpMyAdmin password (empty by default)
$dbname = "hospital"; // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get user inputs
$firstName = $_POST['first_name'];
$lastName = $_POST['last_name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = $_POST['password'];

// Check if email already exists
$check = $conn->prepare("SELECT * FROM users WHERE email = ?");
$check->bind_param("s", $email);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
  echo "Email already exists!";
  exit;
}

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $firstName, $lastName, $phone, $email, $password);

if ($stmt->execute()) {
  // Send success message back to JS
  echo "success";

  // Optional server-side redirect after few seconds (in case JS doesn’t handle it)
  header("Refresh: 5; url=login.php");
} else {
  echo "Error: " . $conn->error;
}

$stmt->close();
$conn->close();
