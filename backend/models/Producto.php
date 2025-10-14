<?php
// backend/models/Producto.php

class Producto
{
    private $conn;
    private $table_name = "productos";

    // Propiedades del objeto
    public $id;
    public $nombre;
    public $descripcion;
    public $precio;
    public $imagen_url;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Método para obtener todos los productos
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Método para obtener un solo producto por su ID
    public function getOne()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->nombre = $row['nombre'];
            $this->descripcion = $row['descripcion'];
            $this->precio = $row['precio'];
            $this->imagen_url = $row['imagen_url'];
        }
    }
}
