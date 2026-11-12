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
