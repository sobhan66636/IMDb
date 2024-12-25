window.onload = function() {
    const isLoggedIn = localStorage.getItem('userLoggedIn'); // Check if the user is logged in
    const navbar = document.getElementById('navbar');

    let navbarHTML = `
        <li class="nav-item">
            <a class="nav-link" href="home.html">Home</a>
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
    // Get the search query from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query')?.toLowerCase() || '';
    
    // Display the search query in the title
    document.getElementById("search-query").textContent = searchQuery;

    // Movie, TV Show, Celebrity data
    const movies = [
        { title: "Avengers", image: "assets/1.jpg", imdbRating: "8", link: "film.html" },
        { title: "Doctor Strange", image: "assets/4.jpg", imdbRating: "7.5", link: "film.html" },
        { title: "Movie", image: "assets/2.jpg", imdbRating: "7.5", link: "film.html" }
    ];

    const tvShows = [
        { title: "Game of Thrones", image: "assets/s1.jpg", imdbRating: "7.5", link: "film.html" },
        { title: "Wednesday", image: "assets/s2.jpg", imdbRating: "8", link: "film.html" },
        { title: "Sherlock Holmes", image: "assets/s3.jpg", imdbRating: "8", link: "film.html" }
    ];

    const celebrities = [
        { name: "Benedict Cumberbatch", image: "assets/B.jpg", link: "famous.html" }
    ];

    // Filter function for search
    const filterContent = (data) => data.filter(item => 
        item.title?.toLowerCase().includes(searchQuery) || item.name?.toLowerCase().includes(searchQuery)
    );

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

    const createTvShowCard = (tvShow) => `
        <div class="col">
            <div class="card text-center d-flex flex-column h-100">
                <img src="${tvShow.image}" alt="${tvShow.title} Poster" class="card-img-top">
                <div class="card-body">
                    <a href="${tvShow.link}" class="card-title h5">${tvShow.title}</a>
                    <p class="card-text">IMDb Rating: ${tvShow.imdbRating}</p>
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

    // Function to append cards to the container
    const appendCards = (category, data, createCardFunc) => {
        const container = document.getElementById('category-results');
        if (data.length > 0) {
            const sectionTitle = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;
            const cards = data.map(createCardFunc).join('');
            container.innerHTML += `<h2 class="mb-4">${sectionTitle}</h2>`+ `<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">${cards}</div>`;
        }
    };

    // Append filtered data to the respective categories
    appendCards("Movies", filterContent(movies), createMovieCard);
    appendCards("TV Shows", filterContent(tvShows), createTvShowCard);
    appendCards("Celebrities", filterContent(celebrities), createCelebrityCard);

    const searchInput = document.getElementById('search-bar');
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            window.location.href = `search.html?query=${searchInput.value}`;
        }
    });

    // Handle the Search button click
    document.getElementById('search-button').addEventListener('click', function() {
        const searchQuery = searchInput.value;
        window.location.href = `search.html?query=${searchQuery}`;
    });
});
