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

// Preset button
window.addEventListener("DOMContentLoaded", () => {
	const drawer = document.querySelector(".top-drawer");
	const presetsButton = document.getElementById("presets");

	if (drawer && presetsButton) {
		presetsButton.addEventListener("click", () => {
			drawer.classList.toggle("visible");
		});
	}
});

// Sleep timer 
