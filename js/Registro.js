// Función genérica para el registro
async function registerUser(type) {
    const name = document.querySelector(`#name-${type}`).value;
    const email = document.querySelector(`#email-${type}`).value;
    const password = document.querySelector(`#password-${type}`).value;

    try {
        const response = await fetch(`http://localhost:3000/api/register/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, userType: type })
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'El registro se ha completado correctamente',
                confirmButtonText: 'Ir a login'
            }).then(() => {
                window.location.href = 'dashboardPro.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message || 'El usuario ya está registrado',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo conectar con el servidor',
            confirmButtonText: 'Aceptar'
        });
    }
}
