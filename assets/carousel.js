const carousel = document.querySelector("main.carousel");
const cards = document.querySelectorAll(".noise-control");

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
