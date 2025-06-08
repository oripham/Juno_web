import { CONFIG } from './config.js';

// Tỷ giá chuyển đổi VND sang USD (có thể cập nhật)
const VND_TO_USD_RATE = 24000;

// Initialize Google Analytics
function initGA() {
    try {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            console.log('gtag called with args:', arguments); // Debug log
            dataLayer.push(arguments);
        }
        window.gtag = gtag; // Make gtag globally available
        gtag('js', new Date());
        gtag('config', CONFIG.GA_TRACKING_ID);
        console.log('GA initialized with ID:', CONFIG.GA_TRACKING_ID); // Debug log
    } catch (error) {
        console.error('GA initialization error:', error);
    }
}

// Tracking Functions
function trackEvent(eventName, eventParams = {}) {
    try {
        console.log('trackEvent called:', eventName, eventParams); // Debug log
        if (typeof window.gtag === 'function') {
            console.log('Calling gtag with event:', eventName); // Debug log
            window.gtag('event', eventName, eventParams);
            console.log('gtag call completed'); // Debug log
        } else {
            console.error('gtag is not a function:', typeof window.gtag); // Debug log
        }
    } catch (error) {
        console.error('Event tracking error:', error);
    }
}

// Track page views
function trackPageView(pagePath, pageTitle) {
    trackEvent('page_view', {
        page_path: pagePath,
        page_title: pageTitle
    });
}

// Track product image views
function trackProductImageView(productId, imageIndex) {
    trackEvent('product_image_view', {
        'product_id': productId,
        'image_index': imageIndex
    });
}

// Track size/color selection
function trackProductVariantSelection(productId, variantType, variantValue) {
    trackEvent('product_variant_selection', {
        'product_id': productId,
        'variant_type': variantType, // 'size' or 'color'
        'variant_value': variantValue
    });
}

// Track wishlist interactions
function trackWishlistInteraction(productId, action) {
    trackEvent('wishlist_interaction', {
        'product_id': productId,
        'action': action // 'add' or 'remove'
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
    try {
        console.log('trackViewItem called with product:', product); // Debug log
        
        // Validate product data
        if (!product) {
            console.error('Product is null or undefined');
            return;
        }
        
        if (!product.id || !product.name) {
            console.error('Invalid product data - missing id or name:', product);
            return;
        }

        // Validate and convert price
        let price = product.price;
        if (typeof price === 'string') {
            price = parseFloat(price.replace(/[^\d.-]/g, ''));
        }
        if (isNaN(price) || price <= 0) {
            console.error('Invalid product price:', product.price);
            return;
        }

        const eventParams = {
            'currency': CONFIG.CURRENCY,
            'value': (price / VND_TO_USD_RATE),
            'items': [{
                'item_id': product.id,
                'item_name': product.name,
                'price': (price / VND_TO_USD_RATE),
                'quantity': 1,
                'category': product.category || 'Fashion',
                'brand': CONFIG.BRAND,
                'variant': product.variant || '',
                'color': product.color || '',
                'size': product.size || ''
            }]
        };

        console.log('Sending view_item event with params:', eventParams); // Debug log
        trackEvent('view_item', eventParams);
    } catch (error) {
        console.error('Error in trackViewItem:', error);
    }
}

function trackViewItemList(products, listName) {
    trackEvent('view_item_list', {
        'item_list_name': listName,
        'items': products.map((product, index) => ({
            'item_id': product.id,
            'item_name': product.name,
            'price': (product.price / VND_TO_USD_RATE),
            'category': product.category || 'Fashion',
            'brand': CONFIG.BRAND,
            'variant': product.variant || '',
            'list_position': index + 1
        }))
    });
}

function trackAddToCart(product) {
    console.log('Add to cart attempt:', product); // Debug log
    trackEvent('add_to_cart', {
        'currency': CONFIG.CURRENCY,
        'value': (product.price * (product.quantity || 1)) / VND_TO_USD_RATE,
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': (product.price / VND_TO_USD_RATE),
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
        'value': (product.price * (product.quantity || 1)) / VND_TO_USD_RATE,
        'items': [{
            'item_id': product.id,
            'item_name': product.name,
            'price': (product.price / VND_TO_USD_RATE),
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
        'value': cart.total / VND_TO_USD_RATE,
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price / VND_TO_USD_RATE,
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
        'value': cart.total / VND_TO_USD_RATE,
        'shipping_tier': cart.shippingMethod || 'Standard',
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price / VND_TO_USD_RATE,
            'quantity': item.quantity || 1
        }))
    });
}

function trackAddPaymentInfo(cart) {
    trackEvent('add_payment_info', {
        'currency': CONFIG.CURRENCY,
        'value': cart.total / VND_TO_USD_RATE,
        'payment_type': cart.paymentMethod || 'Credit Card',
        'items': cart.items.map(item => ({
            'item_id': item.id,
            'item_name': item.name,
            'price': item.price / VND_TO_USD_RATE,
            'quantity': item.quantity || 1
        }))
    });
}

function trackPurchase(order) {
    console.log('Purchase attempt:', order); // Debug log
    trackEvent('purchase', {
        'transaction_id': order.id,
        'currency': order.currency || CONFIG.CURRENCY,
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
    trackPageView, trackProductImageView,
    trackProductVariantSelection, trackPurchase,
    trackRemoveFromCart,
    trackSearch,
    trackSessionStart,
    trackUserLogin,
    trackUserLogout,
    trackUserRegistration,
    trackViewItem,
    trackViewItemList, trackWishlistInteraction
};

