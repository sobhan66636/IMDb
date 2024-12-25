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
    const filmDetails = document.getElementById("film-details");

    // Sample film data
    const film = {
        title: "Doctor Strange",
        poster: "assets/4.jpg",
        imdbRating: "7.5",
        yourRating: 0, // User rating (will be fetched from localStorage)
        type: "Movie",
        year: 2016,
        duration: "1h 55m",
        genre: "Action, Adventure",
        summary: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
        director: { name: "Scott Derrickson", link: "famous.html?name=Scott+Derrickson" },
        writer: { name: "Jon Spaihts", link: "famous.html?name=Jon+Spaihts" },
        stars: [
            { name: "Benedict Cumberbatch", link: "famous.html?name=Benedict+Cumberbatch" },
            { name: "Chiwetel Ejiofor", link: "famous.html?name=Chiwetel+Ejiofor" },
            { name: "Rachel McAdams", link: "famous.html?name=Rachel+McAdams" },
        ],
        watchlistKey: "watchlist",
        link: "film.html" // Example link to the film
    };

    // Fetch user rating from localStorage if it exists
    const savedRating = localStorage.getItem(film.title);
    if (savedRating) {
        film.yourRating = savedRating;
    }

    // Generate the HTML dynamically
    const filmHTML = `
        <img src="${film.poster}" loading="lazy" alt="${film.title} Poster" class="img-fluid d-block mx-auto w-100 maxwidth" width="100%" height="auto">
        <div class="p-4 flex-grow-1 text-center text-md-start">
            <h2 class="text-primary display-4 mb-4">${film.title}</h2>
            <div>
                <strong>IMDb Rating:</strong> ${film.imdbRating}
                <strong class="ms-3">Your Rating:</strong>
                <span class="rating-stars text-warning" id="your-rating">
                    ${[1, 2, 3, 4, 5].map(rating => `
                        <span data-rating="${rating}" class="rating-star">${rating <= film.yourRating ? '★' : '☆'}</span>
                    `).join('')}
                </span>
            </div>
            <div class="my-3 text-muted small">
                <strong>Type:</strong> ${film.type}
                <span class="ms-3"><strong>Year:</strong> ${film.year}</span>
                <span class="ms-3"><strong>Duration:</strong> ${film.duration}</span>
            </div>
            <div class="text-dark mb-3">
                <strong>Genre:</strong> ${film.genre}
            </div>
            <div class="mb-3"><strong>Summary:</strong> ${film.summary}</div>
            <div>
                <p><strong>Director:</strong> <a href="${film.director.link}" class="text-decoration-none">${film.director.name}</a></p>
                <p><strong>Writer:</strong> <a href="${film.writer.link}" class="text-decoration-none">${film.writer.name}</a></p>
                <p><strong>Stars:</strong> ${film.stars.map(star => `
                    <a href="${star.link}" class="text-decoration-none">${star.name}</a>
                `).join(", ")}</p>
            </div>
            <button class="btn btn-primary mt-3" id="add-to-watchlist" aria-label="Add Film to Watchlist">Add to Watchlist</button>
        </div>
    `;

    // Insert the generated HTML into the page
    filmDetails.innerHTML = filmHTML;

    // Add interactivity for the rating stars
    const ratingStars = document.getElementById("your-rating");

    // Hover effect to highlight stars
    ratingStars.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("rating-star")) {
            const rating = event.target.getAttribute("data-rating");
            document.querySelectorAll(".rating-star").forEach(star => {
                star.textContent = star.getAttribute("data-rating") <= rating ? "★" : "☆";
            });
        }
    });

    // Reset to original state when mouse leaves the stars
    ratingStars.addEventListener("mouseout", () => {
        document.querySelectorAll(".rating-star").forEach(star => {
            star.textContent = star.getAttribute("data-rating") <= film.yourRating ? "★" : "☆";
        });
    });

    // Handle star click for rating
    ratingStars.addEventListener("click", (event) => {
        if (event.target.classList.contains("rating-star")) {
            const rating = event.target.getAttribute("data-rating");
            film.yourRating = rating;

            // Save the rating to localStorage
            localStorage.setItem(film.title, rating);

            // Update the film details in localStorage (store only if rated)
            localStorage.setItem(film.title + '_rated', JSON.stringify({
                title: film.title,
                imdbRating: film.imdbRating,
                link: film.link,
                poster: film.poster,
                yourRating: film.yourRating
            }));

            // Highlight the stars up to the selected rating
            document.querySelectorAll(".rating-star").forEach(star => {
                star.textContent = star.getAttribute("data-rating") <= rating ? "★" : "☆"; // Update star content to full (★) or empty (☆)
            });

            alert(`You rated this movie: ${rating} stars!`);
        }
    });

    // Handle "Add to Watchlist" functionality
    const addToWatchlistButton = document.getElementById("add-to-watchlist");
    const isLoggedIn = localStorage.getItem("userLoggedIn") === "true"; // Check if the user is logged in

    // Function to update the button state
    const updateButtonState = () => {
        const watchlist = JSON.parse(localStorage.getItem(film.watchlistKey)) || [];
        if (watchlist.includes(film.title)) {
            addToWatchlistButton.disabled = false;
            addToWatchlistButton.textContent = "Delete from Watchlist";
            addToWatchlistButton.removeEventListener("click", addToWatchlist);
            addToWatchlistButton.addEventListener("click", deleteFromWatchlist);
        } else {
            if (!isLoggedIn) {
                addToWatchlistButton.disabled = true;
                addToWatchlistButton.textContent = "Please log in to add to watchlist";
            } else {
                addToWatchlistButton.disabled = false;
                addToWatchlistButton.textContent = "Add to Watchlist";
                addToWatchlistButton.removeEventListener("click", deleteFromWatchlist);
                addToWatchlistButton.addEventListener("click", addToWatchlist);
            }
        }
    };

    // Function to add to watchlist
    const addToWatchlist = () => {
        const watchlist = JSON.parse(localStorage.getItem(film.watchlistKey)) || [];
        watchlist.push(film.title);
        localStorage.setItem(film.watchlistKey, JSON.stringify(watchlist));

        // Save the film in the watchlist without rating
        localStorage.setItem(film.title + '_watchlist', JSON.stringify({
            title: film.title,
            imdbRating: film.imdbRating,
            link: film.link,
            poster: film.poster
        }));

        alert(`${film.title} added to your watchlist!`);
        updateButtonState();
    };

    // Function to delete from watchlist
    const deleteFromWatchlist = () => {
        const watchlist = JSON.parse(localStorage.getItem(film.watchlistKey)) || [];
        const index = watchlist.indexOf(film.title);
        if (index > -1) {
            watchlist.splice(index, 1); // Remove the film from the watchlist
            localStorage.setItem(film.watchlistKey, JSON.stringify(watchlist));
            localStorage.removeItem(film.title + '_watchlist'); // Remove the film from localStorage
        }

        alert(`${film.title} has been removed from your watchlist.`);
        updateButtonState();
    };

    // Initial check to set the button state
    updateButtonState();
});
