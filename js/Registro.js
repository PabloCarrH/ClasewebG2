const registerForm = document.querySelector("#professional-form")
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const name = document.querySelector("#name-professional").value
    const email = document.querySelector("#email-professional").value
    const password = document.querySelector("#password-professional").value
    const date = document.querySelector("#dob-professional").value
    const celular = document.querySelector("#phone-professional").value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    
    if (isUserRegistered) {
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario ya está registrado',
            confirmButtonText: 'OK'
        });
    }

    Users.push({ name:name, email:email, password:password, date:date, celular:celular })
    localStorage.setItem('users', JSON.stringify(Users))
    
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'El registro se ha completado correctamente',
        confirmButtonText: 'Ir a login'
    }).then(() => {
        window.location.href = 'login.html';
    });
})

const clientForm = document.querySelector("#client-form form");
clientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.querySelector("#name-client").value;
    const email = document.querySelector("#email-client").value;
    const password = document.querySelector("#password-client").value;
    const date = document.querySelector("#dob-client").value;
    const celular = document.querySelector("#phone-client").value;

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

    Users.push({ name: name, email: email, password: password, date: date, celular: celular });
    localStorage.setItem('clients', JSON.stringify(Users));
    
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'El registro se ha completado correctamente',
        confirmButtonText: 'Ir a login'
    }).then(() => {
        window.location.href = 'login.html';
    });
});

