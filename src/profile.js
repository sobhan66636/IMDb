window.onload = function() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');

    // If user is not logged in, redirect to login page
    if (isLoggedIn !== "true") {
        window.location.href = "auth.html?error=You%20need%20to%20log%20in%20first"; // Redirect to the login page
    }
    else {
        const navbar = document.getElementById('navbar');
        const userEmail = localStorage.getItem('userEmail').split('@')[0];
        let navbarHTML = `
            <li class="nav-item">
                <a class="nav-link" href="home.html">Home</a>
            </li>
            <li>
                <span class="nav-link">|</span>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="profile.html">${userEmail}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="logout">Log out</a>
            </li>
        `;
        navbar.innerHTML = navbarHTML;

        const logoutLink = document.getElementById('logout');
        if (logoutLink) {
            logoutLink.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default action of the link
                localStorage.clear();
                alert("Logout successful!");
                window.location.href = "home.html"; // Redirect to home page or another page
            });
    }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (isLoggedIn !== "true") {
        window.location.href = "auth.html?error=You%20need%20to%20log%20in%20first"; // Redirect to login page
        return; // Stop further execution
    }
    // Fetch user data from localStorage
    const userEmail = localStorage.getItem("userEmail");
    const userPassword = localStorage.getItem("userPassword");
    const userCreatedAt = localStorage.getItem("createdAt");

    // Format the creation date to a user-friendly format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    // User profile data (retrieved from localStorage)
    const userProfile = {
        name: userEmail ? userEmail.split('@')[0] : "Guest", // Use part of the email for the name
        email: userEmail || "Not provided",
        joinDate: userCreatedAt ? formatDate(userCreatedAt) : "Not available",
        profileImage: "assets/profile.jpg" // Default profile image
    };

    // Function to display the user profile dynamically
    const createProfileSection = (profile) => `
        <div class="col-auto">
            <img src="${profile.profileImage}" alt="Profile Picture" class="rounded-circle" width="100px" height="100px">
        </div>
        <div class="col">
            <h2 class="fs-3">${profile.name}</h2>
            <p class="fs-6">Email: ${profile.email}</p>
            <p class="fs-6">Joined: ${profile.joinDate}</p>
        </div>
    `;

    // Create star rating system
    const generateStars = (rating) => {
        return [1, 2, 3, 4, 5].map(ratingValue => `
            <span data-rating="${ratingValue}" class="rating-star">${ratingValue <= rating ? '★' : '☆'}</span>
        `).join('');
    };
    // Create card function for displaying movies
    const createCard = (item) => `
        <div class="col">
            <div class="card text-center d-flex flex-column h-100">
                <img src="${item.poster}" alt="${item.title} Poster" class="card-img-top">
                <div class="card-body">
                    <a href="${item.link}" class="card-title h5">${item.title}</a>
                    <p class="card-text">IMDb Rating: ${item.imdbRating}</p>
                    ${item.yourRating ? `<p class="card-text">Your Rating: ${generateStars(item.yourRating)}</p>` : ""}
                </div>
            </div>
        </div>
    `;

    // Insert the Profile Section dynamically
    const profileSection = createProfileSection(userProfile);
    document.getElementById('profile-section').innerHTML = profileSection;

    // Fetch rated movies and watchlist from localStorage
    const ratedMovies = [];
    const watchlist = [];

    // Loop through localStorage keys and categorize films
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.endsWith('_rated')) {
            const filmData = JSON.parse(localStorage.getItem(key));
            ratedMovies.push(filmData); // Store rated films
        } else if (key && key.endsWith('_watchlist')) {
            const filmData = JSON.parse(localStorage.getItem(key));
            watchlist.push(filmData); // Store watchlist films
        }
    }

    // Append cards to the container
    const appendCards = (category, data, createCardFunc) => {
        const container = document.getElementById(`${category}-section`);
        if (data.length > 0) {
            const sectionTitle = `<h3 class="fs-3">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;
            const cards = data.map(createCardFunc).join('');
            container.innerHTML = sectionTitle + `<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">${cards}</div>`;
        }
    };

    // Call appendCards for both Rated Movies and Watchlist
    appendCards("rated-movies", ratedMovies, createCard);
    appendCards("watchlist", watchlist, createCard);
});




