document.getElementById('service-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceData = {
        service: document.getElementById('service').value,
        cost: document.getElementById('cost').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('end-date').value,
        clientName: document.getElementById('client-name').value,
        providerName: document.getElementById('provider-name').value
    };

    fetch('http://localhost:3000/api/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
    })
    .then(response => response.json())
    .then(async data => {
        console.log('Formulario enviado con éxito:', data);

        // Mostrar mensaje de éxito
        await Swal.fire({
            icon: 'success',
            title: 'Formulario enviado con éxito',
            text: 'Serás redirigido al dashboard',
            showConfirmButton: false,
            timer: 2000  // El mensaje de éxito aparecerá durante 2 segundos
        });

        // Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
            window.location.href = 'dashboardPro.html'; // Cambia el enlace según tu dashboard
        }, 2000);
    })
    .catch((error) => {
        console.error('Error al enviar el formulario:', error);

        // Mostrar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.',
            confirmButtonText: 'Aceptar'
        });
    });
});
