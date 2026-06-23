let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleView(id) {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('cart-section').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
    if(id === 'cart-section') renderCart();
}

function showProduct(name, url) {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-img').src = url;
    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() { document.getElementById('product-modal').classList.add('hidden'); }

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(item + " added to cart!");
}

function renderCart() {
    let container = document.getElementById('cart-items');
    container.innerHTML = cart.length === 0 ? "<p>Cart is empty</p>" : "";
    cart.forEach((i, idx) => {
        container.innerHTML += `<p>${i.item} (R${i.price}) <button onclick="remove(${idx})">X</button></p>`;
    });
}

function remove(idx) { cart.splice(idx, 1); localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); }

function checkout() {
    let msg = "Yo King, I'd like to place an order for:\n";
    let total = 0;
    cart.forEach(i => { msg += `- ${i.item} (R${i.price})\n`; total += i.price; });
    window.open(`https://wa.me/27794141922?text=${encodeURIComponent(msg + "\nTotal: R" + total)}`, '_blank');
}
