let gotoproductpage = (event) => {
    event.preventDefault()
    window.location.href = "product.html"
}

let gocustomerpage = (event) => {
    event.preventDefault()
    window.location.href = "customer.html"
}

let gotocategorypage = (event) => {
    event.preventDefault()
    window.location.href = "category.html"
}





// ================= SET TIME FUNCTION =================

// Function to show current time
let showtime = () => {
    //  alert("hello")
    // debugger;

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

    //  alert("hello")
    // debugger;

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
    //  alert("hello")
    // debugger;

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
    //  alert("hello")
    // debugger;

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
    //  alert("hello")
    // debugger;

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

// Get the update button element from HTML
let updateBtn = document.getElementById("updateBtn");
// ================= LOAD PRODUCT DATA =================
let loadData = () => {
    //  alert("hello")
    // debugger;

    // Get product data from localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Get table body element
    let tbody = document.getElementById("tableBody");

    // Stop if table body not found
    if (!tbody) return;

    // Clear old table rows
    tbody.innerHTML = "";

    // If products available
    if (products.length > 0) {

        // Loop through each product
        products.forEach((p, i) => {

            // Insert table row
            tbody.innerHTML += `
            <tr>
                <td>${p.id}</td> <!-- Serial number -->

                <td>
                    <img src="${p.url}">
                </td> <!-- Main image -->

                <td>
                    <img src="${p.hoverUrl}">
                </td> <!-- Hover image -->

                <td>${p.name}</td> <!-- Product name -->

                <td>${p.price}</td> <!-- Product price -->

                <td>${p.stock}</td> <!-- Product stock -->

                <td>${p.offer}</td> <!-- Product offer -->

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

        // If no products
        tbody.innerHTML = `
        <tr>
            <td colspan="8" align="center">No Record Found</td>
        </tr>`;
    }
};




// ================= ADD PRODUCT =================
let addProduct = () => {
    //  alert("hello")
    // debugger;

    // Get products array
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Push new product
    products.push({

        id: Date.now(), // Unique ID
        url: url.value, // Main image
        hoverUrl: hoverUrl.value, // Hover image
        name: PName.value,
        price: Number(price.value),
        stock: Number(stock.value),
        offer: offer.value
    });

    // Save to localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Reset form
    resetForm();

    // Reload table
    loadData();
};


// ================= SELECT PRODUCT FOR UPDATE =================
let setSelectedPro = (id) => {
    //  alert("hello")
    // debugger;

    // Get products
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Find product
    let p = products.find(x => x.id === id);

    // Stop if not found
    if (!p) return;

    // Set hidden id
    pid.value = p.id;

    // Set values to form
    url.value = p.url;
    hoverUrl.value = p.hoverUrl; // Hover image
    PName.value = p.name;
    price.value = p.price;
    stock.value = p.stock;
    offer.value = p.offer;

    // Hide submit
    document.querySelector(".pbtn").style.display = "none";

    // Show update
    updateBtn.style.display = "inline";

};


// ================= UPDATE PRODUCT =================

let updateForm = () => {
    //  alert("hello")
    // debugger;

    // Get products
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Get ID
    let id = Number(pid.value);

    // Update using map
    products = products.map(p =>
        p.id === id ? {
            id: id,
            url: url.value, // Main image
            hoverUrl: hoverUrl.value, // Hover image
            name: PName.value,
            price: Number(price.value),
            stock: Number(stock.value),
            offer: offer.value
        } :
        p
    );
    // Save updated list
    localStorage.setItem("products", JSON.stringify(products));


    // Reset form
    resetForm();

    // Reload table
    loadData();
};


// ================= DELETE PRODUCT =================
let deletePro = (id) => {
    //  alert("hello")
    // debugger;

    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            // Get all products
            let products = JSON.parse(localStorage.getItem("products")) || [];

            // Remove selected product
            products = products.filter(p => p.id !== id);

            // Save back to localStorage
            localStorage.setItem("products", JSON.stringify(products));

            // Reload table
            loadData();

            Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success"
            });
        }
    });
};


// ================= FORM SUBMIT FUNCTION =================
let sub = (ev) => {
    // alert("hii")
    // debugger

    ev.preventDefault();
    let valid = true;

    // -------- TEXT FIELDS --------
    let arrid = ["url", "hoverUrl", "PName"];
    let arrerr = ["urlerror", "hoverurlerror", "nameerror"];

    for (let i = 0; i < arrid.length; i++) {
        let input = document.getElementById(arrid[i]);
        let error = document.getElementById(arrerr[i]);

        if (input.value === "") {
            error.innerText = "Please fill this field";
            error.style.color = "red"
            input.style.border = "2px solid red";
            valid = false;
        } else {
            error.innerText = "";
            input.style.border = "2px solid green";
        }
    }

    // -------- NUMBER FIELDS --------
    let price = document.getElementById("price");
    let stock = document.getElementById("stock");
    let offer = document.getElementById("offer");

    let priceError = document.getElementById("Priceerror");
    let stockError = document.getElementById("Stockerror");
    let offerError = document.getElementById("Offerror");

    // ----- PRICE -----
    if (price.value === "") {
        priceError.innerText = "Please fill this field";
        priceError.style.color = "red"
        price.style.border = "2px solid red";
        valid = false;
    } else if (price.value < 0) {
        priceError.innerText = "Price cannot be negative";
        priceError.style.color = "red"
        price.style.border = "2px solid red";
        valid = false;
    } else {
        priceError.innerText = "";
        price.style.border = "2px solid green";
    }

    // ----- STOCK -----
    if (stock.value === "") {
        stockError.innerText = "Please fill this field";
        stockError.style.color = "red"
        stock.style.border = "2px solid red";
        valid = false;
    } else if (stock.value < 0) {
        stockError.innerText = "Stock cannot be negative";
        stockError.style.color = "red"
        stock.style.border = "2px solid red";
        valid = false;
    } else {
        stockError.innerText = "";
        stock.style.border = "2px solid green";
    }

    // ----- OFFER -----
    if (offer.value === "") {
        offerError.innerText = "Please fill this field";
        offerError.style.color = "red"
        offer.style.border = "2px solid red";
        valid = false;
    } else if (offer.value < 0) {
        offerError.innerText = "Offer cannot be negative";
        offerError.style.color = "red"
        offer.style.border = "2px solid red";
        valid = false;
    } else {
        offerError.innerText = "";
        offer.style.border = "2px solid green";
    }

    // STOP if any error
    if (!valid) return;



    let pid = document.getElementById("pid");

    if (pid.value === "") {
        addProduct();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Form Submitted Successfully!!",
            showConfirmButton: false,
            timer: 2500
        });
    } else {
        updateForm();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Form Updated Successfully!!",
            showConfirmButton: false,
            timer: 2500
        });
    }
};


// ================= RESET FORM FUNCTION =================
let resetForm = () => {
    //  alert("hello")
    // debugger;

    // Reset all form input fields
    document.getElementById("productForm").reset();

    // Clear hidden product ID
    pid.value = "";

    // Show Add button again
    document.querySelector(".pbtn").style.display = "inline";

    // Hide Update button
    updateBtn.style.display = "none";

    // Reset all input borders to default
    let inputs = document.querySelectorAll("#productForm input");

    inputs.forEach(input => {

        input.style.border = "1px solid #ccc"; // Default border style
    });

    // Clear all error messages
    let errors = document.querySelectorAll("#productForm span");

    errors.forEach(error => {

        error.innerText = ""; // Remove error text
    });
};





// ============================= CATEGORY PAGE ===========================================

// Function to load category data into table
let loadCategoryData = () => {

    //  alert("hello")
    // debugger;

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
    //  alert("hello")
    // debugger;

    // Get existing categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Push new category object
    categories.push({
        id: Date.now(), // Generate unique ID
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
    //  alert("hello")
    // debugger;

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
    //  alert("hello")
    // debugger;

    // Get categories from localStorage
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    // Get category ID from hidden input
    let id = Number(pid.value);

    // Update category using map
    categories = categories.map(cat =>
        cat.id === id ? {
            id, // Keep same ID
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
    //  alert("hello")
    // debugger;

    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this Category!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {


            // Get categories from localStorage
            let categories = JSON.parse(localStorage.getItem("categories")) || [];

            // Remove selected category
            categories = categories.filter(c => c.id !== id);

            // Save updated categories
            localStorage.setItem("categories", JSON.stringify(categories));

            // Reload category table
            loadCategoryData();

            Swal.fire({
                title: "Deleted!",
                text: "Your category has been deleted.",
                icon: "success"
            });
        }
    });

};


// ================= CATEGORY FORM VALIDATION =================

// Function for category form submit
let categorysubmit = (ev) => {
    //  alert("hello")
    // debugger;

    // Stop form default refresh
    ev.preventDefault();

    // Validation flag
    let valid = true;

    // Input field IDs
    let ids = ["CName"];

    // Error span IDs
    let errs = ["cate-nameerror"];

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
    // IMPORTANT CONDITION
    if (pid.value === "") {

        addCategory(); // Call add function if new category
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category Submited Successfully!!",
            showConfirmButton: false,
            timer: 2500
        });

    } else {

        updateCategory(); // Call update function if editing category
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category Updated Successfully!!",
            showConfirmButton: false,
            timer: 2500
        });
    }

};

// ============================= CATEGORY PAGE END ===========================================




// ================= PAGE LOAD ==================================

// Run functions when page loads
window.onload = () => {
    loadData(); // Load product table
    loadCategoryData(); // Load category table
    updateProductCount(); // Update product count
    updateUserCount(); // Update user count
    updateCategoryCount(); // Update category count
    updateTotalStock(); // Update total stock
};


// ================= LOGOUT PAGE =================
let logout = (log) => {
    // alert("HELLO")
    log.preventDefault()

    Swal.fire({
        title: "Are you sure?",
        text: "You want to Logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout Me!"
    }).then((result) => {
        if (result.isConfirmed) {
            setInterval(() => {
                window.location.href = "index.html"
            }, 2000);


        }
    });

}