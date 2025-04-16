//Sleepy Preset
document.getElementById("sleepy").addEventListener("click", () => {
	const presetValues = {
		red: 27,
	  	violet: 13,
	  	pink: 17,
	  	brown: 46,
	 	grey: 19,
	};
	applyPreset(presetValues);
});

//Rain Preset
document.getElementById("rain").addEventListener("click", () => {
	const presetValues = {
		orange: 17,
		yellow: 81,
		blue: 35,
		brown: 19,
	};
	applyPreset(presetValues);
});

//Study Preset
document.getElementById("study").addEventListener("click", () => {
	const presetValues = {
		blue: 18,
		violet: 74,
		pink: 13,
		white: 50,
	};
	applyPreset(presetValues);
});

//Ocean Preset
document.getElementById("ocean").addEventListener("click", () => {
	const presetValues = {
		red: 62,
		blue: 13,
		pink: 21,
		brown: 39,
		grey: 16,
	};
	applyPreset(presetValues);
});

//Outdoors Preset
document.getElementById("outdoors").addEventListener("click", () => {
	const presetValues = {
		red: 23,
		orange: 87,
		yellow: 11,
		green: 62,
		blue: 4,
		violet: 5,
		pink: 8,
	};
	applyPreset(presetValues);
});
