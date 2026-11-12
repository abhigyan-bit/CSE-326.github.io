const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.checked = localStorage.getItem("localVibeTheme") === "dark";

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            localStorage.setItem("localVibeTheme", "dark");
        } else {
            localStorage.setItem("localVibeTheme", "light");
        }
    });
}

const passwordToggle = document.getElementById("show-password");
const passwordInput = document.querySelector("[data-password-field]");

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("change", function () {
        if (passwordToggle.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });
}
