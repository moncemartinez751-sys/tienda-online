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

                card.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <strong>Precio: $${producto.precio}</strong>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error:', error));
});