// Cart state management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(event) {
    event.preventDefault();

    const productContainer = document.querySelector('.single-product');
    if (!productContainer) return;

    const product = {
        id: Date.now(), // Unique ID for each cart item
        name: productContainer.querySelector('h1').textContent,
        price: parseFloat(productContainer.querySelector('h4').textContent.replace('$', '')),
        size: document.getElementById('product-size').value,
        quantity: parseInt(document.getElementById('product-quantity').value),
        image: document.getElementById('ProductImg').src
    };

    // Validate selection
    if (product.size === '') {
        alert('Please select a size');
        return;
    }
    if (product.quantity < 1) {
        alert('Please select a valid quantity');
        return;
    }

    cart.push(product);
    saveCart();
    alert('Product added to cart!');
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartTable = document.getElementById('cart-table');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTableContainer = document.getElementById('cart-table-container');
    const totalTable = document.querySelector('.total-price table');

    if (!cartTable) return;

    // Clear existing cart items
    while (cartTable.rows.length > 1) {
        cartTable.deleteRow(1);
    }

    if (cart.length === 0) {
        // Show empty cart message and hide the table
        emptyCartMessage.style.display = 'block';
        cartTableContainer.style.display = 'none';
        totalTable.innerHTML = '';
    } else {
        // Hide empty cart message and show the table
        emptyCartMessage.style.display = 'none';
        cartTableContainer.style.display = 'block';

        let subtotal = 0;

        // Add cart items
        cart.forEach(item => {
            const row = cartTable.insertRow();
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            row.innerHTML = `
                <td>
                    <div class="cart-info">
                        <img src="${item.image}" alt="${item.name}" width="50">
                        <div>
                            <p>${item.name}</p>
                            <small>Price: $${item.price.toFixed(2)}</small>
                            <br>
                            <small>Size: ${item.size}</small>
                            <br>
                            <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
                        </div>
                    </div>
                </td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
                <td>$${itemTotal.toFixed(2)}</td>
            `;
        });

        // Update totals
        const tax = subtotal * 0.35; // 35% tax rate
        const total = subtotal + tax;

        // Update total price table
        if (totalTable) {
            totalTable.innerHTML = `
                <tr>
                    <td>Subtotal</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Tax (35%)</td>
                    <td>$${tax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>$${total.toFixed(2)}</td>
                </tr>
            `;
        }
    }
}

// Update quantity of cart item
function updateQuantity(id, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity < 1) {
        // If quantity is less than 1, set it to 1
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = 1;
            saveCart();
            updateCartDisplay();
        }
        return;
    }

    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCartDisplay();
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart button listener
    const addToCartBtn = document.querySelector('.btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    }

    // Initial cart display
    updateCartDisplay();
});
