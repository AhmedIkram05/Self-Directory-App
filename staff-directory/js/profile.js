function loadUserProfile() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const params = new URLSearchParams(window.location.search);
    const userID = params.get("userID");

    const user = users.find(u => u.login.uuid === userID);
    const profileContainer = document.getElementById("profileContainer");
    
    if (!user) {
        profileContainer.innerHTML = "<h3>User not found</h3>";
        return;
    }

    // Changed the back button class to btn-primary for blue styling.
    profileContainer.innerHTML = `
        <div class="card mx-auto">
            <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first}">
            <div class="card-body">
                <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Location: ${user.location.city}, ${user.location.country}</p>
                <a href="index.html" class="btn btn-primary">Back to Search</a>
            </div>
        </div>
    `;
}

loadUserProfile();