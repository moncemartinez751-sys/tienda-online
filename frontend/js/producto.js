document.addEventListener('DOMContentLoaded', function() {
    // 1. Leer el ID del producto desde la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');

    if (!productoId) {
        window.location.href = 'index.html'; // Si no hay ID, volver al inicio
        return;
    }

    // 2. Llamar al nuevo endpoint del backend
    const url = `http://localhost/tienda-online/backend/controllers/obtenerProducto.php?id=${productoId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('El producto no fue encontrado.');
            }
            return response.json();
        })
        .then(producto => {
            // 3. Mostrar los detalles del producto en la página
            const container = document.getElementById('producto-detalle-container');
            container.innerHTML = `
                <div class="detalle-card">
                    <img src="${producto.imagen_url}" alt="${producto.nombre}">
                    <div class="detalle-info">
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <strong class="precio">Precio: $${producto.precio}</strong>
                        <button class="btn-agregar">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            // ... dentro del .then del fetch en producto.js
        container.innerHTML = `...`; // Tu código existente

        // --- AÑADE ESTAS LÍNEAS ---
        const btnAgregar = container.querySelector('.btn-agregar');
            btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
});
// -------------------------
        })
        .catch(error => {
            const container = document.getElementById('producto-detalle-container');
            container.innerHTML = `<p>Error al cargar el producto. Por favor, intenta de nuevo.</p>`;
            console.error('Error:', error);
        });
});