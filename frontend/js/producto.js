// frontend/js/producto.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Leer el ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');

    if (!productoId) {
        // Si no hay ID, no hace nada o redirige
        console.error("No se proporcionó un ID de producto.");
        document.getElementById('producto-detalle-container').innerHTML = "<p>Producto no especificado.</p>";
        return;
    }

    // 2. Llamar al endpoint del backend para obtener ese producto
    const url = `http://localhost/tienda-online/backend/controllers/obtenerProducto.php?id=${productoId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta del servidor no fue OK');
            }
            return response.json();
        })
        .then(producto => {
            // 3. Mostrar los detalles del producto en la página
            const container = document.getElementById('producto-detalle-container');
            if (producto.message) { // Si el backend devuelve un mensaje de error (ej. "producto no existe")
                container.innerHTML = `<p>${producto.message}</p>`;
                return;
            }
            
            container.innerHTML = `
                <div class="detalle-card">
                    <img src="${producto.imagen_url}" alt="${producto.nombre}">
                    <div class="detalle-info">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <strong class="precio">Precio: $${producto.precio}</strong>
                        <button class="btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            
            // Añadir funcionalidad al botón recién creado
            const btnAgregar = container.querySelector('.btn-agregar');
            btnAgregar.addEventListener('click', () => {
                // Asumimos que la función agregarAlCarrito está en carrito.js
                // y que carrito.js está incluido en producto.html
                agregarAlCarrito(producto.id);
            });
        })
        .catch(error => {
            const container = document.getElementById('producto-detalle-container');
            container.innerHTML = `<p>Error al cargar el producto. Por favor, intenta de nuevo.</p>`;
            console.error('Error en el fetch:', error);
        });
});