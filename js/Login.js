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

            // Verificar la respuesta en la consola
            console.log(result);

            if (response.ok) {
                // Guardar el ID del usuario y su tipo en localStorage
                localStorage.setItem("userId", result.id);
                localStorage.setItem("userType", result.isProfessional ? 'professional' : 'client');
                
                console.log(result.id, result.isProfessional);

                // Mostrar el mensaje de bienvenida con el nombre del usuario
                await Swal.fire({
                    icon: 'success',
                    title: `Bienvenido(a) <br> -- ${result.name || 'Sin Nombre'} --`, 
                    showConfirmButton: false,
                    timer: 1500
                });

                    window.location.href = 'dashboardPro.html';


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
