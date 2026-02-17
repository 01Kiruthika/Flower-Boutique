// ================= SET TIMEOUT=================

// // debugger; 
let showtime = () => {
    // debugger; 
    let date = new Date()
    // console.log(date); 
    let hr1 = document.querySelector("#timehr")
    let min1 = document.querySelector("#timemin")
    let sec1 = document.querySelector("#timesec")
    let ampm1 = document.getElementById("ampm")


    let min = date.getMinutes()
    let sec = date.getSeconds()
    let hr = date.getHours()
    let ampm = hr >= "12" ? "PM" : "AM";
    hr = Number(hr) % 12;
    hr = hr === 0 ? 12 : hr;

    hr1.innerHTML = hr
    min1.innerHTML = min
    sec1.innerHTML = sec
    ampm1.innerHTML = ampm
    // console.log(hr1, min1, sec1, ampm1) 
}
showtime()


setInterval(() => {
    showtime()
}, 1000);

// ================= DASHBOARD PAGE=================


// ================= UPDATE PRODUCT COUNT =================
let updateProductCount = () => {
    const countEl = document.querySelector("#productCount");
    if (!countEl) {
        console.log("Product count element not found!");
        return;
    }
    let products = JSON.parse(localStorage.getItem("products")) || [];
    countEl.innerText = products.length;
};


// ================= UPDATE USER COUNT =================
let updateUserCount = () => {
    const countEl = document.querySelector("#userCount");
    if (!countEl) {
        console.log("User count element not found!");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    countEl.innerText = users.length;
};


// ================= UPDATE LOGGED-IN USER COUNT =================
let updateUniqueUserCount = () => {
    const countEl = document.querySelector("#uniqueuser");
    if (!countEl) {
        console.log("Unique user element not found!");
        return;
    }

    let loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // loggedInUser is OBJECT → count is 1 or 0
    countEl.innerText = loggedUser ? 1 : 0;
};


// ================= UPDATE CATEGORY COUNT =================
let updateCategoryCount = () => {
    let el = document.getElementById("categoryCount");
    if (!el) return;
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    el.innerText = categories.length;
};





// ================= PRODUCT PAGE=================


// ================= CALL ON PAGE LOAD =================
document.addEventListener("DOMContentLoaded", () => {
    updateProductCount(); // existing
    updateUserCount(); // new
});


// ================= LOAD PRODUCTS =================
let loadData = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let rows = "";

    products.forEach(ele => {
        rows += `
        <tr>
            <td>${ele.id}</td>
            <td><img src="${ele.url}" width="60"></td>
            <td>${ele.name}</td>
            <td>${ele.price}</td>
            <td>${ele.stock}</td>
            <td>${ele.offer}</td>
            <td>
                <button type="button" onclick="setSelectedPro(${ele.id})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                <button type="button" onclick="deletePro(${ele.id})"><i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </td>
        </tr>`;
    });

    document.querySelector("#tableBody").innerHTML = rows;
    updateProductCount();
};



// ================= ADD PRODUCT =================
let addProduct = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let product = {
        id: Date.now(),
        url: document.getElementById("url").value,
        name: document.getElementById("PName").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        offer: document.getElementById("offer").value
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    document.querySelector("form").reset();
    loadData();
};

// ================= SET DATA FOR UPDATE =================
let setSelectedPro = (id) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let p = products.find(ele => ele.id === id);

    if (!p) {
        return;
    }

    document.getElementById("pid").value = p.id;
    document.getElementById("url").value = p.url;
    document.getElementById("PName").value = p.name;
    document.getElementById("price").value = p.price;
    document.getElementById("stock").value = p.stock;
    document.getElementById("offer").value = p.offer;

    document.querySelector("#updateBtn").style.display = "inline";
    document.querySelector(".pbtn").style.display = "none";
};

