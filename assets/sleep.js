let sleepTimeout = null;

document.querySelectorAll(".timer-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const minutes = parseInt(btn.dataset.minutes);
    const milliseconds = minutes * 60 * 1000;

    if (sleepTimeout) {
      clearTimeout(sleepTimeout);
    }

    sleepTimeout = setTimeout(() => {
      stopAllAudio();
      document.getElementById("timer-status").textContent = `Sleep timer expired. Audio stopped.`;
    }, milliseconds);

    document.getElementById("timer-status").textContent = `Sleep timer set for ${minutes} minutes.`;
  });
});

function stopAllAudio() {
  Object.values(noisePlayers).forEach(({ audio, gainNode, slider, display }) => {
    audio.pause();
    audio.currentTime = 0;
    gainNode.gain.value = 0;
    slider.value = 0;
    display.textContent = "0";
  });

  masterSlider.value = 0;
  masterGainNode.gain.value = 0;
  masterDisplay.textContent = "0";

  isPlaying = false;
  play.innerHTML = playSVG;
}
