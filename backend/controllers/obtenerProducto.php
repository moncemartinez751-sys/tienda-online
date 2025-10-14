<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once __DIR__ . '/../config/database.php';
include_once __DIR__ . '/../models/Producto.php';

// Validamos que nos envíen el ID del producto
if (!isset($_GET['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Se requiere el ID del producto."));
    return;
}

$database = new Database();
$db = $database->getConnection();

$producto = new Producto($db);

// Asignamos el ID del producto a una propiedad del objeto
$producto->id = $_GET['id'];

// Intentamos obtener los detalles del producto
$producto->getOne();

if ($producto->nombre != null) {
    // Si el producto existe, creamos un array con sus datos
    $producto_arr = array(
        "id" =>  $producto->id,
        "nombre" => $producto->nombre,
        "descripcion" => $producto->descripcion,
        "precio" => $producto->precio,
        "imagen_url" => $producto->imagen_url
    );

    http_response_code(200); // OK
    echo json_encode($producto_arr);
} else {
    // Si el producto no se encontró
    http_response_code(404); // Not Found
    echo json_encode(array("message" => "El producto no existe."));
}
