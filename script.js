let cart = JSON.parse(localStorage.getItem('cart')) || [];
const WEB_APP_URL = "YOUR_WEB_APP_URL_HERE"; // PASTE YOUR URL HERE

function toggleCart() {
    document.getElementById('store').classList.toggle('hidden');
    document.getElementById('cart-section').classList.toggle('hidden');
    if(!document.getElementById('cart-section').classList.contains('hidden')) renderCart();
}

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added!");
}

function renderCart() {
    let container = document.getElementById('cart-items');
    container.innerHTML = cart.length === 0 ? "<p>Empty</p>" : "";
    cart.forEach((i, idx) => {
        container.innerHTML += `<p>${i.item} (R${i.price}) <button onclick="remove(${idx})">X</button></p>`;
    });
}

function remove(idx) { 
    cart.splice(idx, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    renderCart(); 
}

function checkout() {
    let msg = "Order for:\n";
    let total = 0;
    cart.forEach(i => { msg += `- ${i.item} (R${i.price})\n`; total += i.price; });

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "order", items: msg, total: total })
    })
    .then(() => {
        alert("Order placed!");
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        window.open(`https://wa.me/27794141922?text=${encodeURIComponent(msg + "\nTotal: R" + total)}`, '_blank');
    })
    .catch(err => alert("Error: " + err));
}

function adminLogin() {
    let password = prompt("Enter Admin Code:");
    if (password === "KINGJ123") {
        document.getElementById('admin-panel').classList.toggle('hidden');
    } else {
        alert("Access Denied");
    }
}

function cancelOrder(items) {
    if (!items) return;
    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "cancel", items: items })
    })
    .then(() => alert("Cancellation request processed."))
    .catch(err => alert("Error: " + err));
}
