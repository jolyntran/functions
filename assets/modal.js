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