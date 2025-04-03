const carousel = document.querySelector(".carousel");
  const cards = document.querySelectorAll(".noise-card");

  function updateActiveCard() {
    const middle = window.innerWidth / 2;
    let closest = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(middle - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = card;
      }
    });

    cards.forEach((card) => card.classList.remove("active"));
    if (closest) closest.classList.add("active");
  }

  carousel.addEventListener("scroll", () => {
    requestAnimationFrame(updateActiveCard);
  });

  window.addEventListener("resize", updateActiveCard);
  window.addEventListener("load", updateActiveCard);

// I wanted to allow users to tap a card to flip it between control and description views.
// Inspired by https://codepen.io/mondal10/pen/WNNEvjV 
// I used classList.toggle to apply a CSS-based 3D rotation.
document.querySelectorAll('.noise-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    // Avoid flipping when a slider is clicked
    if (!e.target.closest('input')) {
      card.classList.toggle('flipped');
    }
  });
});
