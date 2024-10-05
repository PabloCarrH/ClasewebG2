document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.querySelector('#reset-form');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
        document.querySelector('#token').value = token;
    } else {
        document.getElementById('message').innerText = 'Token no válido.';
        return;
    }

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.querySelector('#new-password').value;

        try {
            const response = await fetch('http://localhost:3000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                document.getElementById('message').innerText = 'Contraseña restablecida exitosamente.';
            } else {
                document.getElementById('message').innerText = result.message;
            }
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            document.getElementById('message').innerText = 'Error al conectar con el servidor.';
        }
    });
});
