// Esperamos a que todo el HTML de la página se cargue.
document.addEventListener('DOMContentLoaded', function() {

    // 1. VERIFICAR EL ESTADO DE LA SESIÓN AL CARGAR LA PÁGINA
    // Hacemos una petición al backend para saber si hay un usuario conectado.
    fetch('../backend/controllers/sessionController.php')
        .then(response => response.json())
        .then(data => {
            // `data` es la respuesta de nuestro PHP, ej: { loggedIn: true, nombre: 'Ana' }
            
            // Seleccionamos los contenedores de la barra de navegación.
            const navLoggedOut = document.getElementById('nav-logged-out');
            const navLoggedIn = document.getElementById('nav-logged-in');
            
            if (data.loggedIn) {
                // Si el usuario SÍ ha iniciado sesión:
                
                // Ocultamos los botones de "Iniciar Sesión" y "Registrarse".
                navLoggedOut.style.display = 'none';
                
                // Mostramos el saludo y el botón de "Cerrar Sesión".
                navLoggedIn.style.display = 'flex';
                
                // Personalizamos el saludo con el nombre del usuario.
                document.getElementById('user-greeting').textContent = `Hola, ${data.nombre}`;
                
            } else {
                // Si el usuario NO ha iniciado sesión:
                
                // Nos aseguramos de que los botones de "Iniciar Sesión" estén visibles.
                navLoggedOut.style.display = 'flex';
                
                // Y de que la sección de saludo esté oculta.
                navLoggedIn.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error al verificar la sesión:', error);
            // En caso de error, dejamos la vista por defecto (desconectado).
        });
});
