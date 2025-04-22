// I added support for left and right arrows to scroll the carousel.
// This uses scrollBy with smooth behavior for natural movement.
// Pattern adapted from: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
document.getElementById("prev").addEventListener("click", () => {
	const scrollAmount = cards[0].offsetWidth + 32; 
	carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  
  document.getElementById("next").addEventListener("click", () => {
	const scrollAmount = cards[0].offsetWidth + 32; 
	carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
  
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

  // Hiding the left-arrow until the card is not on the red-noise
  cards.forEach((card) => card.classList.remove("active"));
  if (closest) closest.classList.add("active");

  const id = closest?.id;
  dots.forEach(dot => dot.classList.remove("active"));
  const activeDot = document.querySelector(`#menu li#${id}`);
  if (activeDot) activeDot.classList.add("active");

  const leftArrow = document.getElementById("prev");
  if (id === "red-noise") {
    leftArrow.style.opacity = "0";
    leftArrow.style.pointerEvents = "none";
  } else {
    leftArrow.style.opacity = "1";
    leftArrow.style.pointerEvents = "auto";
  }
}
