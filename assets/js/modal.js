// Help button
let button = document.querySelector("#help");
let modal = document.querySelector("#dialog");
let closeButton = modal.querySelector(".close");

button.onclick = () => modal.showModal();
closeButton.onclick = () => modal.close();
modal.onclick = (event) => {
  if (event.target === modal) modal.close();
};

// Drawer toggle
window.addEventListener("DOMContentLoaded", () => {
  const presetsDrawer = document.getElementById("presets-drawer");
  const sleepDrawer = document.getElementById("sleep-timer-drawer");
  const presetsButton = document.getElementById("presets");
  const sleepButton = document.getElementById("sleep");
  const drawerWrapper = document.querySelector(".drawer");

// Active presets button
const activePresetsSVG = `<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#666"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#666" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;

// Active sleep button
const activeSleepSVG = `<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 5.5L5 3.5M21 5.5L19 3.5M10 10.5H14L10 14.5H14M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
  
// Presets button
presetsButton.addEventListener("click", () => {
  const isVisible = presetsDrawer.classList.toggle("visible");
    sleepDrawer.classList.remove("visible");
    drawerWrapper.classList.toggle("drawer-open", isVisible);
    presetsButton.classList.toggle("active");
    
    if (presetsButton.classList.contains("active")) {
      presetsButton.innerHTML = activePresetsSVG;
    } else {
      presetsButton.innerHTML = `<svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#999999" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
    }
  }
);

// Sleep button
sleepButton.addEventListener("click", () => {
  const isVisible = sleepDrawer.classList.toggle("visible");
    presetsDrawer.classList.remove("visible");
    drawerWrapper.classList.toggle("drawer-open", isVisible);
    sleepButton.classList.toggle("active");
    
    if (sleepButton.classList.contains("active")) {
      sleepButton.innerHTML = activeSleepSVG;
    } else {
      sleepButton.innerHTML = `<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 5.5L5 3.5M21 5.5L19 3.5M10 10.5H14L10 14.5H14M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
    }
  });
});
