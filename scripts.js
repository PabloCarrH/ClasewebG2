let currentIndex = 0;

function slide(direction) {
    const cards = document.getElementById('service-cards');
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

// boton hamburguesa
document.getElementById("hamburger").addEventListener("click", function() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
});
