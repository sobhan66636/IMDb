window.onload = function() {
    const isLoggedIn = localStorage.getItem('userLoggedIn'); // Check if the user is logged in

    // If user is logged in, redirect to home with an error message
    if (isLoggedIn === "true") {
        window.location.href = "home.html?error=You%20are%20already%20logged%20in"; // Redirect with error message
    }
    else {
        const navbar = document.getElementById('navbar');
        let navbarHTML = `
            <li class="nav-item">
                <a class="nav-link" href="home.html">Home</a>
            </li>
        `;
        navbar.innerHTML = navbarHTML;

        const urlParams = new URLSearchParams(window.location.search); // Parse the query string
        const errorMessage = urlParams.get('error'); // Get the 'error' parameter value

        if (errorMessage) {
            alert(decodeURIComponent(errorMessage)); // Decode and display the message
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem('userLoggedIn'); // Check if the user is logged in

    // If user is logged in, redirect to home with an error message
    if (isLoggedIn === "true") {
        window.location.href = "home.html?error=You%20are%20already%20logged%20in"; // Redirect with error message
    }
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const signupEmail = document.getElementById('signup-email');
    const signupPassword = document.getElementById('signup-password');

    // Clear local storage (optional, depending on your requirements)
    // localStorage.clear();

    // Check if user is already logged in and redirect if necessary
    if (localStorage.getItem("userLoggedIn") === "true") {
        window.location.href = "home.html?error=You%20are%20already%20logged%20in"; // Redirect with error message
    }

    // Show the appropriate form based on URL hash
    function showForm() {
        if (window.location.hash === '#signup') {
            loginForm.classList.add('d-none');
            signupForm.classList.remove('d-none');
        } else {
            signupForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
        }
    }

    // Add hashchange event listener to toggle forms when the hash changes
    window.addEventListener('hashchange', showForm);
    showForm(); // Run on page load

    // Handle login form submission
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = loginEmail.value;
        const password = loginPassword.value;
        
        // Validate credentials - here using hardcoded values for simplicity
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("loggedInUser", email);
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to homepage or dashboard
        } else {
            alert("Invalid credentials.");
        }
    });

    // Handle signup form submission
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = signupEmail.value;
        const password = signupPassword.value;
        const dateOfCreation = new Date().toISOString();
        // Store new user details in localStorage
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        localStorage.setItem("createdAt", dateOfCreation);
        alert("Signup successful! You can now log in.");
    
        window.location.hash = "#login"; // Automatically show login form after signup
    });
});