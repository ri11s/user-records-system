<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'user_records';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];

    // جلب الحالة الحالية
    $stmt = $conn->prepare("SELECT status FROM users WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $currentStatus = $stmt->fetchColumn();

    // تبديل الحالة
    $newStatus = $currentStatus ? 0 : 1;

    $stmt = $conn->prepare("UPDATE users SET status = :status WHERE id = :id");
    $stmt->bindParam(':status', $newStatus);
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>