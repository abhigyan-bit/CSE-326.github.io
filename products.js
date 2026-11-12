const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");
const listedCount = document.getElementById("listedCount");

function safeText(value) {
    return String(value).replace(/[&<>"']/g, function (letter) {
        return {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[letter];
    });
}

function showProducts() {
    const products = JSON.parse(localStorage.getItem("localVibeProducts") || "[]");
    const email = localStorage.getItem("localVibeVendorEmail");
    const myProducts = products.filter(function (product) {
        return product.vendorEmail === email;
    });

    listedCount.textContent = myProducts.length;
    productsList.innerHTML = "";

    if (myProducts.length === 0) {
        productsList.innerHTML = '<tr><td colspan="8">No products added yet.</td></tr>';
        return;
    }

    myProducts.forEach(function (product) {
        productsList.innerHTML +=
            '<tr><td><img class="product-thumb" src="' + product.image + '" alt="Product photo"></td>' +
            '<td>' + safeText(product.name) + '</td><td>' + safeText(product.category) + '</td>' +
            '<td>₹' + safeText(product.price) + '</td><td>' + safeText(product.quantity) + '</td>' +
            '<td>' + safeText(product.condition) + '</td><td>' + safeText(product.delivery) + '</td>' +
            '<td><span class="status">Active</span></td></tr>';
    });
}

if (productForm) {
    showProducts();

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const image = document.getElementById("image").files[0];

        if (!image || !image.type.startsWith("image/")) {
            alert("Please select a product photo.");
            return;
        }

        if (image.size > 700000) {
            alert("Please choose an image smaller than 700 KB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            const product = {
                name: document.getElementById("product-name").value,
                category: document.getElementById("category").value,
                price: document.getElementById("price").value,
                quantity: document.getElementById("quantity").value,
                description: document.getElementById("description").value,
                image: reader.result,
                condition: document.getElementById("condition").value,
                delivery: document.getElementById("delivery").value,
                vendorEmail: localStorage.getItem("localVibeVendorEmail")
            };

            const products = JSON.parse(localStorage.getItem("localVibeProducts") || "[]");
            products.push(product);

            try {
                localStorage.setItem("localVibeProducts", JSON.stringify(products));
                alert("Product added successfully!");
                productForm.reset();
                showProducts();
            } catch (error) {
                alert("Storage is full. Please use a smaller photo.");
            }
        };

        reader.readAsDataURL(image);
    });
}