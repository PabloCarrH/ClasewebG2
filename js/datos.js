document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');  // Obtener el ID del usuario desde el localStorage

    if (!userId) {
        console.error('Usuario no está autenticado');
        return;
    }

    try {
        // Hacer la petición para obtener la información del usuario
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const result = await response.json();

        if (response.ok) {
            // Llenar la sección "Sobre Mí" con la información obtenida
            const aboutSection = document.querySelector('.about-section');
            const user_name = document.querySelector('.user-name')
            const userType = result.userType;
            const userData = result.userData;
            let namesections=`
                <strong >${userData.name}</strong>
                <p>@${userData.name}</p>`
            ;
            let aboutHtml = `
                <h3>Sobre Mí</h3>
                <p><strong>Nombre:</strong> ${userData.name}</p>
                <p><strong>Correo Electrónico:</strong> ${userData.email}</p>
            `;

            if (userType === 'professional') {
                // Mostrar la información específica para profesionales
                aboutHtml += `
                    <p><strong>Teléfono:</strong> ${userData.celular}</p>
                    <p><strong>Dirección:</strong> ${userData.direccion}</p>
                    <p><strong>Servicio:</strong> ${userData.servicio}</p>
                    <p><strong>Descripción del Servicio:</strong> ${userData.descripcionserv}</p>
                    <p><strong>Experiencia:</strong> ${userData.experiencia}</p>
                    <p><strong>Certificaciones:</strong> ${userData.certificaciones}</p>
                    <p><strong>Tarifa:</strong> ${userData.tarifa}</p>
                    <p><strong>Disponibilidad:</strong> ${userData.disponibilidad}</p>
                `;
            } else if (userType === 'client') {
                // Mostrar la información específica para clientes
                aboutHtml += `
                    <p><strong>Teléfono:</strong> ${userData.celular}</p>
                    <p><strong>Dirección:</strong> ${userData.direccion}</p>
                    <p><strong>Información Adicional:</strong> ${userData.informacionad}</p>
                `;
            }

            // Insertar el nombre y @ del usuario
            user_name.innerHTML = namesections;
            // Insertar el contenido HTML en la sección "Sobre Mí"
            aboutSection.innerHTML = aboutHtml;

        } else {
            console.error(result.message || 'Error al obtener la información del usuario');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});