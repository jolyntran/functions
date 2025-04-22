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

  // Presets button
  presetsButton.addEventListener("click", () => {
    const isVisible = presetsDrawer.classList.toggle("visible");
    sleepDrawer.classList.remove("visible");
    drawerWrapper.classList.toggle("drawer-open", isVisible);
  });

  // Sleep button
  sleepButton.addEventListener("click", () => {
    const isVisible = sleepDrawer.classList.toggle("visible");
    presetsDrawer.classList.remove("visible");
    drawerWrapper.classList.toggle("drawer-open", isVisible);
  });
});
