// Help button
let button = document.querySelector('#help')
let modal = document.querySelector('#dialog') 
let closeButton = modal.querySelector('.close') 

button.onclick = () => { 
	modal.showModal() 
}

closeButton.onclick = () => {
	modal.close() 
}

modal.onclick = (event) => { 
	if (event.target == modal) { 
		modal.close() 
	}
}

// Preset drawer toggle
window.addEventListener("DOMContentLoaded", () => {
	const presetsDrawer = document.getElementById("presets-drawer");
	const sleepDrawer = document.getElementById("sleep-timer-drawer");
	const presetsButton = document.getElementById("presets");

	presetsButton.addEventListener("click", () => {
		presetsDrawer.classList.toggle("visible");
		sleepDrawer.classList.remove("visible"); // hide the other one
	});
});

// Sleep timer drawer toggle
window.addEventListener("DOMContentLoaded", () => {
	const sleepDrawer = document.getElementById("sleep-timer-drawer");
	const presetsDrawer = document.getElementById("presets-drawer");
	const sleepButton = document.getElementById("sleep");

	sleepButton.addEventListener("click", () => {
		sleepDrawer.classList.toggle("visible");
		presetsDrawer.classList.remove("visible"); // hide the other one
	});
});
