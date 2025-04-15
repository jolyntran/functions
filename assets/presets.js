//Sleepy Preset
document.getElementById("sleepy").addEventListener("click", () => {
	const presetValues = {
		red: 27,
	  	violet: 13,
	  	pink: 17,
	  	brown: 46,
	 	grey: 19,
	};
  
	for (const [color, value] of Object.entries(presetValues)) {
		const player = noisePlayers[color];
		if (player) {
			player.slider.value = value;
			player.gainNode.gain.value = value / 100;
			player.display.textContent = value;
	  	}
	}
});

//Rain Preset
document.getElementById("rain").addEventListener("click", () => {
	const presetValues = {
		orange: 17,
		yellow: 81,
		blue: 35,
		brown: 19,
	};
  
	for (const [color, value] of Object.entries(presetValues)) {
		const player = noisePlayers[color];
		if (player) {
			player.slider.value = value;
			player.gainNode.gain.value = value / 100;
			player.display.textContent = value;
		}
	}
});

//Study Preset
document.getElementById("study").addEventListener("click", () => {
	const presetValues = {
		blue: 18,
		violet: 74,
		pink: 13,
		white: 50,
	};
  
	for (const [color, value] of Object.entries(presetValues)) {
		const player = noisePlayers[color];
		if (player) {
			player.slider.value = value;
			player.gainNode.gain.value = value / 100;
			player.display.textContent = value;
		}
	}
});

//Ocean Preset
document.getElementById("ocean").addEventListener("click", () => {
	const presetValues = {
		red: 27,
		violet: 13,
		pink: 17,
		brown: 46,
		grey: 19,
	};
  
	for (const [color, value] of Object.entries(presetValues)) {
		const player = noisePlayers[color];
		if (player) {
			player.slider.value = value;
			player.gainNode.gain.value = value / 100;
			player.display.textContent = value;
	  	}
	}
});

//Outdoors Preset
document.getElementById("outdoors").addEventListener("click", () => {
	const presetValues = {
		red: 27,
		violet: 13,
		pink: 17,
		brown: 46,
		grey: 19,
	};
  
	for (const [color, value] of Object.entries(presetValues)) {
		const player = noisePlayers[color];
		if (player) {
			player.slider.value = value;
			player.gainNode.gain.value = value / 100;
			player.display.textContent = value;
		}
	}
});
