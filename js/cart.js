import { trackAddToCart, trackBeginCheckout, trackRemoveFromCart } from './analytics.js';
import { isLoggedIn } from './auth.js';

// Cart management functions
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart
export function getCart() {
    return cart;
}

// Add item to cart
export function addToCart(product) {
    if (!isLoggedIn()) {
        alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
        window.location.href = 'login.html';
        return false;
    }

    console.log('Thêm sản phẩm vào giỏ hàng:', product);
    const existingItem = cart.find(item => item.id === product.id && item.size === product.size && item.color === product.color);

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: product.size,
            color: product.color,
            quantity: product.quantity
        });
    }

    saveCart(cart);
    updateCartCount();
    
    // Track add to cart event
    trackAddToCart(product);
    
    return true;
}

// Remove item from cart
export function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        // Track remove from cart event
        trackRemoveFromCart(item);
    }
    
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
}

// Update item quantity
export function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        updateCartCount();
    }
}

// Clear cart
export function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
}

// Get cart total
export function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
export function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count in header
export function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    if (countElement) {
        countElement.textContent = getCartItemCount();
    }
}

// Begin checkout process
export function beginCheckout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return false;
    }

    const cartData = {
        items: cart,
        total: getCartTotal()
    };

    // Track begin checkout event
    trackBeginCheckout(cartData);

    return true;
}

