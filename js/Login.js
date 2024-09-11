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

        // Obtener usuarios profesionales y clientes
        const professionalUsers = JSON.parse(localStorage.getItem('users')) || [];
        const clientUsers = JSON.parse(localStorage.getItem('clients')) || [];

        // Buscar en la lista de profesionales
        const validProfessional = professionalUsers.find(user => user.email === email && user.password === password);
        // Buscar en la lista de clientes
        const validClient = clientUsers.find(user => user.email === email && user.password === password);

        // Si el usuario es un profesional
        if (validProfessional) {
            await Swal.fire({
                icon: 'success',
                title: `Bienvenido(a) ${validProfessional.name}`,
                showConfirmButton: false,
                timer: 1500
            });

            window.location.href = 'dashboardPro.html';
        }
        // Si el usuario es un cliente
        else if (validClient) {
            await Swal.fire({
                icon: 'success',
                title: `Bienvenido(a) ${validClient.name}`,
                showConfirmButton: false,
                timer: 1500
            });

            window.location.href = 'cliente.html';
        }
        // Si no se encuentra un usuario válido
        else {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario y/o contraseña incorrectos',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});
