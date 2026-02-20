// ================= SET TIME FUNCTION =================

// Function to show current time
let showtime = () => {

    // Create a new Date object to get current date and time
    let date = new Date();

    // Get hour element from HTML
    let hr1 = document.querySelector("#timehr");

    // Get minute element from HTML
    let min1 = document.querySelector("#timemin");

    // Get second element from HTML
    let sec1 = document.querySelector("#timesec");

    // Get AM/PM element from HTML
    let ampm1 = document.getElementById("ampm");

    // Get current minutes
    let min = date.getMinutes();

    // Get current seconds
    let sec = date.getSeconds();

    // Get current hours (24 hour format)
    let hr = date.getHours();

    // Check AM or PM
    let ampm = hr >= 12 ? "PM" : "AM";

    // Convert 24 hour to 12 hour format
    hr = Number(hr) % 12;

    // If hour is 0, change it to 12
    hr = hr === 0 ? 12 : hr;

    // Display hour in HTML
    hr1.innerHTML = hr;

    // Display minute in HTML
    min1.innerHTML = min;

    // Display second in HTML
    sec1.innerHTML = sec;

    // Display AM or PM in HTML
    ampm1.innerHTML = ampm;
};

// Call the function once
showtime();

// Call showtime every 1 second
setInterval(() => {
    showtime();
}, 1000);


// ================= DASHBOARD =================

// Function to update product count
let updateProductCount = () => {

    // Get product count element
    let el = document.querySelector("#productCount");

    // If element not found, stop function
    if (!el) return;

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Show total number of products
    el.innerText = products.length;
};

// Function to update user count
let updateUserCount = () => {

    // Get user count element
    let el = document.querySelector("#userCount");

    // If element not found, stop function
    if (!el) return;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Show total users
    el.innerText = users.length;
};

// Function to calculate total stock
let updateTotalStock = () => {

    // Get total stock element
    let el = document.querySelector("#totalStock");

    // If element not found, stop function
    if (!el) return;

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Initialize total stock as 0
    let total = 0;

    // Loop through each product
    products.forEach(p => {

        // Convert stock to number
        let s = Number(p.stock);

        // If stock is valid, add to total
        if (!isNaN(s) && s >= 0) total += s;
    });

    // Display total stock
    el.innerText = total;
};

// Function to update category count
let updateCategoryCount = () => {

    // Get category count element
    let el = document.getElementById("categoryCount");

    // If element not found, stop function
    if (!el) return;

    // Get categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Display total categories
    el.innerText = categories.length;
};


// ================= PRODUCT PAGE =================

// Get update button
let updateBtn = document.getElementById("updateBtn");

