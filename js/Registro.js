// Función para el registro de profesionales
async function registerProfessional() {
    const name = document.querySelector("#name-professional").value;
    const email = document.querySelector("#email-professional").value;
    const password = document.querySelector("#password-professional").value;

    try {
        const response = await fetch('http://localhost:3000/api/register/professional', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'El registro se ha completado correctamente',
                confirmButtonText: 'Ir a login'
            }).then(() => {
                window.location.href = 'login.html';
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

// Función para el registro de clientes
async function registerClient() {
    const name = document.querySelector("#name-client").value;
    const email = document.querySelector("#email-client").value;
    const password = document.querySelector("#password-client").value;

    try {
        const response = await fetch('http://localhost:3000/api/register/client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'El registro se ha completado correctamente',
                confirmButtonText: 'Ir a login'
            }).then(() => {
                window.location.href = 'login.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message || 'El cliente ya está registrado',
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
