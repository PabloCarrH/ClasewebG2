document.addEventListener('DOMContentLoaded', () => {
    // Código para el filtrado de tarjetas
    const searchInput = document.querySelector('input[name="search"]');
    const jobCards = document.querySelectorAll('.job-card');

    if (searchInput && jobCards) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();

            jobCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = 'block'; // Show matching cards
                } else {
                    card.style.display = 'none'; // Hide non-matching cards
                }
            });
        });
    } else {
        console.error('No se encontraron elementos de búsqueda o tarjetas de trabajo.');
    }

    // Código para el botón de menú hamburguesa
    const menuButton = document.querySelector('.hamburger'); // Selecciona el botón hamburguesa
    const menu = document.querySelector('.menu'); // Selecciona el menú que quieres mostrar/ocultar

    if (menuButton && menu) { // Verifica si ambos elementos existen
        menuButton.addEventListener('click', () => {
            menu.classList.toggle('show'); // Cambia la visibilidad del menú al hacer clic
        });
    } else {
        console.error('No se encontraron los elementos del menú o el botón hamburguesa.');
    }
});
