document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = form.elements["username"];
    const passwordInput = form.elements["password"];
    const confirmationInput = form.elements["confirmation"];
    const errorMessageDiv = document.getElementById("error-message");

    form.addEventListener("submit", function (event) {
        // Clear previous error messages
        errorMessageDiv.innerHTML = "";

        // Validate username length
        if (usernameInput.value.length < 8) {
            event.preventDefault();  // Prevent form submission
            errorMessageDiv.innerHTML = `<div class="alert alert-danger">Username Must be at least 8 characters</div>`;
            return;
        }

        // Validate passwords match
        if (passwordInput.value !== confirmationInput.value) {
            event.preventDefault();  // Prevent form submission
            errorMessageDiv.innerHTML += `<div class="alert alert-danger">Passwords Do Not Match</div>`;
            return;
        }
        
        // Make Sure Password is at least 8 characters
        if (passwordInput.value < 7) {
            event.preventDefault();  // Prevent form submission
            errorMessageDiv.innerHTML += `<div class="alert alert-danger">Password Must be At least 8 Characters Long</div>`;
            return;
        }   
    });
});