// ================= UPDATE PRODUCT =================
let updateForm = () => {
    let pid = Number(document.getElementById("pid").value);
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let updatedProducts = products.map(ele => {
        if (ele.id === pid) {
            return {
                id: pid,
                url: document.getElementById("url").value,
                name: document.getElementById("PName").value,
                price: document.getElementById("price").value,
                stock: document.getElementById("stock").value,
                offer: document.getElementById("offer").value
            };
        }
        return ele;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    document.querySelector("form").reset();
    document.querySelector("#updateBtn").style.display = "none";
    document.querySelector(".pbtn").style.display = "inline";

    loadData();
};

// ================= DELETE PRODUCT =================
let deletePro = (id) => {
    if (confirm("Do you want to Delete Product?")) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let fpl = products.filter(ele => ele.id !== id);
        localStorage.setItem("products", JSON.stringify(fpl));
        loadData();
    }
};

// ================= VALIDATION & FORM SUBMIT =================
let sub = (ev) => {
    ev.preventDefault();

    let isvalid = true;
    let arrid = ["url", "PName", "price", "stock", "offer"];
    let arrerr = ["urlerror", "nameerror", "Priceerror", "Stockerror", "Offerror"];

    //  check each input
    for (let i = 0; i < arrid.length; i++) {
        let input = document.getElementById(arrid[i]);
        let error = document.getElementById(arrerr[i]);

        if (input.value == "") {
            error.innerText = "Please fill the " + arrid[i];
            input.style.border = "2px solid red";
            error.style.color = "red";
            isvalid = false; // stop update/add if empty
        } else {
            error.innerText = "";
            input.style.border = "2px solid green";
        }
    }

    //  If any input is empty, stop here
    if (!isvalid) return;

    //  Decide add or update
    let pid = document.getElementById("pid").value;
    if (pid === "") {
        addProduct(); // Add product
    } else {
        updateForm(); // Update product only if validation passes
    }
};




// ================= lOG OUT PAGE=================

let logout = () => {
    let confirmLogout = confirm("Do you want to logout?");
    if (confirmLogout) {
        alert("Logged out successfully");
        window.location.href = "http://127.0.0.1:5502/index.html";
    } else {
        alert("you are Login remains")
    }
}



// ================= CATEGORY PAGE=================

// ================= LOAD CATEGORY DATA =================
let loadCategoryData = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let tbody = document.getElementById("categoryTableBody");
    tbody.innerHTML = "";

    categories.forEach(cat => {
        let row = `
            <tr>
                <td>${cat.id}</td>
                <td><img src="${cat.url}" width="60"></td>
                <td>${cat.name}</td>
                <td>${cat.stock}</td>
                <td>
                    <button onclick="setSelectedCategory(${cat.id})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    <button onclick="deleteCategory(${cat.id})"><i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

     updateCategoryCount();
};


// ================= ADD CATEGORY =================
let addCategory = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    let category = {
        id: Date.now(),
        url: document.getElementById("curl").value,
        name: document.getElementById("CName").value,
        stock: document.getElementById("cstock").value
    };

    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));

    document.getElementById("categoryForm").reset();
    loadCategoryData();

    localStorage.setItem("categories", JSON.stringify(categories));
    updateCategoryCount();

};


// ================= SET CATEGORY FOR UPDATE =================
window.setSelectedCategory = (id) => {
    debugger;
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let cat = categories.find(c => c.id === id);
    if (!cat) return;

    document.getElementById("pid").value = cat.id;
    document.getElementById("curl").value = cat.url;
    document.getElementById("CName").value = cat.name;
    document.getElementById("cstock").value = cat.stock;

    document.getElementById("updateBtn").style.display = "inline";
    document.querySelector(".pbtn").style.display = "none";
};

// ================= UPDATE CATEGORY =================
window.updateCategory = () => {
    debugger;
    let pid = Number(document.getElementById("pid").value);
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    let updatedCategories = categories.map(cat => {
        if (cat.id === pid) {
            return {
                id: pid,
                url: document.getElementById("curl").value,
                name: document.getElementById("CName").value,
                stock: document.getElementById("cstock").value
            };
        }
        return cat;
    });

    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    document.getElementById("categoryForm").reset();
    document.getElementById("updateBtn").style.display = "none";
    document.querySelector(".pbtn").style.display = "inline";
    loadCategoryData();
    
};

// ================= DELETE CATEGORY =================
window.deleteCategory = (id) => {
    debugger;
    if (confirm("Do you want to delete this category?")) {
        let categories = JSON.parse(localStorage.getItem("categories")) || [];
        let filtered = categories.filter(cat => cat.id !== id);
        localStorage.setItem("categories", JSON.stringify(filtered));
        loadCategoryData();
       
    }


};

// ================= CATEGORY FORM SUBMIT =================
let categorysubmit = (ev) => {
    debugger;
    ev.preventDefault();
    alert("hello")

    let valid = true;
    let catarrinput = ["curl", "CName", "cstock"];
    let catarrerror = ["cate-urlerror", "cate-nameerror", "cate-Stockerror"];

    // validation
    for (let k = 0; k < catarrinput.length; k++) {
        let input = document.getElementById(catarrinput[k]);
        let error = document.getElementById(catarrerror[k]);

        if (input.value == "") {
            error.innerText = "Please fill the " + catarrinput[k];
            input.style.border = "2px solid red";
            error.style.color = "red";
            valid = false;
        } else {
            error.innerText = "";
            input.style.border = "2px solid green";
        }
    }

    if (!valid) return;

    // add or update
    let pid = document.getElementById("pid").value;
    if (pid === "") {
        addCategory();
    } else {
        updateCategory();
    }
};

// ================= INITIAL LOAD =================
window.addEventListener("DOMContentLoaded", () => {
    loadData();
    loadCategoryData();
    updateProductCount();
    updateUserCount();
    updateUniqueUserCount();
    updateCategoryCount();
});


// ================= CUSTOMER PAGE=================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Customer JS loaded");

    let tableBody = document.getElementById("customerTable");
    console.log("Table body:", tableBody);

    let users = JSON.parse(localStorage.getItem("users"));
    console.log("Users:", users);

    if (!tableBody) {
        console.log("customerTable not found in HTML");
        return;
    }

    tableBody.innerHTML = "";

    if (!users || users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3">No Customers Found</td>
            </tr>
        `;
        return;
    }

    users.forEach((cust, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${cust.name}</td>
                     <td>${cust.email}</td>
                   `;

        tableBody.appendChild(tr);
    });
});



window.addEventListener("DOMContentLoaded", () => {
    updateCategoryCount();
});