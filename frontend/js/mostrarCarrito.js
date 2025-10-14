// frontend/js/mostrarCarrito.js

document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const carritoTotalContainer = document.getElementById('carrito-total');
    
    // Función central para dibujar el carrito
    function renderizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoContainer.innerHTML = ''; // Limpiamos la vista para redibujar
        
        if (carrito.length === 0) {
            carritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            carritoTotalContainer.innerHTML = '';
            return;
        }

        let total = 0;
        let productosCargados = 0;

        carrito.forEach(item => {
            fetch(`http://localhost/tienda-online/backend/controllers/obtenerProducto.php?id=${item.id}`)
                .then(response => response.json())
                .then(producto => {
                    const subtotal = producto.precio * item.cantidad;
                    total += subtotal;

                    // Creamos el HTML para cada item, ahora con inputs y botones
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('carrito-item');
                    itemDiv.innerHTML = `
                        <img src="${producto.imagen_url}" alt="${producto.nombre}">
                        <div class="item-info">
                            <h4>${producto.nombre}</h4>
                            <p>Precio: $${producto.precio}</p>
                            <div class="item-cantidad">
                                <label>Cantidad:</label>
                                <input type="number" class="cantidad-input" value="${item.cantidad}" min="1" data-id="${item.id}">
                            </div>
                        </div>
                        <div class="item-subtotal">
                            <p>Subtotal: $${subtotal.toFixed(2)}</p>
                            <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
                        </div>
                    `;
                    carritoContainer.appendChild(itemDiv);

                    productosCargados++;
                    if (productosCargados === carrito.length) {
                        carritoTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
                    }
                });
        });
    }

    // --- MANEJADORES DE EVENTOS ---

    // Escuchamos clics dentro del contenedor principal del carrito
    carritoContainer.addEventListener('click', (e) => {
        // Si el clic fue en un botón de eliminar
        if (e.target.classList.contains('btn-eliminar')) {
            const productoId = e.target.getAttribute('data-id');
            eliminarDelCarrito(productoId);
            renderizarCarrito(); // Volvemos a dibujar el carrito para reflejar el cambio
        }
    });

    // Escuchamos cambios en los inputs de cantidad
    carritoContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('cantidad-input')) {
            const productoId = e.target.getAttribute('data-id');
            const nuevaCantidad = parseInt(e.target.value);
            actualizarCantidad(productoId, nuevaCantidad);
            renderizarCarrito(); // Volvemos a dibujar para actualizar el total y subtotal
        }
    });

    // Llamada inicial para dibujar el carrito al cargar la página
    renderizarCarrito();
});