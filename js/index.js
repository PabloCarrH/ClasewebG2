
  let visitCount = localStorage.getItem('page_view_count');

  if (!visitCount) {
      visitCount = 0;
  }

  visitCount++;

  localStorage.setItem('page_view_count', visitCount);

  document.addEventListener('DOMContentLoaded', () => {
      const counterElement = document.getElementById('visit-counter');
      if (counterElement) {
          counterElement.innerText = `Visitas: ${visitCount}`;
      }
  });