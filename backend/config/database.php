<?php
// backend/config/database.php

$host = 'localhost';
$db_name = 'tienda_db';
$username = 'root'; // Usuario por defecto en XAMPP
$password = '';     // Contraseña por defecto en XAMPP

try {
    $conn = new PDO("mysql:host={$host};dbname={$db_name}", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
