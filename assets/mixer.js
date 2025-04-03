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

// I wanted SVG icons to toggle between play and pause.
// I stored them as strings to easily swap innerHTML.
const playSVG = `<svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#999999"></path>
</svg>`;

const pauseSVG = `<svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#999999"></path>
  <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#999999"></path>
</svg>`;

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

// I needed a way to start and pause all noise tracks with one button.
// I used audioContext.resume() to satisfy autoplay policies, then toggled play and pause on click.
// I swapped in a Play/Pause SVG by changing innerHTML.
const playBtn = document.getElementById("playBtn");
playBtn.innerHTML = playSVG; // Set initial SVG

playBtn.addEventListener("click", async () => {
  await audioContext.resume();

  if (!isPlaying) {
    Object.values(noisePlayers).forEach(({ audio }) => {
      audio.play();
    });
    playBtn.innerHTML = pauseSVG;
    isPlaying = true;
  } else {
    Object.values(noisePlayers).forEach(({ audio }) => {
      audio.pause();
    });
    playBtn.innerHTML = playSVG;
    isPlaying = false;
  }
});

// I needed a way to stop and reset all noise tracks with one click.
// I paused and reset currentTime on each track to return them to the beginning.
// I also reset sliders and volumes to their default values.
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
  playBtn.innerHTML = playSVG;
  isPlaying = false;
});

// I wanted to give users a quick way to explore by generating random volumes across all tracks.
// I used Math.random() to set each track between 0 and 100 and updated the UI accordingly.
document.getElementById("randomizeBtn").addEventListener("click", () => {
  Object.values(noisePlayers).forEach(({ slider, gainNode, display }) => {
    const randomValue = Math.floor(Math.random() * 101);
    slider.value = randomValue;
    gainNode.gain.value = randomValue / 100;
    display.textContent = randomValue;
  });
});