// Function to load product data into table
let loadData = () => {

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Get table body
    let tbody = document.getElementById("tableBody");

    // If table not found, stop function
    if (!tbody) return;

    // Clear existing rows
    tbody.innerHTML = "";

    // Check if products exist
    if (products.length > 0) {

        // Loop through products
        products.forEach((p, i) => {

            // Add row to table
            tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td><img src="${p.url}" width="60"></td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.stock}</td>
                <td>${p.offer}</td>
                <td>
                    <button onclick="setSelectedPro(${p.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>
                    <button onclick="deletePro(${p.id})">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>`;
        });

    } else {

        // Show message if no data
        tbody.innerHTML = `
        <tr>
            <td colspan="7" align="center">No Record Found</td>
        </tr>`;
    }
};


// Function to add product
let addProduct = () => {

    // Get existing products
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product object
    products.push({
        id: Date.now(), // Unique ID
        url: url.value, // Image URL
        name: PName.value, // Product name
        price: Number(price.value), // Product price
        stock: Number(stock.value), // Product stock
        offer: offer.value // Offer details
    });

    // Save products to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Reset form fields
    resetForm();

    // Reload table data
    loadData();
};

// Function to select product for editing
let setSelectedPro = (id) => {

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Find product using id
    let p = products.find(x => x.id === id);

    // If product not found, stop function
    if (!p) return;

    // Set hidden product id input
    pid.value = p.id;

    // Set image URL in input field
    url.value = p.url;

    // Set product name in input field
    PName.value = p.name;

    // Set price in input field
    price.value = p.price;

    // Set stock in input field
    stock.value = p.stock;

    // Set offer in input field
    offer.value = p.offer;

    // Hide Add button
    document.querySelector(".pbtn").style.display = "none";

    // Show Update button
    updateBtn.style.display = "inline";
};



// Function to update existing product
let updateForm = () => {

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Convert id value into number
    let id = Number(pid.value);

    // Update product using map
    products = products.map(p =>
        p.id === id ?
        {
            id: id, // Keep same id
            url: url.value, // Update image URL
            name: PName.value, // Update product name
            price: Number(price.value), // Update price
            stock: Number(stock.value), // Update stock
            offer: offer.value // Update offer
        } :
        p
    );

    // Save updated products into localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Reset form fields
    resetForm();

    // Reload table data
    loadData();
};

// Function to handle form submit
let sub = (ev) => {

    // Stop page refresh
    ev.preventDefault();

    // Validation flag
    let valid = true;

    // Input field ids
    let arrid = ["url", "PName", "price", "stock", "offer"];

    // Error span ids
    let arrerr = ["urlerror", "nameerror", "Priceerror", "Stockerror", "Offerror"];

    // Loop through inputs
    for (let i = 0; i < arrid.length; i++) {

        // Get input element
        let input = document.getElementById(arrid[i]);

        // Get error element
        let error = document.getElementById(arrerr[i]);

        // Check if empty
        if (input.value.trim() === "") {

            // Show error message
            error.innerText = "Please fill the field";

            // Set red border
            input.style.border = "2px solid red";

            // Set red color
            error.style.color = "red"

            // Set validation false
            valid = false;

        } else {

            // Clear error message
            error.innerText = "";

            // Set green border
            input.style.border = "2px solid green";
        }
    }

    // Stop if validation failed
    if (!valid) return;

    // Check negative values
    if (price.value < 0 || stock.value < 0) {

        // Show alert message
        alert("Price and Stock cannot be negative");

        // Stop function
        return;
    }

    // If id empty → Add product, else Update product
    pid.value === "" ? addProduct() : updateForm();
};




// ============================= CATEGORY PAGE ===========================================

// Function to load category data into table
let loadCategoryData = () => {

    // Get categories array from localStorage or empty array
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Get category table body element
    let tbody = document.getElementById("categoryTableBody");

    // If table body not found, stop function
    if (!tbody) return;

    // Clear old table rows
    tbody.innerHTML = "";

    // Check if categories exist
    if (categories.length > 0) {

        // Loop through each category
        categories.forEach(cat => {

            // Add category row into table
            tbody.innerHTML += `
            <tr>
                <td>${cat.id}</td>
                <td><img src="${cat.url}"></td>
                <td>${cat.name}</td>
                <td>
                    <button onclick="setSelectedCategory(${cat.id})">
                        <i class="fa fa-pencil-square-o"></i>
                    </button>
                    <button onclick="deleteCategory(${cat.id})">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>`;
        });

    } else {

        // If no category data found
        tbody.innerHTML = `
        <tr>
            <td colspan="5" align="center">No Record Found</td>
        </tr>`;
    }

    // Update category count in dashboard
    updateCategoryCount();
};


// ================= ADD CATEGORY =================

// Function to add new category
let addCategory = () => {

    // Get existing categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Push new category object
    categories.push({
        id: Date.now(), // Generate unique ID
        url: curl.value, // Category image URL
        name: CName.value // Category name
    });

    // Save updated categories into localStorage
    localStorage.setItem("categories", JSON.stringify(categories));

    // Reset category form
    categoryForm.reset();

    // Reload category table
    loadCategoryData();
};


// ================= SELECT CATEGORY =================

// Function to select category for update
let setSelectedCategory = (id) => {

    // Get categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Loop through categories
    categories.forEach(category => {

        // Remove stock property if exists
        delete category.stock;
    });

    // Save updated categories back to localStorage
    localStorage.setItem("categories", JSON.stringify(categories));

    // Find selected category by ID
    let cat = categories.find(c => c.id === id);

    // If category not found, stop function
    if (!cat) return;

    // Set hidden ID field
    pid.value = cat.id;

    // Set URL input value
    curl.value = cat.url;

    // Set category name input value
    CName.value = cat.name;

    // Show update button
    updateBtn.style.display = "inline";

    // Hide submit button
    document.querySelector(".pbtn").style.display = "none";
};


// ================= UPDATE CATEGORY =================

// Function to update category
let updateCategory = () => {

    // Get categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Get category ID from hidden input
    let id = Number(pid.value);

    // Update category using map
    categories = categories.map(cat =>
        cat.id === id ?
        {
            id, // Keep same ID
            url: curl.value, // Update image URL
            name: CName.value // Update category name
        } :
        cat
    );

    // Save updated categories
    localStorage.setItem("categories", JSON.stringify(categories));

    // Reset category form
    categoryForm.reset();

    // Clear hidden ID
    pid.value = "";

    // Hide update button
    updateBtn.style.display = "none";

    // Show submit button
    document.querySelector(".pbtn").style.display = "inline";

    // Reload category table
    loadCategoryData();
};


// ================= DELETE CATEGORY =================

// Function to delete category
let deleteCategory = (id) => {

    // Ask confirmation before delete
    if (!confirm("Delete this category?")) return;

    // Get categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Remove selected category
    categories = categories.filter(c => c.id !== id);

    // Save updated categories
    localStorage.setItem("categories", JSON.stringify(categories));

    // Reload category table
    loadCategoryData();
};


// ================= CATEGORY FORM VALIDATION =================

// Function for category form submit
let categorysubmit = (ev) => {

    // Stop form default refresh
    ev.preventDefault();

    // Validation flag
    let valid = true;

    // Input field IDs
    let ids = ["curl", "CName"];

    // Error span IDs
    let errs = ["cate-urlerror", "cate-nameerror"];

    // Loop through fields
    for (let i = 0; i < ids.length; i++) {

        // Get input element
        let input = document.getElementById(ids[i]);

        // Get error element
        let error = document.getElementById(errs[i]);

        // Check empty value
        if (input.value === "") {

            // Show error message
            error.innerText = "Please fill the " + ids[i];

            // Set red border
            input.style.border = "2px solid red";

            // Set error color
            error.style.color = "red";

            // Mark validation false
            valid = false;

        } else {

            // Clear error message
            error.innerText = "";

            // Set green border
            input.style.border = "2px solid green";
        }
    }

    // If validation fails, stop
    if (!valid) return;

    // If ID empty → Add category else Update category
    pid.value === "" ? addCategory() : updateCategory();
};

// ============================= CATEGORY PAGE END ===========================================


// ============================== CUSTOMER PAGE =============================================

// Run code after HTML is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Print message in console
    console.log("Customer JS loaded");

    // Get customer table body
    let tableBody = document.getElementById("customerTable");

    // Print table body in console
    console.log("Table body:", tableBody);

    // Get users data from localStorage
    let users = JSON.parse(localStorage.getItem("users"));

    // Print users data in console
    console.log("Users:", users);

    // If table body not found, stop execution
    if (!tableBody) {
        console.log("customerTable not found in HTML");
        return;
    }

    // Clear existing table rows
    tableBody.innerHTML = "";

    // Check if users data empty or null
    if (!users || users.length === 0) {

        // Show no customer message
        tableBody.innerHTML = `
            <tr>
                <td colspan="3">No Customers Found</td>
            </tr>
        `;
        return;
    }

    // Loop through each user
    users.forEach((cust, index) => {

        // Create new table row
        let tr = document.createElement("tr");

        // Add customer data into row
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${cust.name}</td>
            <td>${cust.email}</td>
        `;

        // Append row into table body
        tableBody.appendChild(tr);
    });
});

// ============================== CUSTOMER PAGE END =============================================
// ================= PAGE LOAD =================

// Run functions when page loads
window.onload = () => {
    loadData(); // Load product table
    loadCategoryData(); // Load category table
    updateProductCount(); // Update product count
    updateUserCount(); // Update user count
    updateCategoryCount(); // Update category count
    updateTotalStock(); // Update total stock
};