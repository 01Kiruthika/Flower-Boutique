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


// =============================== DASHBOARD ===================================

// PRODUCT COUNT
let updateProductCount = () => {
    let el = document.querySelector("#productCount");
    if (!el) return;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    el.innerText = products.length;
};

// USER COUNT
let updateUserCount = () => {
    let el = document.querySelector("#userCount");
    if (!el) return;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    el.innerText = users.length;
};

// TOTAL PRODUCT STOCK
let updateTotalStock = () => {
    let el = document.querySelector("#totalStock");
    if (!el) return;

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let total = 0;

    products.forEach(p => {
        let s = Number(p.stock);
        if (!isNaN(s) && s >= 0) total += s;
    });

    el.innerText = total;
};

// CATEGORY COUNT
let updateCategoryCount = () => {
    let el = document.getElementById("categoryCount");
    if (!el) return;
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    el.innerText = categories.length;
};

//============================ DASHBOARD END ===========================================



// =========================== PRODUCT PAGE ===========================================

// LOAD PRODUCTS
let loadData = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let tbody = document.getElementById("tableBody");
    if (!tbody) return;
    tbody.innerHTML = "";


    if (products.length > 0) {
        products.forEach((p, i) => {
            tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td><img src="${p.url}"></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>${p.offer}</td>
            <td>
                <button onclick="setSelectedPro(${p.id})"><i class="fa fa-pencil-square-o"></i></button>
                <button onclick="deletePro(${p.id})"><i class="fa fa-trash-o"></i></button>
            </td>
        </tr>`;
        })
    } else {
        tbody.innerHTML = `<tr>
                            <td colspan="7" align="center">No Record Found</td>
                            
                        </tr>`
    }
    // console.log(tbody.innerHTML);


    updateProductCount();
    updateTotalStock();
};

// ADD PRODUCT
let addProduct = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
        id: Date.now(),
        url: url.value,
        name: PName.value,
        price: Number(price.value),
        stock: Number(stock.value),
        offer: offer.value
    });

    localStorage.setItem("products", JSON.stringify(products));
    resetForm();
    loadData();
};

// SELECT PRODUCT
let setSelectedPro = (id) => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let p = products.find(x => x.id === id);
    if (!p) return;

    pid.value = p.id;
    url.value = p.url;
    PName.value = p.name;
    price.value = p.price;
    stock.value = p.stock;
    offer.value = p.offer;

    document.querySelector(".pbtn").style.display = "none";
    updateBtn.style.display = "inline";
};

// UPDATE PRODUCT
let updateForm = () => {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let id = Number(pid.value);

    products = products.map(p =>
        p.id === id ? {
            id,
            url: url.value,
            name: PName.value,
            price: Number(price.value),
            stock: Number(stock.value),
            offer: offer.value
        } :
        p
    );

    localStorage.setItem("products", JSON.stringify(products));
    resetForm();
    loadData();
};

// DELETE PRODUCT
let deletePro = (id) => {
    if (!confirm("Delete this product?")) return;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    loadData();
};

// RESET FORM
let resetForm = () => {
    document.querySelector("form").reset();
    pid.value = "";
    updateBtn.style.display = "none";
    document.querySelector(".pbtn").style.display = "inline";
};

// PRODUCT VALIDATION
let sub = (ev) => {
    ev.preventDefault();

    let valid = true;
    let arrid = ["url", "PName", "price", "stock", "offer"];
    let arrerr = ["urlerror", "nameerror", "Priceerror", "Stockerror", "Offerror"];

    for (let i = 0; i < arrid.length; i++) {
        let input = document.getElementById(arrid[i]);
        let error = document.getElementById(arrerr[i]);

        if (input.value.trim() === "") {
            error.innerText = "Please fill the " + arrid[i];
            input.style.border = "2px solid red";
            error.style.color = "red"
            valid = false;
        } else {
            error.innerText = "";
            input.style.border = "2px solid green";
        }
    }

    if (!valid) return;

    if (Number(price.value) < 0) {
        Priceerror.innerText = "Price cannot be negative";
        price.style.border = "2px solid red";
        priceerror.style = "red"
        return;
    }

    if (Number(stock.value) < 0) {
        Stockerror.innerText = "Stock cannot be negative";
        stock.style.border = "2px solid red";
        Stockerror.style = "red"
        return;
    }

    pid.value === "" ? addProduct() : updateForm();
};

// =========================== PRODUCT PAGE RND ===========================================


// ============================= CATEGORY PAGE ===========================================

// LOAD CATEGORY
let loadCategoryData = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let tbody = document.getElementById("categoryTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";


    if (categories.length > 0) {
        categories.forEach(cat => {
            tbody.innerHTML += `
        <tr>
            <td>${cat.id}</td>
            <td><img src="${cat.url}" width="60"></td>
            <td>${cat.name}</td>
            <td>${cat.stock}</td>
            <td>
                <button onclick="setSelectedCategory(${cat.id})"><i class="fa fa-pencil-square-o"></i></button>
                <button onclick="deleteCategory(${cat.id})"><i class="fa fa-trash-o"></i></button>
            </td>
        </tr>`;
        })
    } else {
        tbody.innerHTML = `<tr>
                            <td colspan="5" align="center">No Record Found</td>
                            
                        </tr>`
    }
    // console.log(tbody.innerHTML);

    updateCategoryCount();
};

// ADD CATEGORY
let addCategory = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];

    categories.push({
        id: Date.now(),
        url: curl.value,
        name: CName.value,
        stock: Number(cstock.value)
    });

    localStorage.setItem("categories", JSON.stringify(categories));
    categoryForm.reset();
    loadCategoryData();
};

// SELECT CATEGORY
let setSelectedCategory = (id) => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let cat = categories.find(c => c.id === id);
    if (!cat) return;

    pid.value = cat.id;
    curl.value = cat.url;
    CName.value = cat.name;
    cstock.value = cat.stock;

    updateBtn.style.display = "inline";
    document.querySelector(".pbtn").style.display = "none";
};

// UPDATE CATEGORY
let updateCategory = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let id = Number(pid.value);

    categories = categories.map(cat =>
        cat.id === id ? {
            id,
            url: curl.value,
            name: CName.value,
            stock: Number(cstock.value)
        } :
        cat
    );

    localStorage.setItem("categories", JSON.stringify(categories));
    categoryForm.reset();
    pid.value = "";
    updateBtn.style.display = "none";
    document.querySelector(".pbtn").style.display = "inline";
    loadCategoryData();
};

// DELETE CATEGORY
let deleteCategory = (id) => {
    if (!confirm("Delete this category?")) return;
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories = categories.filter(c => c.id !== id);
    localStorage.setItem("categories", JSON.stringify(categories));
    loadCategoryData();
};

// CATEGORY VALIDATION
let categorysubmit = (ev) => {
    ev.preventDefault();

    let valid = true;
    let ids = ["curl", "CName", "cstock"];
    let errs = ["cate-urlerror", "cate-nameerror", "cate-Stockerror"];

    for (let i = 0; i < ids.length; i++) {
        let input = document.getElementById(ids[i]);
        let error = document.getElementById(errs[i]);

        if (input.value.trim() === "") {
            error.innerText = "Please fill the " + ids[i];
            input.style.border = "2px solid red";
            valid = false;
        } else {
            error.innerText = "";
            input.style.border = "2px solid green";
        }
    }

    if (!valid) return;

    let err = document.getElementById("cate-Stockerror");

    if (Number(cstock.value) < 0) {
        err.innerText = "Stock cannot be negative";
        err.style.color = "red";
        cstock.style.border = "2px solid red";
        return;
    }


    pid.value === "" ? addCategory() : updateCategory();
};
// ============================= CATEGORY PAGE END ===========================================



// ============================== lOG OUT PAGE =============================================
let logout = (enn) => {
    // alert("hi")
    enn.preventDefault()
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to remain here!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Logout Me!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Logout!",
                text: "Your Successfully has been logout here.",
                icon: "success"
            });


            setTimeout(() => {
                window.location.href = "http://127.0.0.1:5502/home.html";
            }, 1000);


        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "You  are safe ",
                icon: "error"
            });
        }
    });
    // let confirmLogout = confirm("Do you want to logout?");
    // if (confirmLogout) {
    //     alert("Logged out successfully");
    //     window.location.href = "http://127.0.0.1:5502/index.html";
    // } else {
    //     alert("you are Login remains")
    // }
}
// ============================== lOG OUT PAGE END =============================================




// ============================== CUSTOMER PAGE  =============================================
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

// ============================== CUSTOMER PAGE END  =============================================



// ================= PAGE LOAD =================
window.onload = () => {
    loadData();
    loadCategoryData();
    updateProductCount();
    updateUserCount();
    updateCategoryCount();
    updateTotalStock();
};