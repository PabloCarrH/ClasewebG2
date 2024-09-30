document.addEventListener('DOMContentLoaded', async function () {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error("ID no encontrado");
        window.location.href = 'login.html';
        return;
    }

    await fetchUserData(userId);
});

async function fetchUserData(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("userId", result.id);
            document.querySelector('.hola').textContent = `${result.name || ''}`
        } else {
            const errorResult = await response.json();
            console.error('Error al obtener datos del usuario:', errorResult.message);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorResult.message || 'No se pudo obtener los datos del usuario.',
                confirmButtonText: 'Aceptar',
            });
            // Redirigir si es necesario
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo conectar con el servidor',
            confirmButtonText: 'Aceptar',
        });
    }
}

function updateUserInfo(userData) {
    document.querySelector('.user-name p').textContent = `@${userData.username}`;
}
