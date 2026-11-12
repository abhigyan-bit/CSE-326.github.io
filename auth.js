
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

    const oldData = localStorage.getItem("localVibeVendor");
    if (oldData !== null) {
      const oldVendor = JSON.parse(oldData);
      if (oldVendor.email === vendor.email) {
        alert("This email is already registered. Please login.");
        return;
      }
    }

    localStorage.setItem("localVibeVendor", JSON.stringify(vendor));
    localStorage.setItem("localVibeVendorName", vendor.name);
    localStorage.setItem("localVibeVendorEmail", vendor.email);
    alert("Registration successful! Welcome to LocalVibe.");
    window.location.href = "vendor-dashboard.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const savedData = localStorage.getItem("localVibeVendor");

    if (savedData === null) {
      alert("No vendor account found. Please sign up first.");
      window.location.href = "vendor-signup.html";
    } else {
      const vendor = JSON.parse(savedData);

      if (email === vendor.email && password === vendor.password) {
        localStorage.setItem("localVibeVendorName", vendor.name);
        localStorage.setItem("localVibeVendorEmail", vendor.email);
        window.location.href = "vendor-dashboard.html";
      } else {
        alert("Email or password is incorrect.");
      }
    }
  });
}

const welcomeName = document.getElementById("welcomeName");

if (welcomeName) {
  const vendorName = localStorage.getItem("localVibeVendorName");

  if (vendorName === null) {
    window.location.href = "index.html";
  } else {
    welcomeName.textContent = "Hello, " + vendorName + "!";

    if (localStorage.getItem("localVibeVendorEmail") === null) {
      const savedVendor = JSON.parse(localStorage.getItem("localVibeVendor"));
      if (savedVendor) {
        localStorage.setItem("localVibeVendorEmail", savedVendor.email);
      }
    }
  }
}

const logoutLink = document.getElementById("logoutLink");

if (logoutLink) {
  logoutLink.addEventListener("click", function () {
    localStorage.removeItem("localVibeVendorName");
    localStorage.removeItem("localVibeVendorEmail");
  });
}
