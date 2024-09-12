// Define la función `slide` fuera del bloque DOMContentLoaded
let currentIndex = 0;

function slide(direction) {
    const cards = document.getElementById('service-cards');
    if (!cards) return; // Verifica que `cards` exista

    const cardWidth = cards.querySelector('.service-card').offsetWidth + 20; // Ancho de la tarjeta + margen
    const visibleCards = 3; // Número de tarjetas visibles
    const totalCards = cards.children.length;
    const maxIndex = totalCards - visibleCards;

    // Actualiza el índice actual en función de la dirección
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Calcula el desplazamiento y aplica la transformación
    const offset = -currentIndex * cardWidth;
    cards.style.transform = `translateX(${offset}px)`;
}

// Maneja el evento DOMContentLoaded
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

    // Añade event listeners para las flechas del carrusel (si tienes botones para ello)
    const prevButton = document.querySelector('.prev'); // Asegúrate de tener estos elementos en tu HTML
    const nextButton = document.querySelector('.next');

    if (prevButton) {
        prevButton.addEventListener('click', () => slide(-1)); // Desliza hacia la izquierda
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => slide(1)); // Desliza hacia la derecha
    }
});
