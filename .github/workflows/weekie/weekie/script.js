let cartCount = 0;
let price = 100; // KES

function addToCart() {
    cartCount++;
    let total = cartCount * price;
    document.getElementById("cart").innerText =
        "Cart: " + cartCount + " | Total: KES " + total;
}

// Checkout form -> WhatsApp
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;

    if(cartCount === 0){
        alert("Your cart is empty!");
        return;
    }

    let myNumber = "254781894436"; // WhatsApp number

    let message = `Hello, I would like to order ${cartCount} cookie(s) totaling KES ${cartCount * price}.\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`;

    // Get location if allowed
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            message += `\nLocation: https://maps.google.com/?q=${lat},${long}`;
            openWhatsApp(message);
        }, function() {
            // User denied location
            openWhatsApp(message);
        });
    } else {
        openWhatsApp(message);
    }

    // Reset cart
    cartCount = 0;
    document.getElementById("cart").innerText = "Cart: 0 | Total: KES 0";
    document.getElementById("checkoutForm").reset();
});

function openWhatsApp(message){
    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${myNumber}?text=${encodedMessage}`, '_blank');
}

// Scroll functions for bottom nav
function scrollToTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }
function scrollToCart() { document.getElementById("cart").scrollIntoView({behavior: 'smooth'}); }
function scrollToCheckout() { document.getElementById("checkoutForm").scrollIntoView({behavior: 'smooth'}); }

// Dark mode toggle
const darkBtn = document.getElementById("darkModeBtn");
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkBtn.innerText = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});