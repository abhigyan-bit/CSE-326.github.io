const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const vendor = {
            name: document.getElementById("owner").value.trim(),
            store: document.getElementById("store").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim().toLowerCase(),
            password: document.getElementById("pass").value
        };

        const oldVendor = JSON.parse(localStorage.getItem("localVibeVendor") || "null");

        if (oldVendor && oldVendor.email === vendor.email) {
            alert("This email is already registered. Please login.");
            return;
        }

        localStorage.setItem("localVibeVendor", JSON.stringify(vendor));
        localStorage.setItem("localVibeVendorName", vendor.name);
        localStorage.setItem("localVibeVendorEmail", vendor.email);
        window.location.href = "vendor-dashboard.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const vendor = JSON.parse(localStorage.getItem("localVibeVendor") || "null");
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        if (!vendor) {
            alert("Please create an account first.");
            window.location.href = "vendor-signup.html";
        } else if (email === vendor.email && password === vendor.password) {
            localStorage.setItem("localVibeVendorName", vendor.name);
            localStorage.setItem("localVibeVendorEmail", vendor.email);
            window.location.href = "vendor-dashboard.html";
        } else {
            alert("Email or password is incorrect.");
        }
    });
}

const welcomeName = document.getElementById("welcomeName");

if (welcomeName) {
    const name = localStorage.getItem("localVibeVendorName");

    if (!name) {
        window.location.href = "index.html";
    } else {
        welcomeName.textContent = "Hello, " + name + "!";
    }
}

const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {
    logoutLink.addEventListener("click", function () {
        localStorage.removeItem("localVibeVendorName");
        localStorage.removeItem("localVibeVendorEmail");
    });
}