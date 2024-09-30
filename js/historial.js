document.addEventListener('DOMContentLoaded', async () => {
    const userId = localStorage.getItem('userId');  // Obtener el ID del usuario desde el localStorage

    if (!userId) {
        console.error('Usuario no está autenticado');
        return;
    }

    try {
        // Hacer la petición para obtener las publicaciones asignadas
        const publicacionesResponse = await fetch('http://localhost:3000/api/publicaciones/asignadas');
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
                        <button class="btn-detalles" data-id="${publicacion.id}">Cancelar oferta</button>
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
                            body: JSON.stringify({ asignado: 0 }), // Enviar el nuevo valor como 1
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
