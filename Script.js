// ===============================
// BUS TICKET BOOKING SYSTEM
// ===============================

// Price List

const busPrice = {

    "AC":600,
    "Non AC":450,
    "Sleeper":850

};

// Variables

let selectedSeat = "";
let bookedSeats = [];

// HTML Elements

const seatList = document.querySelectorAll(".seat");

const busType = document.getElementById("busType");

const seatInput = document.getElementById("seats");

const summarySeat = document.getElementById("summarySeat");

const summaryAmount = document.getElementById("summaryAmount");

const summaryBusType = document.getElementById("summaryBusType");

// ===============================
// SEAT SELECTION
// ===============================

seatList.forEach(function(seat){

    seat.addEventListener("click",function(){

        if(seat.classList.contains("booked")){

            return;

        }

        seatList.forEach(function(item){

            item.classList.remove("selected");

        });

        seat.classList.add("selected");

        selectedSeat = seat.dataset.seat;

        summarySeat.innerHTML = selectedSeat;

        updatePayment();

    });

});

// ===============================
// UPDATE PAYMENT
// ===============================

function updatePayment(){

    let type = busType.value;

    let seats = Number(seatInput.value);

    if(seats <= 0){

        seats = 0;

    }

    let price = busPrice[type] || 0;

    let total = price * seats;

    summaryBusType.innerHTML = type || "--";

    summaryAmount.innerHTML = "₹" + total;

}

// ===============================
// BUS TYPE CHANGE
// ===============================

busType.addEventListener("change",function(){

    updatePayment();

});

// ===============================
// NUMBER OF SEATS CHANGE
// ===============================

seatInput.addEventListener("input",function(){

    updatePayment();

});

