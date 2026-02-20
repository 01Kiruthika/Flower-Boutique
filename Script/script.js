// ================= CART DATA =================

// Get cart data from localStorage
// If cart is not found, create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= ADD TO CART =================
function addToCart(btn) {

    // Select the parent card of clicked button
    let card = btn.closest(".card-des");

    // Get product details from data attributes
    let id = Number(card.dataset.id);       // product id
    let name = card.dataset.name;           // product name
    let price = Number(card.dataset.price); // product price
    let img = card.dataset.img;             // product image

    // Check if product already exists in cart
    let existing = cart.find(p => p.id === id);

    if (existing) {
        // If product exists, increase quantity
        existing.qty += 1;
    } else {
        // If product not exists, add new product
        cart.push({
            id: id,
            name: name,
            price: price,
            img: img,
            qty: 1
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count in navbar
    updateCartCount();
}


// ================= UPDATE CART COUNT =================
function updateCartCount() {

    // Calculate total quantity of all products
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

    // Get cart count element
    let el = document.getElementById("cartCount");

    // If element exists, show count
    if (el) el.innerText = totalQty;
}


// ================= RENDER CART PAGE =================
function renderCart() {

    // Get cart container element
    let container = document.getElementById("cartContainer");

    // Get total amount element
    let totalEl = document.getElementById("totalAmount");

    // If cart page not available, stop function
    if (!container) return;

    // Clear previous cart content
    container.innerHTML = "";

    // If cart is empty
    if (cart.length === 0) {
        container.innerHTML = `<h3 style="text-align:center">No records found</h3>`;
        if (totalEl) totalEl.innerText = "0";
        updateCartCount();
        return;
    }

    // Variable to store total amount
    let total = 0;

    // Loop through each cart item
    cart.forEach(item => {

        // Calculate total price
        total += item.price * item.qty;

        // Create cart item UI
        container.innerHTML += `
            <div class="cart-card">
                <img src="${item.img}" width="100">

                <div>
                    <h5>${item.name}</h5>
                    <p>Rs.${item.price}</p>

                    <button onclick="decreaseQty(${item.id})">-</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty(${item.id})">+</button>

                    <button onclick="removeItem(${item.id})">Delete</button>
                </div>
            </div>
        `;
    });

    // Show total amount
    if (totalEl) totalEl.innerText = total;

    // Update cart count
    updateCartCount();
}


// ================= INCREASE QUANTITY =================
function increaseQty(id) {

    // Find product using id
    let item = cart.find(p => p.id === id);

    if (item) {
        // Increase quantity
        item.qty += 1;

        // Save updated cart
        saveCart();
    }
}


// ================= DECREASE QUANTITY =================
function decreaseQty(id) {

    // Find product using id
    let item = cart.find(p => p.id === id);

    // If product not found, stop
    if (!item) return;

    if (item.qty > 1) {
        // If quantity more than 1, decrease it
        item.qty -= 1;
    } else {
        // If quantity is 1, remove product
        removeItem(id);
        return;
    }

    // Save updated cart
    saveCart();
}


// ================= REMOVE ITEM =================
function removeItem(id) {

    // Ask confirmation before delete
    let confirmDelete = confirm("Do you want to delete this product?");
    if (!confirmDelete) return;

    // Remove selected product from cart
    cart = cart.filter(item => item.id !== id);

    // Save updated cart
    saveCart();
}


// ================= SAVE CART =================
function saveCart() {

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-render cart page
    renderCart();
}


// ================= BUY NOW =================
function buyNow() {

    // Check if cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Calculate total amount
    let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Ask purchase confirmation
    let confirmBuy = confirm(
        "Do you want to purchase?\n\nTotal Amount: Rs." + total
    );

    if (confirmBuy) {
        alert("Thank you for your purchase");

        // Clear cart from localStorage
        localStorage.removeItem("cart");

        // Reset cart array
        cart = [];

        // Update UI
        renderCart();
    }
}


// ================= PAGE LOAD =================
window.addEventListener("DOMContentLoaded", () => {

    // Load cart count in navbar
    updateCartCount();

    // Load cart page
    renderCart();
});


// ================= SCROLL LINE ANIMATION =================

// Select product heading section
let headSection = document.querySelector(".productHead");

window.addEventListener("scroll", () => {

    // Get distance of section from top
    let sectionTop = headSection.getBoundingClientRect().top;

    // Set animation trigger point
    let triggerPoint = window.innerHeight / 1.2;

    if (sectionTop < triggerPoint) {
        // When section enters screen, add animation class
        headSection.querySelector(".line").classList.add("active");
    } else {
        // When section leaves screen, remove animation class
        headSection.querySelector(".line").classList.remove("active");
    }
});
