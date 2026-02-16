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

let aboutpage=()=>{
    // alert("Hello")
    window.location.href = "http://127.0.0.1:5502/about.html"
}