// ===============================
// DARK MODE
// ===============================

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click",function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        darkBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

    else{

        darkBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

// ===============================
// PAGE LOAD
// ===============================

window.onload = function(){

    updatePayment();

};
// ===============================
// BOOK TICKET
// ===============================

function bookTicket() {

    // Passenger Details

    let passenger =
        document.getElementById("name").value.trim();

    let source =
        document.getElementById("source").value;

    let destination =
        document.getElementById("destination").value;

    let journeyDate =
        document.getElementById("journeyDate").value;

    let type =
        busType.value;

    let seats =
        Number(seatInput.value);

    // ==========================
    // VALIDATION
    // ==========================

    if (
        passenger === "" ||
        source === "" ||
        destination === "" ||
        type === "" ||
        journeyDate === "" ||
        seats <= 0
    ) {

        alert("Please fill all the details.");

        return;

    }

    if (source === destination) {

        alert("Source and Destination cannot be the same.");

        return;

    }

    if (selectedSeat === "") {

        alert("Please select your seat.");

        return;

    }

    if (bookedSeats.includes(selectedSeat)) {

        alert("Seat already booked.");

        return;

    }

    // ==========================
    // PRICE
    // ==========================

    let price = busPrice[type];

    let total = price * seats;

    // ==========================
    // BOOKING DATE
    // ==========================

    let bookingDate =
        new Date().toLocaleDateString();

    // ==========================
    // RANDOM TICKET NUMBER
    // ==========================

    let ticketNumber =
        "BUS" +
        Math.floor(
            Math.random() * 900000 + 100000
        );

    // ==========================
    // DISPLAY TICKET
    // ==========================

    document.getElementById("ticket").innerHTML = `

    <p><strong>Passenger :</strong> ${passenger}</p>

    <p><strong>Source :</strong> ${source}</p>

    <p><strong>Destination :</strong> ${destination}</p>

    <p><strong>Bus Type :</strong> ${type}</p>

    <p><strong>Journey Date :</strong> ${journeyDate}</p>

    <p><strong>Seat Number :</strong> ${selectedSeat}</p>

    <p><strong>Seats :</strong> ${seats}</p>

    <p><strong>Price / Seat :</strong> ₹${price}</p>

    <p><strong>Total Amount :</strong> ₹${total}</p>

    <p><strong>Booking Date :</strong> ${bookingDate}</p>

    <p><strong>Ticket Number :</strong> ${ticketNumber}</p>

    `;

    // ==========================
    // PAYMENT SUMMARY
    // ==========================

    summarySeat.innerHTML = selectedSeat;

    summaryBusType.innerHTML = type;

    summaryAmount.innerHTML = "₹" + total;

    // ==========================
    // LOCK SEAT
    // ==========================

    bookedSeats.push(selectedSeat);

    document
        .querySelector(
            `[data-seat="${selectedSeat}"]`
        )
        .classList.remove("selected");

    document
        .querySelector(
            `[data-seat="${selectedSeat}"]`
        )
        .classList.add("booked");

    // ==========================
    // CLEAR CURRENT SELECTION
    // ==========================

    selectedSeat = "";

    // ==========================
    // SUCCESS MESSAGE
    // ==========================

    alert("🎉 Ticket Booked Successfully!");

}
// ===============================
// RESET FORM
// ===============================

function resetForm() {

    document.getElementById("name").value = "";

    document.getElementById("source").selectedIndex = 0;

    document.getElementById("destination").selectedIndex = 0;

    document.getElementById("busType").selectedIndex = 0;

    document.getElementById("journeyDate").value = "";

    document.getElementById("seats").value = "";

    selectedSeat = "";

    // Remove Selected Seat Highlight

    seatList.forEach(function(seat){

        seat.classList.remove("selected");

    });

    // Reset Payment Summary

    summarySeat.innerHTML = "--";

    summaryBusType.innerHTML = "--";

    summaryAmount.innerHTML = "₹0";

    // Reset Ticket

    document.getElementById("ticket").innerHTML = `

    <p><strong>Passenger :</strong> --</p>

    <p><strong>Source :</strong> --</p>

    <p><strong>Destination :</strong> --</p>

    <p><strong>Bus Type :</strong> --</p>

    <p><strong>Journey Date :</strong> --</p>

    <p><strong>Seat Number :</strong> --</p>

    <p><strong>Seats :</strong> --</p>

    <p><strong>Price / Seat :</strong> --</p>

    <p><strong>Total Amount :</strong> ₹0</p>

    <p><strong>Booking Date :</strong> --</p>

    <p><strong>Ticket Number :</strong> --</p>

    `;

    document.getElementById("ticket").style.display = "block";

    document.getElementById("toggleBtn").textContent = "Hide Ticket";

}

// ===============================
// SHOW / HIDE TICKET
// ===============================

function toggleTicket(){

    let ticket =
        document.getElementById("ticket");

    let button =
        document.getElementById("toggleBtn");

    if(ticket.style.display==="none"){

        ticket.style.display="block";

        button.innerHTML="Hide Ticket";

    }

    else{

        ticket.style.display="none";

        button.innerHTML="Show Ticket";

    }

}

// ===============================
// SAVE DARK MODE
// ===============================

if(localStorage.getItem("theme")=="dark"){

    document.body.classList.add("dark");

    darkBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

darkBtn.addEventListener("click",function(){

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

    }

    else{

        localStorage.setItem("theme","light");

    }

});

// ===============================
// SAVE BOOKED SEATS
// ===============================

function saveBookedSeats(){

    localStorage.setItem(

        "bookedSeats",

        JSON.stringify(bookedSeats)

    );

}

// ===============================
// LOAD BOOKED SEATS
// ===============================

function loadBookedSeats(){

    let storedSeats =

    JSON.parse(

    localStorage.getItem("bookedSeats")

    );

    if(storedSeats){

        bookedSeats = storedSeats;

        bookedSeats.forEach(function(seatNo){

            let seat =

            document.querySelector(

            `[data-seat="${seatNo}"]`

            );

            if(seat){

                seat.classList.add("booked");

            }

        });

    }

}

// ===============================
// UPDATE AFTER BOOKING
// ===============================

const oldBookTicket = bookTicket;

bookTicket = function(){

    oldBookTicket();

    saveBookedSeats();

};

// ===============================
// PAGE LOAD
// ===============================

window.addEventListener("load",function(){

    loadBookedSeats();

});