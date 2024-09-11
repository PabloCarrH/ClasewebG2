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
        return alert('El usuario ya está registrado')
    }

    Users.push({ name:name, email:email, password:password, date:date, celular:celular })
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso')
    window.location.href= 'login.html'
})
