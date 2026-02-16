// ================= DASHBOARD COUNT =================
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

// ================= UPDATE USER COUNT =================
let updateUniqueUserCount = () => {
    const countEl = document.querySelector("uniqueuser");
    if (!countEl) {
        console.log("User count element not found!");
        return;
    }
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];
    countEl.innerText = loggedInUser.length;
};

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
                <button type="button" onclick="setSelectedPro(${ele.id})">Update</button>
                <button type="button" onclick="deletePro(${ele.id})">Delete</button>
            </td>
        </tr>`;
    });

    document.querySelector("#tableBody").innerHTML = rows;
    updateProductCount();
};

// ================= PAGE LOAD =================
window.onload = () => {
    loadData();
};

// ================= FORM SUBMIT =================
document.querySelector("form").addEventListener("submit", (e) => {
    sub(e);
});

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
    if (!p) return;

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

    for (let i = 0; i < arrid.length; i++) {
        let input = document.getElementById(arrid[i]);
        let error = document.getElementById(arrerr[i]);

        if (input.value.trim() === "") {
            error.innerText = "Please fill the " + arrid[i];
            input.style.border = "2px solid red";
            error.style.color = "red";
            isvalid = false;
        } else {
            error.innerText = "";
            input.style.border = "2px solid green";
        }
    }

    if (!isvalid) return;

    let pid = document.getElementById("pid").value;
    pid === "" ? addProduct() : updateForm();
};
//SetTimeout 
// // debugger; 
let showtime = () => {
    // debugger; 
    let date = new Date()
    // console.log(date); #
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
//logout 
let logout = () => {
    let confirmLogout = confirm("Do you want to logout?");
    if (confirmLogout) {
        alert("Logged out successfully");
        window.location.href = "http://127.0.0.1:5502/index.html";
    } else {
        alert("you are Login remains")
    }
}