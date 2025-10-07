<?php
// Iniciamos la sesión para poder acceder a la variable $_SESSION.
session_start();

// Establecemos que la respuesta será en formato JSON.
header('Content-Type: application/json');

// Verificamos si la sesión contiene un 'user_id'.
if (isset($_SESSION['user_id']) && isset($_SESSION['user_nombre'])) {
    // Si existe, significa que el usuario ha iniciado sesión.
    // Devolvemos un objeto JSON indicando el éxito y el nombre del usuario.
    echo json_encode([
        'loggedIn' => true,
        'nombre' => $_SESSION['user_nombre']
    ]);
} else {
    // Si no existe, el usuario no ha iniciado sesión.
    // Devolvemos un objeto JSON indicándolo.
    echo json_encode(['loggedIn' => false]);
}
