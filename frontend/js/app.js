document.addEventListener('DOMContentLoaded', function() {
    // La URL de tu controlador en el backend
    const url = 'http://localhost/tienda-online/backend/controllers/productoController.php';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productos-container');
            data.records.forEach(producto => {
                const card = document.createElement('div');
                card.classList.add('producto-card');

                // ... dentro de tu fetch, en el forEach ...

// Hacemos que toda la tarjeta sea un enlace
card.innerHTML = `
    <a href="producto.html?id=${producto.id}" class="producto-link">
        <img src="${producto.imagen_url}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <strong>Precio: $${producto.precio}</strong>
    </a>
`;
container.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
});