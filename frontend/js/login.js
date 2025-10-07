// Esperamos a que todo el contenido de la página se haya cargado.
document.addEventListener('DOMContentLoaded', function() {

    // 1. SELECCIONAR EL FORMULARIO DE LOGIN
    const loginForm = document.getElementById('login-form');

    // 2. ESCUCHAR EL EVENTO 'SUBMIT'
    loginForm.addEventListener('submit', function(event) {
        
        // 3. PREVENIR LA RECARGA DE LA PÁGINA
        event.preventDefault();

        // 4. CAPTURAR LOS DATOS DEL FORMULARIO
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        // 5. ENVIAR LOS DATOS AL BACKEND
        // La URL ahora apunta al controlador de login.
        fetch('../backend/controllers/loginController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            // 6. MANEJAR LA RESPUESTA DEL SERVIDOR
            // Mostramos el mensaje (ej: "Inicio de sesión exitoso" o "Contraseña incorrecta").
            alert(result.message);

            // Si el login fue exitoso, redirigimos a la página principal de la tienda.
            if (result.success) {
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            // 7. MANEJAR ERRORES DE CONEXIÓN
            console.error('Error en la petición:', error);
            alert('Ocurrió un error de conexión al intentar iniciar sesión.');
        });
    });
});
