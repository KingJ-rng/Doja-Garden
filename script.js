let cart = JSON.parse(localStorage.getItem('cart')) || [];
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby8agg-lQwPjozfr5lu07TSts0KBTZJzrHEwRIchBhDNiDMTKvrSBEJOYR_3weLRWMHww/exec";

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added!");
}

function toggleCart() {
    document.getElementById('store').classList.toggle('hidden');
    document.getElementById('cart-section').classList.toggle('hidden');
    let container = document.getElementById('cart-items');
    container.innerHTML = cart.length === 0 ? "<p>Empty</p>" : 
        cart.map((i, idx) => `<p>${i.item} <button onclick="remove(${idx})">X</button></p>`).join('');
}

function remove(idx) { cart.splice(idx, 1); localStorage.setItem('cart', JSON.stringify(cart)); toggleCart(); toggleCart(); }

function checkout() {
    let msg = "Order: " + cart.map(i => i.item).join(", ");
    let total = cart.reduce((sum, i) => sum + i.price, 0);

    fetch(WEB_APP_URL, { method: "POST", body: JSON.stringify({ action: "order", items: msg, total: total }) });
    window.open(`https://wa.me/27794141922?text=${encodeURIComponent(msg + " | Total: R" + total)}`, '_blank');
    
    localStorage.removeItem('cart'); cart = []; toggleCart();
    alert("Order sent!");
}

function adminLogin() {
    if (prompt("Enter Admin Code:") === "KINGJ123") {
        document.getElementById('admin-panel').classList.remove('hidden');
        document.getElementById('store').classList.add('hidden');
    } else {
        alert("Access Denied");
    }
}

function cancelOrder() {
    let row = document.getElementById('row-id').value;
    fetch(WEB_APP_URL, { method: "POST", body: JSON.stringify({ action: "cancel", row: row }) })
    .then(res => res.text()).then(data => alert(data));
}
