import { trackAddToCart } from './analytics.js';
import { isLoggedIn } from './auth.js';

// Cart functions
export function getCart() {
    try {
        const cartData = localStorage.getItem('cart');
        console.log('Raw cart data from localStorage:', cartData);
        const cart = cartData ? JSON.parse(cartData) : [];
        console.log('Parsed cart data:', cart);
        return cart;
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

export function updateCartCount() {
    try {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
        }
        console.log('Cart count updated:', count);
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

export function addToCart(product) {
    try {
        console.log('Adding product to cart:', product);
        if (!isLoggedIn()) {
            console.log('User not logged in, redirecting to login page');
            window.location.href = 'login.html';
            return;
        }

        const cart = getCart();
        console.log('Current cart before adding:', cart);
        
        const existingItemIndex = cart.findIndex(item => 
            item.id === product.id && 
            item.color === product.color && 
            item.size === product.size
        );

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += product.quantity || 1;
            console.log('Updated existing item quantity:', cart[existingItemIndex]);
        } else {
            cart.push({
                ...product,
                quantity: product.quantity || 1
            });
            console.log('Added new item to cart:', product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart saved to localStorage:', cart);
        updateCartCount();
        trackAddToCart(product);
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    }
}

export function removeFromCart(productId) {
    try {
        const cart = getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateCartCount();
        console.log('Removed product from cart:', productId);
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

export function updateQuantity(productId, newQuantity) {
    try {
        const cart = getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            console.log('Updated quantity for product:', productId, 'to:', newQuantity);
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

export function clearCart() {
    try {
        localStorage.removeItem('cart');
        updateCartCount();
        console.log('Cart cleared');
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}

/**
 * Handle checkout process
 * @returns {boolean} - True if checkout was successful
 */
export function handleCheckout() {
    try {
        const cart = getCart();
        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {
            alert('Vui lòng đăng nhập để tiếp tục!');
            window.location.href = 'login.html';
            return false;
        }

        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống!');
            return false;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = total > 300000 ? 0 : 30000;
        const finalTotal = total + shipping;

        // Save order details to localStorage for success page
        const orderDetails = {
            id: 'ORDER_' + Date.now(),
            total: finalTotal,
            items: cart,
            user: user,
            date: new Date().toISOString(),
            shipping: shipping,
            subtotal: total
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        // Truyền giá trị đơn hàng qua localStorage (orderTotal)
        localStorage.setItem('orderTotal', finalTotal);

        window.location.href = 'success.html';
        return true;
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Có lỗi xảy ra khi xử lý đơn hàng');
        return false;
    }
}

