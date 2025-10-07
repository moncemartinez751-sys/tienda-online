<?php
// Iniciamos la sesión para poder manipularla.
session_start();

// 1. Desvinculamos todas las variables de la sesión.
$_SESSION = array();

// 2. Destruimos la sesión completamente.
session_destroy();

// 3. Redirigimos al usuario a la página principal.
// La ruta '../..' sube dos niveles (de 'controllers' a 'backend', y de 'backend' a la raíz)
// para luego entrar a 'frontend/index.html'.
header('Location: ../../frontend/index.html');
exit; // Es una buena práctica llamar a exit() después de una redirección.
