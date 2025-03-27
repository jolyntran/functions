document.addEventListener("DOMContentLoaded", () => {
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
    
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const noisePlayers = {}; 
    let isPlaying = false;
    let masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    
    document.querySelectorAll(".noise-control").forEach((section) => {
      const color = section.dataset.noise;
      const slider = section.querySelector(".slider");
      const display = section.querySelector(".volume-display");
    
      const audio = new Audio(noiseTracks[color][0]);
      audio.loop = true;
    
      const trackSource = audioContext.createMediaElementSource(audio);
      const gainNode = audioContext.createGain();
    
      trackSource.connect(gainNode).connect(masterGainNode);
    
      noisePlayers[color] = {
        audio,
        gainNode,
        slider
      };
    
      gainNode.gain.value = slider.value / 100;
    
      slider.addEventListener("input", () => {
        const volume = slider.value;
        gainNode.gain.value = volume / 100;
        display.textContent = `${volume}%`;
      });
    });
    
    const masterSlider = document.getElementById("masterVolume");
    const masterDisplay = document.getElementById("masterVolumeDisplay");
    
    masterSlider.addEventListener("input", () => {
      const volume = masterSlider.value;
      masterGainNode.gain.value = volume / 100;
      masterDisplay.textContent = `${volume}%`;
    });
    
    document.getElementById("playBtn").addEventListener("click", async () => {
      if (!isPlaying) {
        await audioContext.resume(); 
        Object.values(noisePlayers).forEach(({ audio }) => {
          audio.play();
        });
        isPlaying = true;
      }
    });
    
    document.getElementById("stopBtn").addEventListener("click", () => {
      Object.values(noisePlayers).forEach(({ audio }) => {
        audio.pause();
        audio.currentTime = 0;
      });
      isPlaying = false;
    });
 })