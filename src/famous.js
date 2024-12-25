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
    
    const celebrityProfile = document.getElementById("celebrity-profile");

    // Single celebrity data
    const celebrity = {
        name: "Benedict Cumberbatch",
        category: "Actor, Producer",
        born: "July 19, 1976 · Hammersmith, London, England, UK",
        image: "assets/B.jpg",
        bio: "Benedict Cumberbatch, born in London, is the son of actors Wanda Ventham and Timothy Carlton. He attended Brambletye and Harrow schools, where he developed a love for acting. After teaching English in a Tibetan monastery, he studied drama at Manchester University and the London Academy of Music and Dramatic Art. He gained fame as Stephen Hawking in <em>Hawking</em> (2004) and as Sherlock Holmes in <em>Sherlock</em> (2010). Notable film roles include <em>War Horse</em>, <em>12 Years a Slave</em>, <em>Star Trek Into Darkness</em>, and <em>The Imitation Game</em>, for which he earned an Oscar nomination. In 2015, he was appointed a CBE for his contributions to acting and charity. Cumberbatch married theatre director Sophie Hunter in 2015, and they have three sons.e.",
        filmography: [
            { title: "Doctor Strange (Actor)", link: "film.html" },
            { title: "Sherlock (Actor)", link: "film.html" },
            { title: "The Imitation Game (Actor)", link: "film.html" },
            { title: "Patrick Melrose (Producer)", link: "film.html" },
        ],
    };

    // Populate the profile dynamically
    const profileHTML = `
        <div>
            <div class="d-flex flex-wrap align-items-center mb-4">
                <img src="${celebrity.image}" alt="${celebrity.name}" class="rounded-circle me-4 mb-3 profile-img img-fluid">
                <div>
                    <h2 class="h4 mb-1">${celebrity.name}</h2>
                    <p class="mb-1">${celebrity.category}</p>
                    <p><strong>Born:</strong> ${celebrity.born}</p>
                </div> 
            </div>
            <p><strong>Biography:</strong> ${celebrity.bio}</p>
            
            <h3 class="h5 mt-4">Filmography</h3>
            <ul class="list-decimal ps-4">
                ${celebrity.filmography.map(movie => `
                    <li class="list-group-item">
                        <a href="${movie.link}" class="text-decoration-none">${movie.title}</a>
                    </li>
                `).join("")}
            </ul>
        </div>
    `;

    celebrityProfile.innerHTML = profileHTML;
});


