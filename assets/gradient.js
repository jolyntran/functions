const sliders = document.querySelectorAll('.noise-control .range');

function updateGradientBackground() {
  const activeColors = [];

  sliders.forEach(slider => {
    const colorKey = slider.closest('.noise-control').dataset.noise;
    const value = parseInt(slider.value, 10);

    if (value > 0) {
      const weight = value / 100;
      activeColors.push(`${sliderColors[colorKey]} ${Math.round(weight * 100)}%`);
    }
  });

  // Fallback or default gradient if none are active
  const gradient = activeColors.length > 0
    ? `linear-gradient(106deg, ${activeColors.join(', ')})`
    : `linear-gradient(106deg, #003973, #000000)`;

  document.body.style.background = gradient;
}

// Run initially and on any slider input
sliders.forEach(slider => {
  slider.addEventListener('input', updateGradientBackground);
});
updateGradientBackground(); // initial render
