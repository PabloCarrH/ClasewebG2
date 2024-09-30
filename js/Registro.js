async function registerUser(type) {
    let name, email, password;

    // Obtener los datos de acuerdo al tipo de formulario
    if (type === 'professional') {
        name = document.getElementById('name-professional').value;
        email = document.getElementById('email-professional').value;
        password = document.getElementById('password-professional').value;
    } else if (type === 'client') {
        name = document.getElementById('name-client').value;
        email = document.getElementById('email-client').value;
        password = document.getElementById('password-client').value;
    }

    // Crear el cuerpo de la solicitud
    const data = {
        name: name,
        email: email,
        password: password,
        userType: type // 'professional' o 'client'
    };

    try {
        const response = await fetch('http://localhost:3000/api/register/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            // Si el registro fue exitoso
            Swal.fire({
                title: 'Registro exitoso',
                text: 'Has sido registrado con éxito',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            // Si ocurrió un error
            const result = await response.json();
            Swal.fire({
                title: 'Error en el registro',
                text: result.message || 'Hubo un problema al registrar el usuario',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        // Capturar errores de red u otros
        Swal.fire({
            title: 'Error en el registro',
            text: 'Hubo un error en la conexión con el servidor',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('Error:', error);
    }
}
