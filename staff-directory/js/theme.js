(function() {
  const body = document.body;
  const toggleButtons = document.querySelectorAll("#themeToggle");
  
  // Update the button to show a sun (☀️) when dark mode is on
  // and a moon (🌙) when light mode is active.
  const setButtonSymbol = () => {
    toggleButtons.forEach(btn => {
      btn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
  };

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }
  setButtonSymbol();

  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      body.classList.add("theme-transition");
      setTimeout(() => {
        body.classList.remove("theme-transition");
      }, 1000);
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
      setButtonSymbol();
    });
  });
})();
