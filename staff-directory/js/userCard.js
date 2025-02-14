function createUserCard(user) {
  const card = document.createElement("div");
  card.className = "col-md-4 mb-3";
  card.innerHTML = `
    <div class="card">
      <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first}">
      <div class="card-body text-center">
        <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
        <p class="card-text">${user.email}</p>
        <a href="profile.html?userID=${user.login.uuid}" class="btn btn-primary">View Profile</a>
        <!-- Added favourite button -->
        <button class="btn btn-outline-warning fav-btn" onclick="toggleFavourite('${user.login.uuid}', this)">
          ${isUserFavourite(user.login.uuid) ? '★' : '☆'}
        </button>
      </div>
    </div>
  `;
  return card;
}