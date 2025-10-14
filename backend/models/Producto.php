<?php
// backend/models/Producto.php

class Producto
{
    private $conn;
    private $table_name = "productos";

    // Propiedades del objeto
    public $id; // <-- AÑADE ESTA LÍNEA
    public $nombre;
    public $descripcion;
    public $precio;
    public $imagen_url;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Método para obtener todos los productos (ya lo tienes)
    public function getAll()
    {
        // ... tu código existente ...
    }

    // --- AÑADE ESTE NUEVO MÉTODO ---
    public function getOne()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Asignamos los valores a las propiedades del objeto
        if ($row) {
            $this->nombre = $row['nombre'];
            $this->descripcion = $row['descripcion'];
            $this->precio = $row['precio'];
            $this->imagen_url = $row['imagen_url'];
        }
    }
    // ---------------------------------
}
