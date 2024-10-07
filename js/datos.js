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
            const user_name = document.querySelector('.user-name');
            const userType = result.userType;
            const userData = result.userData;

            let namesections = `
                <strong>${userData.name}</strong>
                <p>@${userData.name}</p>
            `;
            
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

    try {
        // Hacer la petición para obtener las publicaciones
        const publicacionesResponse = await fetch('http://localhost:3000/api/publicaciones');
        const publicaciones = await publicacionesResponse.json();

        if (publicacionesResponse.ok) {
            const publicacionesContainer = document.getElementById('publicaciones-container');

            // Limpiar el contenedor antes de añadir nuevas publicaciones
            publicacionesContainer.innerHTML = '';

            // Iterar sobre las publicaciones y mostrarlas
            publicaciones.forEach(publicacion => {
                const publicacionHtml = `
                    <div class="publicacion">
                        <h4>${publicacion.servicio}</h4>
                        <p>Costo: ${publicacion.costo}</p>
                        <p>Fecha de Inicio: ${publicacion.fechaInicio}</p>
                        <p>Fecha Final: ${publicacion.fechaFinal}</p>
                        <p>Cliente: ${publicacion.NomCliente}</p>
                        <p>Profesional: ${publicacion.NomProfecional}</p>
                        <button class="btn-detalles" data-id="${publicacion.id}">Aceptar oferta</button>
                    </div>
                `;
                publicacionesContainer.innerHTML += publicacionHtml;
            });

            // Agregar el evento a los botones
            document.querySelectorAll('.btn-detalles').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const publicacionId = e.target.dataset.id; // Obtener el ID de la publicación

                    try {
                        const response = await fetch(`http://localhost:3000/api/publicacion/${publicacionId}`, {
                            method: 'PUT', // Cambiar a PUT para actualizar
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ asignado: 1 }), // Enviar el nuevo valor como 1
                        });

                        if (response.ok) {
                            const result = await response.json();
                            console.log('Oferta aceptada:', result);
                            // Reiniciar la página
                            location.reload(); // Esto recargará la página
                        } else {
                            console.error('Error al aceptar la oferta:', await response.json());
                            alert('Error al aceptar la oferta. Por favor, inténtalo de nuevo.');
                        }
                    } catch (error) {
                        console.error('Error en la solicitud:', error);
                        alert('Error en la solicitud. Por favor, revisa la consola para más detalles.');
                    }
                });
            });

        } else {
            console.error('Error al obtener las publicaciones:', publicaciones);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
});

document.getElementById("showPosts").addEventListener("click", function () {
    // Mostrar el modal
    document.getElementById("postsModal").style.display = "block";

    // Hacer una petición al servidor para obtener las publicaciones
    fetch('http://localhost:3000/api/posts/latest-assigned')
        .then(response => response.json())
        .then(data => {
            // Llenar la tabla con los datos recibidos
            const tableBody = document.querySelector("#postsTable tbody");
            tableBody.innerHTML = ""; // Limpiar contenido anterior

            data.forEach(post => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${post.servicio}</td>
                    <td>${post.costo}</td>
                    <td>${post.fechaInicio}</td>
                    <td>${post.fechaFinal}</td>
                    <td>${post.NomCliente}</td>
                `;
                tableBody.appendChild(row);
            });
        });
});

// Cerrar el modal cuando se hace clic en el botón de cierre
document.querySelector(".close").addEventListener("click", function () {
    document.getElementById("postsModal").style.display = "none";
});

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.onclick = function (event) {
    if (event.target === document.getElementById("postsModal")) {
        document.getElementById("postsModal").style.display = "none";
    }
};


// Mostrar el formulario según el tipo de usuario almacenado en localStorage
document.getElementById('configButton').addEventListener('click', function() {
    const userType = localStorage.getItem('userType'); // Recuperar el tipo de usuario desde localStorage
    const formContainer = document.getElementById('configFormContainer');
    const form = document.getElementById('configForm');
    
    // Mostrar el formulario
    formContainer.style.display = 'block';
    
    // Limpiar el contenido del formulario antes de agregar nuevos campos
    form.innerHTML = '';

    if (userType === 'professional') {
        form.innerHTML = `
            <h3>Actualizar Información Profesional</h3>
            <label for="fechanacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechanacimiento" name="fechanacimiento">

            <label for="celular">Celular</label>
            <input type="text" id="celular" name="celular">

            <label for="direccion">Dirección</label>
            <input type="text" id="direccion" name="direccion">

            <label for="servicio">Servicio</label>
            <input type="text" id="servicio" name="servicio">

            <label for="descripcionserv">Descripción del Servicio</label>
            <input type="text" id="descripcionserv" name="descripcionserv">

            <label for="experiencia">Experiencia</label>
            <input type="text" id="experiencia" name="experiencia">

            <label for="certificaciones">Certificaciones</label>
            <input type="text" id="certificaciones" name="certificaciones">

            <label for="tarifa">Tarifa</label>
            <input type="number" step="0.01" id="tarifa" name="tarifa">

            <label for="disponibilidad">Disponibilidad</label>
            <input type="text" id="disponibilidad" name="disponibilidad">

            <button type="submit">Guardar</button>
        `;
    } else if (userType === 'client') {
        form.innerHTML = `
            <h3>Actualizar Información del Cliente</h3>
            <label for="namecliente">Nombre del Cliente</label>
            <input type="text" id="namecliente" name="namecliente">

            <label for="fechanacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechanacimiento" name="fechanacimiento">

            <label for="celular">Celular</label>
            <input type="text" id="celular" name="celular">

            <label for="direccion">Dirección</label>
            <input type="text" id="direccion" name="direccion">

            <label for="informacionad">Información Adicional</label>
            <input type="text" id="informacionad" name="informacionad">

            <button type="submit">Guardar</button>
        `;
    }
});

// Cerrar el modal si se hace clic fuera del formulario
window.onclick = function(event) {
    const formContainer = document.getElementById('configFormContainer');
    if (event.target === formContainer) {
        formContainer.style.display = "none";
    }
};


document.getElementById('configForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userType = localStorage.getItem('userType');
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.userType = userType; // O 'client', dependiendo del tipo de usuario

    // También necesitas el user_id, que puede estar guardado en localStorage
    data.user_id = localStorage.getItem('userId'); // Suponiendo que guardaste el user_id al loguear

    fetch('http://localhost:3000/updateUserInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('Información actualizada correctamente');
        // Ocultar el formulario después de guardar
        document.getElementById('configFormContainer').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al guardar la información');
    });
    location.reload();
});


