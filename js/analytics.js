// Google Analytics Configuration
// const GA_TRACKING_ID = 'G-SNZQ5TRSY3';
const GA_TRACKING_ID = 'G-GRVQQ33EXS';
// Initialize Google Analytics
function initGA() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);
}

// Tracking Functions
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }
}

function trackSessionStart() {
    trackEvent('session_start', {
        'event_category': 'engagement',
        'event_label': 'Session Start'
    });
}

function trackViewItem(product) {
    trackEvent('view_item', {
        'currency': 'VND',
        'value': product.price,
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': product.price,
            'quantity': 1,
            'category': product.category,
            'brand': 'JUNO',
            'variant': product.variant || '',
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
            'category': product.category,
            'brand': 'JUNO',
            'variant': product.variant || '',
            'list_position': index + 1
        }))
    });
}

function trackAddToCart(product) {
    trackEvent('add_to_cart', {
        'currency': 'VND',
        'value': product.price,
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': product.price,
            'quantity': 1
        }]
    });
}

function trackBeginCheckout(cart) {
    trackEvent('begin_checkout', {
        'currency': 'VND',
        'value': cart.total,
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price,
            'quantity': item.quantity
        }))
    });
}

function trackPurchase(order) {
    trackEvent('purchase', {
        'transaction_id': order.id,
        'currency': 'VND',
        'value': order.total,
        'items': order.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price,
            'quantity': item.quantity
        }))
    });
}

// Export functions
export {
    GA_TRACKING_ID,
    initGA, trackAddToCart,
    trackBeginCheckout, trackEvent, trackPurchase, trackSessionStart,
    trackViewItem,
    trackViewItemList
};

