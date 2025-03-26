let isPlaying = false;
const audioElements = {};
const activeNoiseIndex = { white: 0, pink: 0, brown: 0 };
const fadeDuration = 1000; // ms

const noiseTracks = {
    red: [
        "https://cdn.pixabay.com/audio/2022/03/26/audio_1bb3b83e4b.mp3" // using brown/red rumble as red
    ],
    orange: [
        "https://cdn.pixabay.com/audio/2021/09/09/audio_9b5a28c456.mp3",
        "https://cdn.pixabay.com/audio/2022/06/09/audio_d47972e5b6.mp3"
    ],
    yellow: [
        "https://cdn.pixabay.com/audio/2022/07/13/audio_5fc1e4c8b4.mp3" // example soft light tone
    ],
    green: [
        "https://cdn.pixabay.com/audio/2023/03/28/audio_73db7e43b2.mp3",
        "https://cdn.pixabay.com/audio/2022/05/06/audio_3ddc8c1b3a.mp3"
    ],
    blue: [
        "https://cdn.pixabay.com/audio/2022/03/31/audio_7b21011678.mp3",
        "https://cdn.pixabay.com/audio/2022/03/31/audio_436b7a27e1.mp3"
    ],
    indigo: [
        "https://cdn.pixabay.com/audio/2022/04/01/audio_9c9a9f2fd9.mp3" // calming ambient tone
    ],
    violet: [
        "https://cdn.pixabay.com/audio/2022/04/04/audio_dfcfc0e808.mp3",
        "https://cdn.pixabay.com/audio/2022/02/14/audio_62d179ad4f.mp3"
    ],
    white: [
        "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
        "https://cdn.pixabay.com/audio/2022/03/30/audio_7d7c72378a.mp3"
    ],
    pink: [
        "https://assets.mixkit.co/active_storage/sfx/2593/2593-preview.mp3",
        "https://cdn.pixabay.com/audio/2022/03/15/audio_7be29bce7b.mp3"
    ],
    brown: [
        "https://assets.mixkit.co/active_storage/sfx/2637/2637-preview.mp3",
        "https://cdn.pixabay.com/audio/2022/03/26/audio_1bb3b83e4b.mp3"
    ],
    black: [
        "https://cdn.pixabay.com/audio/2023/02/10/audio_234379145e.mp3",
        "https://cdn.pixabay.com/audio/2022/03/30/audio_f0f68f9f4d.mp3"
    ],
    gray: [
        "https://cdn.pixabay.com/audio/2022/01/25/audio_770f535e88.mp3",
        "https://cdn.pixabay.com/audio/2022/06/02/audio_c3eab0d0d6.mp3"
    ]
};

function setupControls() {
    document.getElementById("playBtn").addEventListener("click", togglePlayback);
    document.getElementById("stopBtn").addEventListener("click", stopPlayback);
    document.getElementById("masterVolume").addEventListener("input", updateVolumes);

    document.querySelectorAll(".noise-control").forEach(section => {
        const slider = section.querySelector(".slider");
        const display = section.querySelector(".volume-display");
        const color = section.dataset.noise;

        slider.addEventListener("input", () => {
            display.textContent = `${slider.value}%`;
            updateVolumes();
        });

        section.addEventListener("dblclick", () => {
            switchNoiseVariant(color);
        });
    });
}

function switchNoiseVariant(color) {
    fadeOutAudio(color, () => {
        activeNoiseIndex[color] = (activeNoiseIndex[color] + 1) % noiseTracks[color].length;
        if (isPlaying) startPlayback();
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
    for (const color of Object.keys(noiseTracks)) {
        const url = noiseTracks[color][activeNoiseIndex[color]];

        if (!audioElements[color]) {
            const audio = new Audio(url);
            audio.loop = true;

            const slider = document.querySelector(`[data-noise="${color}"] .slider`);
            audio.volume = 0;

            audioElements[color] = audio;
            fadeInAudio(color);
        } else {
            audioElements[color].play();
            fadeInAudio(color);
        }
    }
}

function fadeInAudio(color) {
    const audio = audioElements[color];
    if (!audio) return;

    const slider = document.querySelector(`[data-noise="${color}"] .slider`);
    const master = document.getElementById("masterVolume").value / 100;
    const targetVolume = (slider.value / 100) * master;
    const step = targetVolume / (fadeDuration / 50);

    let vol = 0;
    const interval = setInterval(() => {
        vol = Math.min(vol + step, targetVolume);
        audio.volume = vol;
        if (vol >= targetVolume) clearInterval(interval);
    }, 50);
}

function fadeOutAudio(color, callback) {
    const audio = audioElements[color];
    if (!audio) return callback?.();

    const step = audio.volume / (fadeDuration / 50);

    const interval = setInterval(() => {
        audio.volume = Math.max(audio.volume - step, 0);
        if (audio.volume <= 0) {
            clearInterval(interval);
            audio.pause();
            audio.currentTime = 0;
            delete audioElements[color];
            callback?.();
        }
    }, 50);
}

function pausePlayback() {
    Object.values(audioElements).forEach(audio => audio?.pause());
}

function stopPlayback() {
    Object.keys(audioElements).forEach(color => fadeOutAudio(color));
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
