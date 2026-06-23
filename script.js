let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
    cart.push({item, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('modal').style.display = 'block';
}

function closeModal() { document.getElementById('modal').style.display = 'none'; }

function viewCart() {
    const cartSection = document.getElementById('cart-section');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = "";
    
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Cart is empty</p>";
    } else {
        cart.forEach((i, index) => {
            cartItems.innerHTML += `<p>${i.item} - R${i.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
        });
    }
    cartSection.classList.remove('hidden');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    viewCart(); // Refresh view
}

function checkout() {
    const phoneNumber = "27794141922";
    let message = "Yo King, I'd like to place an order for:\n";
    let total = 0;
    cart.forEach(i => { message += `- ${i.item} (R${i.price})\n`; total += i.price; });
    message += `\nTotal: R${total}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}
