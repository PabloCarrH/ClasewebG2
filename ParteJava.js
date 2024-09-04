document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[name="search"]');
    const jobCards = document.querySelectorAll('.job-card');

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
});

