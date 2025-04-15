// I added support for left and right arrows to scroll the carousel.
// This uses scrollBy with smooth behavior for natural movement.
// Pattern adapted from: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollBy
document.getElementById("prev").addEventListener("click", () => {
	const scrollAmount = cards[0].offsetWidth + 32; // adjust spacing if needed
	carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  
  document.getElementById("next").addEventListener("click", () => {
	const scrollAmount = cards[0].offsetWidth + 32; // adjust spacing if needed
	carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
  