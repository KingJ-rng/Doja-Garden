let cart = JSON.parse(localStorage.getItem('cart')) || [];
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby8agg-lQwPjozfr5lu07TSts0KBTZJzrHEwRIchBhDNiDMTKvrSBEJOYR_3weLRWMHww/exec";

function showGallery() { document.getElementById('store-section').classList.add('hidden'); document.getElementById('gallery-section').classList.remove('hidden'); }
function showStore() { document.getElementById('store-section').classList.remove('hidden'); document.getElementById('gallery-section').classList.add('hidden'); document.getElementById('cart-section').classList.add('hidden'); }
function toggleCart() { document.getElementById('store-section').classList.add('hidden'); document.getElementById('cart-section').classList.remove('hidden'); renderCart(); }

function addToCart(item, price) { cart.push({item, price}); localStorage.setItem('cart', JSON.stringify(cart)); alert(item + " added!"); }

function renderCart() {
    let cont = document.getElementById('cart-items');
    cont.innerHTML = cart.map((i, idx) => `<p>${i.item} <button onclick="remove(${idx})">X</button></p>`).join('');
}

function checkout() {
    let msg = "Order: " + cart.map(i => i.item).join(", ");
    fetch(WEB_APP_URL, { method: "POST", body: JSON.stringify({ action: "order", items: msg, total: cart.reduce((s, i) => s + i.price, 0) }) });
    window.open(`https://wa.me/27794141922?text=${encodeURIComponent(msg)}`, '_blank');
    localStorage.removeItem('cart'); cart = []; showStore();
}

function adminLogin() { if (prompt("Code:") === "KINGJ123") document.getElementById('admin-panel').classList.remove('hidden'); }

function cancelOrder(row) { fetch(WEB_APP_URL, { method: "POST", body: JSON.stringify({ action: "cancel", row: row }) }).then(r => r.text()).then(alert); }
