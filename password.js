document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.querySelector("#forgot-password-form");

    if (recoveryForm) {
        recoveryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.querySelector("#recovery-email").value;

            try {
                const response = await fetch('http://localhost:3000/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                const result = await response.json();

                const messageDiv = document.getElementById("message");
                messageDiv.style.display = "block"; // Muestra el mensaje

                if (response.ok) {
                    messageDiv.style.color = "green"; // Mensaje de éxito
                    messageDiv.textContent = "Correo enviado con éxito. Por favor, revisa tu bandeja de entrada.";
                } else {
                    messageDiv.style.color = "red"; // Mensaje de error
                    messageDiv.textContent = result.message || "Hubo un problema al enviar el correo.";
                }
            } catch (error) {
                console.error('Error en la solicitud de recuperación:', error);
                const messageDiv = document.getElementById("message");
                messageDiv.style.display = "block"; // Muestra el mensaje
                messageDiv.style.color = "red"; // Mensaje de error
                messageDiv.textContent = "No se pudo conectar con el servidor.";
            }
        });
    }
});
