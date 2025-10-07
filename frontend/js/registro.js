// Esperamos a que todo el contenido de la página (el HTML) se haya cargado completamente.
document.addEventListener('DOMContentLoaded', function() {

    // 1. SELECCIONAR EL FORMULARIO
    // Buscamos el formulario en el HTML por su 'id'. Todo lo que hagamos ocurrirá dentro de este formulario.
    const registroForm = document.getElementById('registro-form');

    // 2. AÑADIR UN "ESCUCHADOR" DE EVENTOS
    // Le decimos al formulario que esté atento al evento 'submit'.
    // Este evento se dispara cuando el usuario hace clic en el botón de tipo 'submit' (nuestro botón "Registrarse").
    registroForm.addEventListener('submit', function(event) {
        
        // 3. PREVENIR EL COMPORTAMIENTO POR DEFECTO
        // Por defecto, un formulario recarga la página al enviarse.
        // `event.preventDefault()` detiene esa recarga, permitiéndonos manejar todo con JavaScript.
        event.preventDefault();

        // 4. CAPTURAR LOS DATOS DEL FORMULARIO
        // `FormData` es una forma moderna y fácil de recolectar todos los datos de los campos (input) del formulario.
        const formData = new FormData(registroForm);
        
        // Convertimos los datos del formulario a un objeto simple de JavaScript (clave: valor), que es más fácil de manejar.
        const data = Object.fromEntries(formData.entries());

        // 5. ENVIAR LOS DATOS AL BACKEND (PHP)
        // Usamos la función `fetch` para enviar una petición POST a nuestro script de PHP.
        // `fetch` es el "mensajero" que lleva los datos de registro al servidor.
        fetch('../backend/controllers/registroController.php', {
            method: 'POST', // Usamos el método POST porque estamos enviando datos para crear un nuevo recurso (un usuario).
            headers: {
                // Le decimos al servidor que los datos que estamos enviando están en formato JSON.
                'Content-Type': 'application/json'
            },
            // Convertimos nuestro objeto de datos JavaScript a una cadena de texto en formato JSON.
            // El 'body' es el contenido del mensaje que enviamos.
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Esperamos la respuesta del servidor y la convertimos de JSON a un objeto JavaScript.
        .then(result => {
            // 6. MANEJAR LA RESPUESTA DEL SERVIDOR
            // `result` es el objeto que nos devolvió PHP (ej: { success: true, message: "Usuario registrado..." }).
            
            // Mostramos el mensaje que nos envió el servidor (sea de éxito o de error) en una alerta simple.
            alert(result.message);

            // Si el registro fue exitoso (`success` es true), redirigimos al usuario a la página de login.
            if (result.success) {
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            // 7. MANEJAR ERRORES DE CONEXIÓN
            // Si hay un problema con la petición (ej: el servidor no responde, la URL está mal), este bloque se ejecutará.
            console.error('Error en la petición:', error);
            alert('Ocurrió un error de conexión. Por favor, intenta de nuevo.');
        });
    });
});
