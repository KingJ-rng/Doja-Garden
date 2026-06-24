let cart = JSON.parse(localStorage.getItem('cart')) || [];
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby8agg-lQwPjozfr5lu07TSts0KBTZJzrHEwRIchBhDNiDMTKvrSBEJOYR_3weLRWMHww/exec";

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added!");
}

function toggleCart() {
    document.getElementById('store').classList.add('hidden');
    document.getElementById('cart-section').classList.remove('hidden');
    renderCart();
}

function renderCart() {
    let container = document.getElementById('cart-items');
    container.innerHTML = cart.map((i, index) => 
        `<p>${i.item} - R${i.price} <button onclick="removeFromCart(${index})">Remove</button></p>`
    ).join('');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    let msg = "New Order: " + cart.map(i => i.item).join(", ");
    let total = cart.reduce((sum, i) => sum + i.price, 0);

    // Send to Spreadsheet
    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "order", items: msg, total: total })
    });

    // WhatsApp Redirect
    window.open(`https://wa.me/27794141922?text=${encodeURIComponent(msg + " | Total: R" + total)}`, '_blank');
    
    localStorage.removeItem('cart');
    cart = [];
    location.reload();
}

function adminLogin() {
    let password = prompt("Enter Admin Code:");
    if (password === "KINGJ123") {
        document.getElementById('admin-panel').classList.remove('hidden');
        document.getElementById('store').classList.add('hidden');
    } else {
        alert("Access Denied");
    }
}

function cancelOrder() {
    let row = document.getElementById('row-id').value;
    if (!row) return alert("Enter Row ID");
    
    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "cancel", row: row })
    })
    .then(res => res.text())
    .then(data => alert("Server: " + data));
}
