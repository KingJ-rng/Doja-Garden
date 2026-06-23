let cart = JSON.parse(localStorage.getItem('cart')) || [];
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycby8Axb2mQjU4iF8BKf4Ls8urf_rXK9pU_hqQp2FtgWgIQ-IJbC-hHaYORK2jiItVB8n4A/exec";

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added!");
}

function checkout() {
    let msg = "Order for: " + cart.map(i => i.item).join(", ");
    let total = cart.reduce((sum, i) => sum + i.price, 0);

    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "order", items: msg, total: total })
    });

    window.open(`https://wa.me/27794141922?text=${encodeURIComponent(msg + " Total: R" + total)}`, '_blank');
    localStorage.removeItem('cart');
    cart = [];
    alert("Order sent!");
}

function adminLogin() {
    if (prompt("Enter Admin Code:") === "KINGJ123") {
        document.getElementById('admin-panel').classList.remove('hidden');
    }
}

function cancelOrder(rowId) {
    fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify({ action: "cancel", row: rowId })
    }).then(res => res.text()).then(alert);
}

function toggleCart() {
    document.getElementById('store').classList.add('hidden');
    document.getElementById('cart-section').classList.remove('hidden');
}
