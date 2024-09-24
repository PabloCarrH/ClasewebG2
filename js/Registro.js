// Función para el registro de profesionales
function registerProfessional() {
    const name = document.querySelector("#name-professional").value;
    const email = document.querySelector("#email-professional").value;
    const password = document.querySelector("#password-professional").value;

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegistered = Users.find(user => user.email === email);

    if (isUserRegistered) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario ya está registrado',
            confirmButtonText: 'OK'
        });
    }

    Users.push({ name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(Users));

    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'El registro se ha completado correctamente',
        confirmButtonText: 'Ir a login'
    }).then(() => {
        window.location.href = 'login.html';
    });
}

// Función para el registro de clientes
function registerClient() {
    const name = document.querySelector("#name-client").value;
    const email = document.querySelector("#email-client").value;
    const password = document.querySelector("#password-client").value;

    const Users = JSON.parse(localStorage.getItem('clients')) || [];
    const isUserRegistered = Users.find(user => user.email === email);

    if (isUserRegistered) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El cliente ya está registrado',
            confirmButtonText: 'OK'
        });
    }

    Users.push({ name: name, email: email, password: password });
    localStorage.setItem('clients', JSON.stringify(Users));

    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'El registro se ha completado correctamente',
        confirmButtonText: 'Ir a login'
    }).then(() => {
        window.location.href = 'login.html';
    });
}
