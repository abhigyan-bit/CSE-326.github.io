const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");
const listedCount = document.getElementById("listedCount");

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
            '<td>' + product.name + '</td><td>' + product.category + '</td>' +
            '<td>₹' + product.price + '</td><td>' + product.quantity + '</td>' +
            '<td>' + product.condition + '</td><td>' + product.delivery + '</td>' +
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
            localStorage.setItem("localVibeProducts", JSON.stringify(products));

            alert("Product added successfully!");
            productForm.reset();
            showProducts();
        };

        reader.readAsDataURL(image);
    });
}