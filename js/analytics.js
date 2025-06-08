import { CONFIG } from './config.js';

// Initialize Google Analytics
function initGA() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', CONFIG.GA_TRACKING_ID);
}

// Tracking Functions
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
}

// Track page views
function trackPageView(pagePath, pageTitle) {
    trackEvent('page_view', {
        page_path: pagePath,
        page_title: pageTitle
    });
}

// Track user engagement
function trackSessionStart() {
    trackEvent('session_start', {
        'event_category': 'engagement',
        'event_label': 'Session Start'
    });
}

function trackUserLogin(userId) {
    trackEvent('login', {
        'event_category': 'engagement',
        'event_label': 'User Login',
        'user_id': userId
    });
}

function trackUserLogout() {
    trackEvent('logout', {
        'event_category': 'engagement',
        'event_label': 'User Logout'
    });
}

function trackUserRegistration(userId) {
    trackEvent('sign_up', {
        'event_category': 'engagement',
        'event_label': 'User Registration',
        'user_id': userId
    });
}

// Track product interactions
function trackViewItem(product) {
    trackEvent('view_item', {
        'currency': CONFIG.CURRENCY,
        'value': product.price,
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': product.price,
            'quantity': 1,
            'category': product.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': product.variant || '',
            'color': product.color || '',
            'size': product.size || '',
            'list_name': product.listName || 'Product Detail',
            'list_position': product.position || 1
        }]
    });
}

function trackViewItemList(products, listName) {
    trackEvent('view_item_list', {
        'item_list_name': listName,
        'items': products.map((product, index) => ({
            'item_id': product.id,
            'item_name': product.name,
            'price': product.price,
            'category': product.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': product.variant || '',
            'list_position': index + 1
        }))
    });
}

function trackAddToCart(product) {
    trackEvent('add_to_cart', {
        'currency': CONFIG.CURRENCY,
        'value': product.price * (product.quantity || 1),
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': product.price,
            'quantity': product.quantity || 1,
            'category': product.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': product.variant || '',
            'color': product.color || '',
            'size': product.size || ''
        }]
    });
}

function trackRemoveFromCart(product) {
    trackEvent('remove_from_cart', {
        'currency': CONFIG.CURRENCY,
        'value': product.price * (product.quantity || 1),
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': product.price,
            'quantity': product.quantity || 1,
            'category': product.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': product.variant || '',
            'color': product.color || '',
            'size': product.size || ''
        }]
    });
}

// Track checkout process
function trackBeginCheckout(cart) {
    trackEvent('begin_checkout', {
        'currency': CONFIG.CURRENCY,
        'value': cart.total,
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price,
            'quantity': item.quantity || 1,
            'category': item.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': item.variant || '',
            'color': item.color || '',
            'size': item.size || ''
        }))
    });
}

function trackAddShippingInfo(cart) {
    trackEvent('add_shipping_info', {
        'currency': CONFIG.CURRENCY,
        'value': cart.total,
        'shipping_tier': cart.shippingMethod || 'Standard',
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price,
            'quantity': item.quantity || 1
        }))
    });
}

function trackAddPaymentInfo(cart) {
    trackEvent('add_payment_info', {
        'currency': CONFIG.CURRENCY,
        'value': cart.total,
        'payment_type': cart.paymentMethod || 'Credit Card',
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price,
            'quantity': item.quantity || 1
        }))
    });
}

function trackPurchase(order) {
    trackEvent('purchase', {
        'transaction_id': order.id,
        'currency': CONFIG.CURRENCY,
        'value': order.total,
        'tax': order.tax || 0,
        'shipping': order.shipping || 0,
        'items': order.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price,
            'quantity': item.quantity || 1,
            'category': item.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': item.variant || '',
            'color': item.color || '',
            'size': item.size || ''
        }))
    });
}

// Track search
function trackSearch(searchTerm) {
    trackEvent('search', {
        'search_term': searchTerm
    });
}

// Track filter usage
function trackFilter(filterName, filterValue) {
    trackEvent('filter', {
        'filter_name': filterName,
        'filter_value': filterValue
    });
}

// Export functions
export {
    initGA, trackAddPaymentInfo,
    trackAddShippingInfo, trackAddToCart, trackBeginCheckout,
    trackEvent,
    trackFilter,
    trackPageView,
    trackPurchase,
    trackRemoveFromCart,
    trackSearch,
    trackSessionStart,
    trackUserLogin,
    trackUserLogout,
    trackUserRegistration,
    trackViewItem,
    trackViewItemList
};

