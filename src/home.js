window.onload = function() {
    const isLoggedIn = localStorage.getItem('userLoggedIn'); // Check if the user is logged in
    const navbar = document.getElementById('navbar');

    let navbarHTML = `
        <li class="nav-item">
            <a class="nav-link" href="#">Top 250 Movies</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Top 250 TV Shows</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Popular Movies</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Popular TV Shows</a>
        </li>
        <li>
            <span class="nav-link">|</span>
        </li>
        
    `;

    if (isLoggedIn) {
        // If logged in, show Profile and Log out
        const userEmail = localStorage.getItem('userEmail').split('@')[0];
        navbarHTML += `
            <li class="nav-item">
                <a class="nav-link" href="profile.html">${userEmail}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="logout">Log out</a>
            </li>
        `;
    } else {
        // If not logged in, show Login and Sign up
        navbarHTML += `
            <li class="nav-item">
                <a class="nav-link" href="auth.html#login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="auth.html#signup">Sign up</a>
            </li>
        `;
    }
    navbar.innerHTML = navbarHTML;

    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('error');
    
    if (errorMessage) {
        alert(errorMessage); // You can use a custom message display instead of alert
    }

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
document.addEventListener("DOMContentLoaded", () => {
    // Movie data
    const movies = [
        { title: "Avengers", image: "assets/1.jpg", imdbRating: "8", link: "film.html" },
        { title: "Wednesday", image: "assets/s2.jpg", imdbRating: "8", link: "film.html" },
        { title: "Sherlock Holmes", image: "assets/s3.jpg", imdbRating: "8", link: "film.html" }
    ];

    // Latest Releases data
    const releases = [
        { title: "Doctor Strange", image: "assets/4.jpg", imdbRating: "7.5", link: "film.html" },
        { title: "Movie", image: "assets/2.jpg", imdbRating: "7.5", link: "film.html" },
        { title: "Game of Thrones", image: "assets/s1.jpg", imdbRating: "7.5", link: "film.html" }
    ];

    // Celebrity data
    const celebrities = [
        { name: "Benedict Cumberbatch", image: "assets/B.jpg", link: "famous.html" }
    ];

    // Birthday data
    const birthdays = [
        { name: "Benedict Cumberbatch", image: "assets/B.jpg", link: "famous.html" }
    ];

    // Card creation functions
    const createMovieCard = (movie) => `
        <div class="col">
            <div class="card text-center d-flex flex-column h-100">
                <img src="${movie.image}" alt="${movie.title} Poster" class="card-img-top">
                <div class="card-body">
                    <a href="${movie.link}" class="card-title h5">${movie.title}</a>
                    <p class="card-text">IMDb Rating: ${movie.imdbRating}</p>
                </div>
            </div>
        </div>
    `;

    const createReleaseCard = (release) => `
        <div class="col">
            <div class="card text-center d-flex flex-column h-100">
                <img src="${release.image}" alt="${release.title} Poster" class="card-img-top">
                <div class="card-body">
                    <a href="${release.link}" class="card-title h5">${release.title}</a>
                    <p class="card-text">IMDb Rating: ${release.imdbRating}</p>
                </div>
            </div>
        </div>
    `;

    const createCelebrityCard = (celebrity) => `
        <div class="col">
            <div class="card text-center d-flex flex-column h-100">
                <img src="${celebrity.image}" alt="${celebrity.name} Image" class="card-img-top rounded-circle">
                <div class="card-body">
                    <a href="${celebrity.link}" class="card-title h6">${celebrity.name}</a>
                </div>
            </div>
        </div>
    `;

    const createBirthdayCard = (birthday) => `
        <div class="col">
            <div class="card text-center d-flex flex-column h-100">
                <img src="${birthday.image}" alt="${birthday.name} Image" class="card-img-top rounded-circle">
                <div class="card-body">
                    <a href="${birthday.link}" class="card-title h6">${birthday.name}</a>
                </div>
            </div>
        </div>
    `;

    // Function to append cards to the container
    const appendCards = (containerId, data, createCardFunc) => {
        const container = document.getElementById(containerId);
        container.innerHTML = data.map(createCardFunc).join('');
    };

    // Append data to each section
    appendCards("movie-list", movies, createMovieCard);
    appendCards("release-list", releases, createReleaseCard);
    appendCards("celebrity-list", celebrities, createCelebrityCard);
    appendCards("birthday-list", birthdays, createBirthdayCard);

    // Handle the Enter key for searching
    const searchInput = document.getElementById('search-bar');
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            // Trigger the search when Enter key is pressed
            window.location.href = `search.html?query=${searchInput.value}`;
        }
    });

    // Search button functionality (for non-Enter key users)
    document.getElementById('search-button').addEventListener('click', function() {
        const searchQuery = searchInput.value;
        window.location.href = `search.html?query=${searchQuery}`;
    });
    
});



