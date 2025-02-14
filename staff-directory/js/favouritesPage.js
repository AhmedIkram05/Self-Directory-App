function loadFavourites() {
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const favIDs = JSON.parse(localStorage.getItem("favourites")) || [];
  const favourites = allUsers.filter(user => favIDs.includes(user.login.uuid));
  const container = document.getElementById("favouritesContainer");
  
  if (favourites.length === 0) {
    container.innerHTML = "<p class='text-center'>No favourites added.</p>";
    return;
  }
  
  container.innerHTML = "";
  favourites.forEach(user => {
    container.appendChild(createUserCard(user));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFavourites();

  const backToTopBtn = document.getElementById("backToTopBtn");

  // Show or hide the button based on scroll position
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Scroll back to the top when the button is clicked
  backToTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });
});
