const productForm = document.getElementById("productForm");

function safeText(value) {
    return String(value).replace(/[&<>"']/g, function (letter) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[letter];
    });
}

function showProducts() {
    const products = JSON.parse(localStorage.getItem("localVibeProducts")) || [];
    const vendorEmail = localStorage.getItem("localVibeVendorEmail");
    const myProducts = products.filter(function (product) {
        return product.vendorEmail === vendorEmail;
    });

    const productsList = document.getElementById("productsList");
    const listedCount = document.getElementById("listedCount");

    listedCount.textContent = myProducts.length;
    productsList.innerHTML = "";

    if (myProducts.length === 0) {
        productsList.innerHTML = '<tr><td colspan="8">No products added yet.</td></tr>';
        return;
    }

    myProducts.forEach(function (product) {
        productsList.innerHTML +=
            '<tr>' +
            '<td><img class="product-thumb" src="' + product.image + '" alt="Product photo"></td>' +
            '<td>' + safeText(product.name) + '</td>' +
            '<td>' + safeText(product.category) + '</td>' +
            '<td>₹' + safeText(product.price) + '</td>' +
            '<td>' + safeText(product.quantity) + '</td>' +
            '<td>' + safeText(product.condition) + '</td>' +
            '<td>' + safeText(product.delivery) + '</td>' +
            '<td><span class="status">Active</span></td>' +
            '</tr>';
    });
}

if (productForm) {
    showProducts();

    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const imageFile = document.getElementById("image").files[0];

        if (!imageFile || !imageFile.type.startsWith("image/")) {
            alert("Please select a valid product photo.");
            return;
        }

        if (imageFile.size > 700000) {
            alert("Please choose an image smaller than 700 KB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function () {
            const product = {
                name: document.getElementById("product-name").value.trim(),
                category: document.getElementById("category").value,
                price: document.getElementById("price").value,
                quantity: document.getElementById("quantity").value,
                description: document.getElementById("description").value.trim(),
                image: reader.result,
                condition: document.getElementById("condition").value,
                code: document.getElementById("sku").value.trim(),
                delivery: document.getElementById("delivery").value,
                vendorEmail: localStorage.getItem("localVibeVendorEmail")
            };

            const products = JSON.parse(localStorage.getItem("localVibeProducts")) || [];
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

        reader.readAsDataURL(imageFile);
    });
}
