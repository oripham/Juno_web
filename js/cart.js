import { trackAddToCart, trackPurchase } from './analytics.js';
import { isLoggedIn } from './auth.js';

// Cart functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

function addToCart(product) {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
    } else {
        cart.push({
            ...product,
            quantity: product.quantity || 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    trackAddToCart(product);
}

function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Function to handle checkout
export async function handleCheckout() {
    try {
        const cart = getCart();
        if (cart.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }

        // Create order object
        const order = {
            id: 'ORD-' + Date.now(),
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category,
                variant: item.variant,
                color: item.color,
                size: item.size
            })),
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            currency: 'VND',
            tax: 0,
            shipping: 0
        };

        // Track purchase
        trackPurchase(order);

        // Clear cart after successful purchase
        localStorage.removeItem('cart');
        updateCartCount();

        // Redirect to success page
        window.location.href = 'success.html';
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!');
    }
}

// Export all functions
export {
    addToCart, clearCart, getCart, removeFromCart, updateCartCount, updateQuantity
};

