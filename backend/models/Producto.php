<?php
// backend/models/Producto.php

class Producto
{
    private $conn;
    private $table_name = "productos";

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
}
