function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}

function isUserFavourite(userID) {
  return getFavourites().includes(userID);
}

function toggleFavourite(userID, btnElement) {
  let favourites = getFavourites();
  if (favourites.includes(userID)) {
    favourites = favourites.filter(id => id !== userID);
    btnElement.textContent = "☆";
  } else {
    favourites.push(userID);
    btnElement.textContent = "★";
  }
  localStorage.setItem("favourites", JSON.stringify(favourites));
}
