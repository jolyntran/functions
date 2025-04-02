const noiseTracks = {
  red: ["assets/sounds/red.mp3"],
  orange: ["assets/sounds/orange.mp3"],
  yellow: ["assets/sounds/yellow.mp3"],
  green: ["assets/sounds/green.mp3"],
  blue: ["assets/sounds/blue.mp3"],
  violet: ["assets/sounds/violet.mp3"],
  pink: ["assets/sounds/pink.mp3"],
  brown: ["assets/sounds/brown.mp3"],
  gray: ["assets/sounds/gray.mp3"],
  white: ["assets/sounds/white.mp3"]
};

// I needed to support audio playback in modern browsers!
// I learned from MDN: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// AudioContext is the main interface for managing and playing audio in web apps.
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const noisePlayers = {};
let isPlaying = false;

// I wanted a way to control the overall volume across all tracks!
// I used createGain() from the Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/GainNode
// This creates a master gain node connected to the final audio output.
const masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);

document.querySelectorAll(".noise-control").forEach((section) => {
  const color = section.dataset.noise;
  const slider = section.querySelector(".range");
  const display = section.querySelector(".volume-display");

  // I wanted each color to play its own looping audio!
  // I used the HTMLAudioElement constructor: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
  // This creates a new audio element and loops it continuously.
  const audio = new Audio(noiseTracks[color][0]);
  audio.loop = true;

  // I wanted to connect the HTML audio to the Web Audio API!
  // I found createMediaElementSource() here: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource
  // This wraps the <audio> element in a node that can be routed through gain nodes.
  const trackSource = audioContext.createMediaElementSource(audio);
  const gainNode = audioContext.createGain();

  trackSource.connect(gainNode).connect(masterGainNode);

  noisePlayers[color] = {
    audio,
    gainNode,
    slider
  };

  gainNode.gain.value = slider.value / 100;
  display.textContent = slider.value;

  // I needed real-time volume control for each track!
  // I used an input event listener to update gain values on slider change.
  // This changes the gainNode’s value and updates the UI accordingly.
  slider.addEventListener("input", () => {
    const volume = slider.value;
    gainNode.gain.value = volume / 100;
    display.textContent = volume;
  });
});

// I wanted a master volume control UI element!
// I accessed the slider and label and used an event listener to change the overall gain.
const masterSlider = document.getElementById("masterVolume");
const masterDisplay = document.getElementById("masterVolumeDisplay");

masterSlider.addEventListener("input", () => {
  const volume = masterSlider.value;
  masterGainNode.gain.value = volume / 100;
  masterDisplay.textContent = `${volume}%`;
});

// I wanted to start all audio tracks with one button click!
// I used async/await to make sure the AudioContext is resumed before playing.
// This ensures all audio tracks play in sync when the user clicks "Play".
document.getElementById("playBtn").addEventListener("click", async () => {
  if (!isPlaying) {
    await audioContext.resume();
    Object.values(noisePlayers).forEach(({ audio }) => {
      audio.play();
    });
    isPlaying = true;
  }
});

// I wanted a way to stop and reset all audio with one click!
// I used pause() and set currentTime = 0 to stop and rewind each track.
document.getElementById("stopBtn").addEventListener("click", () => {
  Object.values(noisePlayers).forEach(({ audio }) => {
    audio.pause();
    audio.currentTime = 0;
  });
  isPlaying = false;
});
