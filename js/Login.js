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
        const Users = JSON.parse(localStorage.getItem('users')) || [];
        
        console.log('Usuarios:', Users); 

        const validUser = Users.find(user => user.email === email && user.password === password);
        if (!validUser) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario y/o contraseña incorrectos',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        await Swal.fire({
            icon: 'success',
            title: `Bienvenido(a) ${validUser.name}`,
            showConfirmButton: false,
            timer: 1500
        });

        window.location.href = 'dashboardPro.html';
    });
});
