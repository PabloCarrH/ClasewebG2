document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector("#login-form");
    if (!loginForm) {
        console.error("Formulario no encontrado");
        return;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok) {
                // Guardar el ID del usuario en localStorage
                localStorage.setItem("userId", result.id);

                // Mostrar el mensaje de bienvenida con el nombre del usuario
                await Swal.fire({
                    icon: 'success',
                    title: `Bienvenido(a) <br> -- ${result.name || ''} --`, 
                    showConfirmButton: false,
                    timer: 1500
                });

                // Redirigir según el tipo de usuario
                window.location.href = result.isProfessional ? 'dashboardPro.html' : 'dashboardPro.html';
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message || 'Usuario y/o contraseña incorrectos',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo conectar con el servidor',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});
