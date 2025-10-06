<?php
// backend/controllers/productoController.php

header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Producto.php';

$database = new Database();
$db = $database->getConnection();

$producto = new Producto($db);

$stmt = $producto->getAll();
$num = $stmt->rowCount();

if ($num > 0) {
    $productos_arr = array();
    $productos_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $producto_item = array(
            "id" => $id,
            "nombre" => $nombre,
            "descripcion" => $descripcion,
            "precio" => $precio,
            "imagen_url" => $imagen_url
        );
        array_push($productos_arr["records"], $producto_item);
    }

    http_response_code(200);
    echo json_encode($productos_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No se encontraron productos."));
}
