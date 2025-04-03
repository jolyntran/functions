const noiseTracks = {
  red: ["assets/sounds/red.mp3"],
  orange: ["assets/sounds/orange.mp3"],
  yellow: ["assets/sounds/yellow.mp3"],
  green: ["assets/sounds/green.mp3"],
  blue: ["assets/sounds/blue.mp3"],
  violet: ["assets/sounds/violet.mp3"],
  pink: ["assets/sounds/pink.mp3"],
  brown: ["assets/sounds/brown.mp3"],
  grey: ["assets/sounds/grey.mp3"],
  white: ["assets/sounds/white.mp3"]
};

// I needed a way to programmatically route and control audio playback for each noise color.
// I learned from MDN: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
// The AudioContext interface allows you to control audio operations like playback, gain, routing, and filters.
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const noisePlayers = {};
let isPlaying = false;

// I wanted to control overall volume of all playing noise tracks with one master slider.
// I used createGain from the Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/GainNode
// The masterGainNode acts as a central volume control by routing all tracks through it before outputting to the destination.
const masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);

// I needed to set up each track with volume controls and connect them to the master gain node.
// I used createMediaElementSource() to turn <audio> elements into nodes usable with Web Audio API.
document.querySelectorAll(".noise-card").forEach((section) => {
  const color = section.dataset.noise;
  const slider = section.querySelector(".range");
  const display = section.querySelector(".volume-display");

  // I wanted to loop each noise sound indefinitely as ambient background audio.
  // I used the HTMLAudioElement and set .loop = true to continuously play the track.
  const audio = new Audio(noiseTracks[color][0]);
  audio.loop = true;

  // I needed to control the volume of each individual noise track.
  // I connected the audio element to a gain node and routed it through the master gain node.
  const trackSource = audioContext.createMediaElementSource(audio);
  const gainNode = audioContext.createGain();
  trackSource.connect(gainNode).connect(masterGainNode);

  noisePlayers[color] = { audio, gainNode, slider, display };

  // I wanted to allow users to control the volume of each noise track with a slider.
  // I used the input event to update the gain value and reflect it in the UI.
  const updateVolume = () => {
    const volume = slider.value;
    gainNode.gain.value = volume / 100;
    display.textContent = volume;
  };

  slider.addEventListener("input", updateVolume);
  updateVolume(); 
});

// I wanted to provide a global volume control for all noise tracks.
// I connected the master volume slider to the masterGainNode’s value.
const masterSlider = document.getElementById("masterVolume");
const masterDisplay = document.getElementById("masterVolumeDisplay");

masterSlider.addEventListener("input", () => {
  const volume = masterSlider.value;
  masterGainNode.gain.value = volume / 100;
  masterDisplay.textContent = `${volume}%`;
});

// I needed a way to start all noise tracks together when the user clicks Play.
// I used audioContext.resume() to satisfy browser autoplay policies, then played each track.
const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", async () => {
  await audioContext.resume();

  if (!isPlaying) {
    Object.values(noisePlayers).forEach(({ audio }) => {
      audio.play();
    });
    playBtn.textContent = "⏸"; 
    isPlaying = true;
  } else {
    Object.values(noisePlayers).forEach(({ audio }) => {
      audio.pause();
    });
    playBtn.textContent = "▶"; 
    isPlaying = false;
  }
});

// I needed a way to stop and reset all noise tracks with one click.
// I paused and reset currentTime on each track to return them to the beginning.
document.getElementById("resetBtn").addEventListener("click", () => {
  Object.values(noisePlayers).forEach(({ audio, slider, gainNode, display }) => {
    audio.pause();
    audio.currentTime = 0;
    slider.value = 50;
    gainNode.gain.value = 0.5;
    display.textContent = "50";
  });
  masterSlider.value = 70;
  masterGainNode.gain.value = 0.7;
  masterDisplay.textContent = "70";
  isPlaying = false;
});

document.getElementById("randomizeBtn").addEventListener("click", () => {
  Object.values(noisePlayers).forEach(({ slider, gainNode, display }) => {
    const randomValue = Math.floor(Math.random() * 101);
    slider.value = randomValue;
    gainNode.gain.value = randomValue / 100;
    display.textContent = randomValue;
  });
});