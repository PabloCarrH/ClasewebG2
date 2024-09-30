let currentIndex = 0;
let allowShift = true;

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementById('service-cards');
    const totalCards = cards.children.length;

    // Duplicamos las tarjetas para hacer el carrusel circular
    for (let i = 0; i < totalCards; i++) {
        cards.appendChild(cards.children[i].cloneNode(true));
    }

    const cardWidth = cards.querySelector('.service-card').offsetWidth + 20; // Ancho de tarjeta + margen
    const visibleCards = 5; // Número de tarjetas visibles (ajustable según lo que desees mostrar)
    
    function slide(direction) {
        if (allowShift) {
            allowShift = false;

            // Actualiza el índice actual en función de la dirección
            currentIndex += direction;

            // Calcula el desplazamiento y aplica la transformación
            const offset = -currentIndex * cardWidth;
            cards.style.transform = `translateX(${offset}px)`;

            cards.addEventListener('transitionend', function checkLoop() {
                // Si hemos llegado más allá del conjunto original de tarjetas
                if (currentIndex >= totalCards) {
                    currentIndex = 0; // Saltamos de nuevo al inicio
                    cards.style.transition = 'none'; // Quitamos la transición para el salto
                    const resetOffset = -currentIndex * cardWidth;
                    cards.style.transform = `translateX(${resetOffset}px)`;

                    cards.offsetHeight; // Reflujo

                    cards.style.transition = 'transform 0.5s ease-in-out'; // Volvemos a aplicar la transición
                }

                // Si vamos antes de la primera tarjeta
                if (currentIndex < 0) {
                    currentIndex = totalCards - 1; // Saltamos al final
                    cards.style.transition = 'none'; // Quitamos la transición para el salto
                    const resetOffset = -currentIndex * cardWidth;
                    cards.style.transform = `translateX(${resetOffset}px)`;

                    cards.offsetHeight; // Reflujo

                    cards.style.transition = 'transform 0.5s ease-in-out'; // Volvemos a aplicar la transición
                }

                allowShift = true; // Permitimos de nuevo el desplazamiento
                cards.removeEventListener('transitionend', checkLoop); // Quitamos el listener
            });
        }
    }

    document.querySelector('.next').addEventListener('click', () => slide(1));
    document.querySelector('.prev').addEventListener('click', () => slide(-1));
});



// boton hamburguesa
document.getElementById("hamburger").addEventListener("click", function() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
});
