let isPlaying = false;
const audioElements = {};

const noiseTracks = {
    white: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
    pink: "https://assets.mixkit.co/active_storage/sfx/2593/2593-preview.mp3",
    brown: "https://assets.mixkit.co/active_storage/sfx/2637/2637-preview.mp3"
};

function setupControls() {
    document.getElementById("playBtn").addEventListener("click", togglePlayback);
    document.getElementById("stopBtn").addEventListener("click", stopPlayback);
    document.getElementById("masterVolume").addEventListener("input", updateVolumes);

    document.querySelectorAll(".noise-control").forEach(section => {
        const slider = section.querySelector(".slider");
        const display = section.querySelector(".volume-display");

        slider.addEventListener("input", () => {
            display.textContent = `${slider.value}%`;
            updateVolumes();
        });
    });
}

function togglePlayback() {
    if (!isPlaying) {
        startPlayback();
        isPlaying = true;
        document.getElementById("playBtn").textContent = "Pause";
    } else {
        pausePlayback();
        isPlaying = false;
        document.getElementById("playBtn").textContent = "Play";
    }
}

function startPlayback() {
    for (const [color, url] of Object.entries(noiseTracks)) {
        if (!audioElements[color]) {
            const audio = new Audio(url);
            audio.loop = true;

            const slider = document.querySelector(`[data-noise="${color}"] .slider`);
            audio.volume = (slider.value / 100) * (document.getElementById("masterVolume").value / 100);

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Playback failed:", e);
                    alert("Please click Play again to start audio");
                });
            }

            audioElements[color] = audio;
        } else {
            audioElements[color].play();
        }
    }
}

function pausePlayback() {
    Object.values(audioElements).forEach(audio => {
        if (audio) audio.pause();
    });
}

function stopPlayback() {
    Object.entries(audioElements).forEach(([color, audio]) => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    isPlaying = false;
    document.getElementById("playBtn").textContent = "Play";
}

function updateVolumes() {
    const master = document.getElementById("masterVolume").value / 100;
    document.getElementById("masterVolumeDisplay").textContent = `${Math.round(master * 100)}%`;

    document.querySelectorAll(".noise-control").forEach(section => {
        const color = section.dataset.noise;
        const slider = section.querySelector(".slider");
        const volume = (slider.value / 100) * master;

        if (audioElements[color]) {
            audioElements[color].volume = volume;
        }
    });
}

window.addEventListener("DOMContentLoaded", setupControls);
