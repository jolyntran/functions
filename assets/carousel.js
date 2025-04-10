// I used querySelector and querySelectorAll to target the carousel, cards, and nav dots.
const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".noise-card");
const dots = document.querySelectorAll("#menu li");

// I wanted to track which card is centered in the viewport.
// Inspired by a method from CSS-Tricks to find the closest element to the center
// https://css-tricks.com/snippets/javascript/get-center-element/
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

  // Mark the centered card as active
  cards.forEach((card) => card.classList.remove("active"));
  if (closest) closest.classList.add("active");

  // Match the active dot with the centered card
  // I mapped card id to dot id (same string)
  if (closest) {
    const id = closest.id;
    dots.forEach(dot => dot.classList.remove("active"));
    const activeDot = document.querySelector(`#menu li#${id}`);
    if (activeDot) activeDot.classList.add("active");
  }
}

// I used scroll and resize listeners to trigger re-centering logic on interaction
// requestAnimationFrame ensures smoother performance when syncing on scroll
// Scroll animation optimization via requestAnimationFrame from MDN Docs
// https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
carousel.addEventListener("scroll", () => {
  requestAnimationFrame(updateActiveCard);
});

window.addEventListener("resize", updateActiveCard);
window.addEventListener("load", updateActiveCard);

// I allowed flipping cards to see either controls or description
// Inspired by card flip animation techniques shared on CodePen
// https://codepen.io/mondal10/pen/WNNEvjV
document.querySelectorAll('.noise-card').forEach((card) => {
  card.addEventListener('click', (e) => {
    // Prevent flipping when interacting with a slider
    if (!e.target.closest('input')) {
      card.classList.toggle('flipped');
    }
  });
});

// I wanted the first card (red-noise) to start flipped to reveal its description, then flip back to the front after 3 seconds.
// Inspired by the use of setTimeout from MDN Docs https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
window.addEventListener('load', () => {
  const redCard = document.querySelector('#red-noise');
  if (!redCard) return;

  redCard.classList.add('flipped');

  setTimeout(() => {
    redCard.classList.remove('flipped');
  }, 3000);
});

// I wanted the in-page anchor menu to scroll the target card to the top, instead of letting iOS center it awkwardly.
// I used scrollIntoView with alignment customization, inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
document.querySelectorAll('#menu li a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    const targetId = link.getAttribute('href').substring(1);
    const targetCard = document.getElementById(targetId);
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start', 
      });
    }
  });
});