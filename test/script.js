const toggleButton = document.getElementById('toggle-theme');
let isDarkMode = false;

toggleButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    toggleButton.textContent = 'Cambiar a Modo Claro';
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    toggleButton.textContent = 'Cambiar a Modo Oscuro';
  }
});
