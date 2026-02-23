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
                window.location.href = "./adminpanel/index.html"
            }, 2000);


        }
    });

}