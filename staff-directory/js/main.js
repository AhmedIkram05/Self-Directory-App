let currentPage = 1;
let isFetching = false;

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const appendUsers = newUsers => {
  const container = document.getElementById("userContainer");
  newUsers.forEach(user => container.appendChild(createUserCard(user)));
};

const fetchUsers = async (append = false) => {
  showSpinner();
  try {
    const response = await fetch(`https://randomuser.me/api/?results=50&page=${currentPage}`);
    const data = await response.json();
    currentPage++;
    let stored = JSON.parse(localStorage.getItem("users")) || [];
    const users = append ? stored.concat(data.results) : data.results;
    localStorage.setItem("users", JSON.stringify(users));
    return data.results;
  } catch (error) {
    console.error("Error fetching users:", error);
    document.getElementById("userContainer").innerHTML =
      "<p class='text-danger'>Failed to load users. Please try again later.</p>";
    return [];
  } finally {
    hideSpinner();
    isFetching = false;
  }
};

const searchUsers = query => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const container = document.getElementById("userContainer");
  // Clear container unless appending infinite scroll results
  if (query.trim() !== "") container.innerHTML = "";
  let filtered = users.filter(user =>
    user.name.first.toLowerCase().includes(query.toLowerCase()) ||
    user.name.last.toLowerCase().includes(query.toLowerCase())
  );
  if (document.getElementById("favouriteFilter")?.checked) {
    filtered = filtered.filter(user => isUserFavourite(user.login.uuid));
  }
  container.innerHTML = "";
  filtered.forEach(user => container.appendChild(createUserCard(user)));
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("searchInput").addEventListener("input", e => {
    searchUsers(e.target.value);
  });

  document.getElementById("favouriteFilter").addEventListener("change", () => {
    searchUsers(document.getElementById("searchInput").value);
  });

  // Initial fetch
  if (!localStorage.getItem("users")) {
    fetchUsers().then(() => searchUsers(""));
  } else {
    searchUsers("");
  }

  // Infinite scrolling
  window.addEventListener("scroll", () => {
    if (isFetching) return;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      document.getElementById("searchInput").value.trim() === "" &&
      !document.getElementById("favouriteFilter")?.checked
    ) {
      isFetching = true;
      fetchUsers(true).then(newUsers => appendUsers(newUsers));
    }
  });

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