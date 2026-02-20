// ================= CART DATA =================

// Get cart data from localStorage
// If cart is not found, create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ================= ADD TO CART =================
function addToCart(btn) {

    // Select the parent card of clicked button
    let card = btn.closest(".card-des");

    // Get product details from data attributes
    let id = Number(card.dataset.id); // product id
    let name = card.dataset.name; // product name
    let price = Number(card.dataset.price); // product price
    let img = card.dataset.img; // product image

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
            <div class="card-des">
                <img src="${item.img}">

                <div class="inside-2">
                    <h5>${item.name}</h5>
                    <p>Rs.${item.price}</p>

                    <button onclick="decreaseQty(${item.id})" >-</button>
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


// ================= LOAD PRODUCTS FROM ADMIN PANEL =================

// Function to load products from admin panel (localStorage) to shop page
let loadShopProducts = () => {

    // Get the container where products will be displayed
    let container = document.getElementById("shopProducts");

    // Get products array from localStorage, if not found use empty array
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Clear old product cards
    container.innerHTML = "";

    // ---------------- NO PRODUCTS CONDITION ----------------
    if (products.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; width:100%; padding:30px;">
                <h3>No Products Found</h3>
            </div>`;
        return;
    }

    // ---------------- LOOP THROUGH PRODUCTS ----------------
    products.forEach(p => {

        container.innerHTML += `

<div class="col-lg-3 col-md-6 col-sm-12">

    <div class="card-des"
         data-id="${p.id}"
         data-name="${p.name}"
         data-price="${p.price}"
         data-img="${p.url}">

        <!-- Image wrapper -->
        <div class="card-image-wrapper">

            <!-- Main image -->
            <img src="${p.url}" class="main-img">

            <!-- Hover image -->
            <img src="${p.hoverUrl}" class="hover-img">

        </div>

        <div class="c-inside-1 inside-2">

            <div class="star-icon">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>

            <h5>${p.name}</h5>
            <h6>Rs.${p.price}</h6>

        </div>

        <div class="c-foot">
            <button type="button"
                    class="btnn"
                    onclick="addToCart(this)">
                Add To Cart
            </button>
        </div>

    </div>
</div>
`;

    })
}


// ================= CALL ON PAGE LOAD =================

// When the page is fully loaded
document.addEventListener("DOMContentLoaded", loadShopProducts);



// ================= REGISTER USER FUNCTION =================

let registerUser = (ev) => {

    ev.preventDefault() // Stop page reload

    // Get input values
    let name = document.getElementById("user-name").value.trim();
    let email = document.getElementById("user-email").value.trim();
    let password = document.getElementById("user-password").value.trim();
    let cpassword = document.getElementById("user-conform-password").value.trim();

    // Get error span elements
    let ename = document.getElementById("ename");
    let eemail = document.getElementById("eemail");
    let epass = document.getElementById("epass");
    let ecpass = document.getElementById("ecpass");

    // Clear old error messages
    ename.innerHTML = "";
    eemail.innerHTML = "";
    epass.innerHTML = "";
    ecpass.innerHTML = "";

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    let isValid = true;

    // Name validation
    if (name === "") {
        ename.innerHTML = "Name is required";
        ename.style.color = "red"
        ename.style.fontSize = "15px"
        isValid = false;
    }

    // Email validation
    if (email === "") {
        eemail.innerHTML = "Email is required";
        eemail.style.color = "red"
        eemail.style.fontSize = "15px"
        isValid = false;
    } else if (!email.match(emailPattern)) {
        eemail.innerHTML = "Enter valid email";
        isValid = false;
    }

    // Password validation
    if (password === "") {
        epass.innerHTML = "Password is required";
        epass.style.color = "red"
        epass.style.fontSize = "15px"
        isValid = false;
    } else if (password.length < 8) {
        epass.innerHTML = "Password must be at least 8 characters";
        epass.style.color = "red"
        epass.style.fontSize = "15px"
        isValid = false;
    }

    // Confirm password validation
    if (cpassword === "") {
        ecpass.innerHTML = "Confirm password is required";
        ecpass.style.color = "red"
        ecpass.style.fontSize = "15px"
        isValid = false;
    } else if (password !== cpassword) {
        ecpass.innerHTML = "Passwords do not match";
        ecpass.style.color = "red"
        ecpass.style.fontSize = "15px"
        isValid = false;
    }

    if (!isValid) return;

    // Store user in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "index.html";
}




// ================= LOGIN FUNCTION =================
function loginpage(event) {

    event.preventDefault(); // Stop reload

    let email = document.getElementById("user-email").value.trim();
    let password = document.getElementById("user-password").value.trim();

    let erEmail = document.getElementById("er-email");
    let erPass = document.getElementById("er-pass");

    erEmail.innerHTML = "";
    erPass.innerHTML = "";

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    let isValid = true;

    // Email validation
    if (email === "") {
        erEmail.innerHTML = "Email is required";
        erEmail.style.color = "red"
        erEmail.style.fontSize = "15px"
        isValid = false;
    } else if (!email.match(emailPattern)) {
        erEmail.innerHTML = "Enter valid email";
        erEmail.style.color = "red"
        erEmail.style.fontSize = "15px"
        isValid = false;
    }

    // Password validation
    if (password === "") {
        erPass.innerHTML = "Password is required";
        erPass.style.color = "red"
        erPass.style.fontSize = "15px"
        isValid = false;
    } else if (password.length < 8) {
        erPass.innerHTML = "Password must be at least 8 characters";
        erPass.style.color = "red"
        erPass.style.fontSize = "15px"
        isValid = false;
    }

    if (!isValid) return;

    // Check user in localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(user =>
        user.email === email && user.password === password
    );

    if (foundUser) {
        alert("Login Successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid Email or Password");
    }
}





// ================= ADMIN LOGIN PAGE =================



let adminLogin = (ev) => {

    // Stop page reload
    ev.preventDefault();

    // Get admin inputs
    let email = document.getElementById("admin-email");
    let pass = document.getElementById("admin-password");

    // Get error spans
    let erEmail = document.getElementById("er-email");
    let erPass = document.getElementById("er-pass");

    // Clear errors
    erEmail.innerText = "";
    erPass.innerText = "";

    // Validation
    if (email.value.trim() === "") {
        erEmail.innerText = "Enter admin email";
        erEmail.style.color = "red"
        erEmail.style.fontSize = "15px"
    }

    if (pass.value.trim() === "") {
        erPass.innerText = "Enter admin password";
        erPass.style.color = "red"
        erPass.style.fontSize = "15px"
        return;
    }

    // Check admin credentials
    if (email.value === "kiruthika@gmail.com" && pass.value === "admin2004") {

        // Save admin login status
        localStorage.setItem("adminLogin", "true");

        alert("Admin login successful");

        // Redirect to admin dashboard
        window.location.href = "dashboard.html";

    } else {
        alert("Invalid admin credentials");
    }
}