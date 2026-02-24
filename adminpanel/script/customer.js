
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
                window.location.href = ".index.html"
            }, 2000);


        }
    });

}