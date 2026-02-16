// Add to cart
debugger;
let count = 0
let atc = document.getElementById("product-count")

let addtocart = () => {
    debugger;

    if (count < 1) {
        count++
        atc.innerText = count;
    }
}


// Redirect to Shop page
let shoppage = () => {
    // alert("Hello")
    window.location.href = "http://127.0.0.1:5502/shop.html";
}



//About page
let aboutpage = () => {
    // alert("Hello")
    window.location.href = "http://127.0.0.1:5502/about.html"
}
debugger;
let images = [
    "image/About-page/scroll-1.jpg",
    "image/About-page/scroll-2.jpg",
    "image/About-page/scroll-3.jpg"
];

let imgIndex = 0;
let img = document.getElementById("scrollImg");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    // Scroll DOWN
    if (currentScroll > lastScrollY) {
        imgIndex++;
        if (imgIndex >= images.length) {
            imgIndex = images.length - 1;
        }
    }
    // Scroll UP
    else {
        imgIndex--;
        if (imgIndex < 0) {
            imgIndex = 0;
        }
    }

    img.src = images[imgIndex];
    lastScrollY = currentScroll;
});



//admin page
debugger
let adminpage = (event) => {
    event.preventDefault(); // VERY IMPORTANT

    let isvalid = true;

    let aemailInput = document.querySelector("#admin-email");
    let apassInput = document.querySelector("#admin-password");

    let erEmail = document.querySelector("#er-email");
    let erPass = document.querySelector("#er-pass");

    let aemail = aemailInput.value.trim();
    let apass = apassInput.value.trim();

    let mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset errors
    erEmail.innerText = "";
    erPass.innerText = "";

    // Email validation
    if (aemail === "") {
        erEmail.innerText = "Please enter admin email";
        erEmail.style.color = "red";
        aemailInput.style.border = "2px solid red";
        isvalid = false;
    } else if (!mailPattern.test(aemail)) {
        erEmail.innerText = "Invalid email format";
        erEmail.style.color = "red";
        aemailInput.style.border = "2px solid red";
        isvalid = false;
    } else {
        aemailInput.style.border = "2px solid green";
    }

    // Password validation
    if (apass === "") {
        erPass.innerText = "Please enter password";
        erPass.style.color = "red";
        apassInput.style.border = "2px solid red";
        isvalid = false;
    } else if (apass.length < 8) {
        erPass.innerText = "Password must be at least 8 characters";
        erPass.style.color = "red";
        apassInput.style.border = "2px solid red";
        isvalid = false;
    } else {
        apassInput.style.border = "2px solid green";
    }

    if (!isvalid) return;

    // Admin credentials check
    if (aemail === "kiruthika@gmail.com" && apass === "admin2004") {
        alert("Admin Login Successful!!");
        // window.location.href = "admin-dashboard.html";
    } else {
        alert("Only Admin is allowed to login!");
    }
};






///login page
debugger
let loginpage = (ev) => {
    // alert("hello")
    debugger;
    ev.preventDefault();

    let isvalid = true;
    let arrid = ["user-email", "user-password"];
    let arrerr = ["er-email", "er-pass"];

    let emailInput = document.getElementById("user-email");
    let passwordInput = document.getElementById("user-password");

    // Validation
    for (let i = 0; i < arrid.length; i++) {
        let input = document.getElementById(arrid[i]);
        let error = document.getElementById(arrerr[i]);

        if (input.value === "") {
            error.innerText = "Please fill the " + arrid[i];
            error.style.color = "red";
            input.style.border = "2px solid red";
            isvalid = false;
        } else {
            if (arrid[i] === "user-email") {
                let mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!mailPattern.test(input.value)) {
                    error.innerText = "Email id is Invalid";
                    error.style.color = "red";
                    input.style.border = "2px solid red";
                    isvalid = false;
                } else {
                    error.innerText = "";
                    input.style.border = "2px solid green";
                }
            }

            if (arrid[i] === "user-password") {
                if (input.value.length < 8) {
                    error.innerText = "Password must be at least 8 characters";
                    error.style.color = "red";
                    input.style.border = "2px solid red";
                    isvalid = false;
                } else {
                    error.innerText = "";
                    input.style.border = "2px solid green";
                }
            }
        }
    }

    if (!isvalid) return;

    // ✅ NORMALIZE INPUT
    let email = emailInput.value.trim().toLowerCase();
    let pass = passwordInput.value.trim();

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
        alert("Register data not found. Please register first!");
        return;
    }

    // Match email & password
    let validUser = users.find(
        user =>
        user.email.toLowerCase() === email &&
        user.password === pass
    );

    if (validUser) {
        alert("Login Successfully!!");
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "index.html";
    } else {
        alert("Invalid Email or Password");
    }
};


// register page
let registerUser = (evnt) => {
    evnt.preventDefault();

    let isvalid = true;

    let uname = document.getElementById("user-name");
    let uemail = document.getElementById("user-email");
    let upass = document.getElementById("user-password");
    let ucpass = document.getElementById("user-conform-password");

    let ename = document.getElementById("ename");
    let eemail = document.getElementById("eemail");
    let epass = document.getElementById("epass");
    let ecpass = document.getElementById("ecpass");

    if (uname.value === "") {
        ename.innerText = "Please fill the name";
        ename.style.color = "red";
        uname.style.border = "2px solid red";
        isvalid = false;
    } else {
        ename.innerText = "";
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (uemail.value === "") {
        eemail.innerText = "Please fill the email";
        eemail.style.color = "red";
        uemail.style.border = "2px solid red";
        isvalid = false;
    } else if (!emailPattern.test(uemail.value)) {
        eemail.innerText = "Invalid Email";
        eemail.style.color = "red";
        uemail.style.border = "2px solid red";
        isvalid = false;
    } else {
        eemail.innerText = "";
    }

    if (upass.value === "") {
        epass.innerText = "Please fill the password";
        epass.style.color = "red";
        upass.style.border = "2px solid red";
        isvalid = false;
    } else if (upass.value.length < 8) {
        epass.innerText = "Password must be at least 8 characters";
        epass.style.color = "red";
        upass.style.border = "2px solid red";
        isvalid = false;
    } else {
        epass.innerText = "";
    }

    if (ucpass.value === "") {
        ecpass.innerText = "Please fill the confirm password";
        ecpass.style.color = "red";
        ucpass.style.border = "2px solid red";
        isvalid = false;
    } else if (upass.value !== ucpass.value) {
        ecpass.innerText = "Passwords do not match";
        ecpass.style.color = "red";
        ucpass.style.border = "2px solid red";
        isvalid = false;
    } else {
        ecpass.innerText = "";
    }

    if (!isvalid) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ NORMALIZE EMAIL
    let email = uemail.value.trim().toLowerCase();

    let exists = users.some(user => user.email.toLowerCase() === email);
    if (exists) {
        alert("User already registered. Please login!");
        return;
    }

    let newUser = {
        name: uname.value.trim(),
        email: email,
        password: upass.value.trim()
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful. Please Login");
};