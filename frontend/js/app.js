// Usamos este evento para asegurarnos de que el script se ejecute solo cuando
// todo el contenido de la página (el HTML) se haya cargado completamente.
document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN ---
    // URL del controlador PHP que nos devolverá los productos en formato JSON.
    // ¡IMPORTANTE! Asegúrate de que esta URL sea correcta para tu entorno XAMPP.
    const apiUrl = 'http://localhost/tienda-online/backend/controllers/productoController.php';

    // Obtenemos la referencia al contenedor donde mostraremos los productos.
    const productosContainer = document.getElementById('productos-container');
    
    // Verificamos si el contenedor de productos existe antes de hacer nada más.
    // Es una buena práctica para evitar errores si el ID en el HTML cambia.
    if (!productosContainer) {
        console.error("Error: No se encontró el elemento con id 'productos-container'.");
        return; // Detenemos la ejecución del script si no existe.
    }


    // --- FUNCIÓN PRINCIPAL PARA OBTENER Y MOSTRAR PRODUCTOS ---
    function cargarProductos() {
        // Usamos la API fetch para hacer una petición (una "llamada") a nuestra URL del backend.
        fetch(apiUrl)
            .then(response => {
                // El primer ".then" recibe la respuesta inicial del servidor.
                // Verificamos si la respuesta fue exitosa (códigos de estado 200-299).
                if (!response.ok) {
                    // Si la respuesta no es OK (ej: error 404 o 500), lanzamos un error
                    // para que sea capturado por el bloque .catch()
                    throw new Error('Error en la respuesta del servidor: ' + response.statusText);
                }
                // Si la respuesta es exitosa, la convertimos a formato JSON.
                // Esto también devuelve una promesa.
                return response.json();
            })
            .then(data => {
                // El segundo ".then" recibe los datos ya convertidos a JSON.
                // 'data' debería ser un array de objetos (nuestros productos).
                
                // Limpiamos el contenedor por si tenía contenido previo (un mensaje de "cargando", por ejemplo).
                productosContainer.innerHTML = '';

                if (data.length === 0) {
                    // Si el backend no devuelve productos, mostramos un mensaje amigable.
                    productosContainer.innerHTML = '<p>No se encontraron productos para mostrar en este momento.</p>';
                    return;
                }

                // Recorremos el array de productos con forEach.
                data.forEach(producto => {
                    // Por cada producto, creamos su HTML usando plantillas de texto (backticks ``).
                    // Esto hace que sea mucho más fácil y legible escribir HTML dentro de JavaScript.
                    const productoHTML = `
                        <div class="producto-card">
                            <img src="${producto.imagen_url || 'https://placehold.co/280x200/EEE/31343C?text=Producto'}" alt="${producto.nombre}" class="producto-img">
                            <div class="producto-info">
                                <h3 class="producto-nombre">${producto.nombre}</h3>
                                <p class="producto-precio">$${parseFloat(producto.precio).toFixed(2)}</p>
                                <button class="producto-btn" data-id="${producto.id}">Añadir al Carrito</button>
                            </div>
                        </div>
                    `;
                    
                    // Añadimos el HTML del nuevo producto al final del contenedor.
                    productosContainer.innerHTML += productoHTML;
                });
            })
            .catch(error => {
                // El bloque ".catch" se ejecuta si ocurre cualquier error en la cadena de promesas (fetch).
                // Puede ser un error de red, un error del servidor, o un error al procesar el JSON.
                console.error('Hubo un problema con la operación fetch:', error);
                
                // Mostramos un mensaje de error amigable en la página para el usuario.
                productosContainer.innerHTML = '<p class="error-msg">Lo sentimos, no se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.</p>';
            });
    }

    // --- EJECUCIÓN ---
    // Llamamos a la función para que todo el proceso comience.
    cargarProductos();

});
