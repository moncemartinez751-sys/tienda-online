// frontend/js/carrito.js

function agregarAlCarrito(productoId) {
    // Obtenemos el carrito actual desde localStorage o creamos uno nuevo si no existe
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Buscamos si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        // Si ya existe, incrementamos la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, lo agregamos con cantidad 1
        carrito.push({ id: productoId, cantidad: 1 });
    }

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Opcional: Mostrar una alerta o confirmación
    alert('¡Producto agregado al carrito!');
}