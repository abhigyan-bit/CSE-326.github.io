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

const passwordToggle = document.querySelector(".password-toggle");
const passwordInput = document.querySelector("[data-password-field]");

if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.textContent = "Hide";
            passwordToggle.setAttribute("aria-label", "Hide password");
        } else {
            passwordInput.type = "password";
            passwordToggle.textContent = "Show";
            passwordToggle.setAttribute("aria-label", "Show password");
        }
    });
}
