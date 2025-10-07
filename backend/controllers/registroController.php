<?php
require_once '../config/database.php'; // Tu conexión a la BD

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Validación simple
if (empty($data['nombre']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

$nombre = $data['nombre'];
$email = $data['email'];
// ¡NUNCA guardes contraseñas en texto plano! Usa password_hash.
$password = password_hash($data['password'], PASSWORD_BCRYPT);

try {
    $database = new Database();
    $db = $database->getConnection();

    // Verificar si el email ya existe
    $query = "SELECT id FROM usuarios WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'El correo electrónico ya está registrado.']);
        exit;
    }

    // Insertar nuevo usuario
    $query = "INSERT INTO usuarios (nombre, email, password) VALUES (:nombre, :email, :password)";
    $stmt = $db->prepare($query);

    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Usuario registrado con éxito.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al registrar el usuario.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error de base de datos: ' . $e->getMessage()]);
}
