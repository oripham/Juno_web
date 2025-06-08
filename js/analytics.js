import { CONFIG } from './config.js';

// Tỷ giá chuyển đổi VND sang USD
const VND_TO_USD_RATE = 24000;

// Initialize Google Analytics
function initGA() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', CONFIG.GA_TRACKING_ID);
}

// Track page views
function trackPageView(pagePath, pageTitle) {
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
}

// Track user login
function trackUserLogin(userId) {
    if (typeof gtag === 'function') {
        gtag('event', 'login', {
            method: 'email'
        });
    }
}

// Track user registration
function trackUserRegistration(userId) {
    if (typeof gtag === 'function') {
        gtag('event', 'sign_up', {
            method: 'email'
        });
    }
}

// Track user logout
function trackUserLogout() {
    if (typeof gtag === 'function') {
        gtag('event', 'logout');
    }
}

// Track product views
function trackViewItem(product) {
    if (typeof gtag === 'function' && product) {
        gtag('event', 'view_item', {
            'currency': CONFIG.CURRENCY,
            'value': (product.price / VND_TO_USD_RATE),
            'items': [{
                'item_id': product.id,
                'item_name': product.name,
                'price': (product.price / VND_TO_USD_RATE),
                'quantity': 1,
                'category': product.category || 'Fashion',
                'brand': CONFIG.BRAND
            }]
        });
    }
}

// Track add to cart
function trackAddToCart(product) {
    if (typeof gtag === 'function' && product) {
        gtag('event', 'add_to_cart', {
            'currency': CONFIG.CURRENCY,
            'value': (product.price * (product.quantity || 1)) / VND_TO_USD_RATE,
            'items': [{
                'item_id': product.id,
                'item_name': product.name,
                'price': (product.price / VND_TO_USD_RATE),
                'quantity': product.quantity || 1,
                'category': product.category || 'Fashion',
                'brand': CONFIG.BRAND
            }]
        });
    }
}

// Track purchase
function trackPurchase(order) {
    if (typeof gtag === 'function' && order) {
        gtag('event', 'purchase', {
            'transaction_id': order.id,
            'currency': order.currency || CONFIG.CURRENCY,
            'value': order.total / VND_TO_USD_RATE,
            'items': order.items.map(item => ({
                'item_id': item.id,
                'item_name': item.name,
                'price': item.price / VND_TO_USD_RATE,
                'quantity': item.quantity || 1,
                'category': item.category || 'Fashion',
                'brand': CONFIG.BRAND
            }))
        });
    }
}

// Export functions
export {
    initGA, trackAddToCart, trackPageView, trackPurchase, trackUserLogin, trackUserLogout, trackUserRegistration, trackViewItem
};

