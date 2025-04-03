const carousel = document.querySelector('.carousel');
let isScrolling;

carousel.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    const cards = document.querySelectorAll('.noise-card');
    const middle = window.innerWidth / 2;
    let closest = null;
    let closestDist = Infinity;

    cards.forEach(card => {
      const box = card.getBoundingClientRect();
      const center = box.left + box.width / 2;
      const dist = Math.abs(middle - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = card;
      }
    });

    cards.forEach(c => c.classList.remove('active'));
    if (closest) closest.classList.add('active');
  }, 150);
});
