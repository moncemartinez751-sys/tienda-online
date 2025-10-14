// frontend/js/carrito.js

// Función para agregar un producto (ya la tienes)
function agregarAlCarrito(productoId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ id: productoId, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('¡Producto agregado al carrito!');
}

// --- NUEVA FUNCIÓN PARA ELIMINAR ---
function eliminarDelCarrito(productoId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Filtramos para quedarnos solo con los productos que NO tengan el ID a eliminar
    carrito = carrito.filter(item => String(item.id) !== String(productoId));
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// --- NUEVA FUNCIÓN PARA ACTUALIZAR CANTIDAD ---
function actualizarCantidad(productoId, nuevaCantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.find(item => String(item.id) === String(productoId));

    if (productoExistente) {
        if (nuevaCantidad > 0) {
            productoExistente.cantidad = nuevaCantidad;
        } else {
            // Si la nueva cantidad es 0 o menos, lo eliminamos
            carrito = carrito.filter(item => String(item.id) !== String(productoId));
        }
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}