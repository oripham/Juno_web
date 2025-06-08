import {
    initGA,
    trackAddToCart,
    trackBeginCheckout,
    trackPurchase,
    trackSessionStart,
    trackViewItem,
    trackViewItemList
} from './analytics.js';

// Initialize Google Analytics when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initGA();
    trackSessionStart();
    
    // Track product list views
    const productLists = document.querySelectorAll('.pro-loop');
    if (productLists.length > 0) {
        const products = Array.from(productLists).map((product, index) => {
            const name = product.querySelector('h3 a').textContent;
            const price = product.querySelector('.product-detail p').textContent.replace(/[^\d]/g, '');
            const category = product.closest('section')?.querySelector('h2')?.textContent || 'Unknown';
            
            return {
                id: `PROD-${index + 1}`,
                name: name,
                price: parseInt(price),
                category: category,
                position: index + 1
            };
        });
        
        trackViewItemList(products, 'Product List');
    }

    // Add event listeners for color selection
    document.querySelectorAll('input[name="color"]').forEach(input => {
        input.addEventListener('change', function() {
            const productBlock = this.closest('.product-block');
            if (productBlock) {
                const product = {
                    id: productBlock.dataset.productId,
                    name: productBlock.querySelector('h3 a').textContent,
                    price: parseInt(productBlock.querySelector('.product-detail p').textContent.replace(/[^\d]/g, '')),
                    color: this.value,
                    category: productBlock.closest('section')?.querySelector('h2')?.textContent || 'Unknown'
                };
                trackEvent('select_item', {
                    'items': [{
                        'item_id': product.id,
                        'item_name': product.name,
                        'color': product.color
                    }]
                });
            }
        });
    });

    // Add event listeners for size selection
    document.querySelectorAll('input[name="size"]').forEach(input => {
        input.addEventListener('change', function() {
            const productBlock = this.closest('.product-block');
            if (productBlock) {
                const product = {
                    id: productBlock.dataset.productId,
                    name: productBlock.querySelector('h3 a').textContent,
                    size: this.value,
                    category: productBlock.closest('section')?.querySelector('h2')?.textContent || 'Unknown'
                };
                trackEvent('select_item', {
                    'items': [{
                        'item_id': product.id,
                        'item_name': product.name,
                        'size': product.size
                    }]
                });
            }
        });
    });
});

// Track product detail views
document.querySelectorAll('.product-block a').forEach(function(el) {
    el.addEventListener('click', function(e) {
        const productBlock = el.closest('.product-block');
        const name = productBlock.querySelector('h3 a').textContent;
        const price = productBlock.querySelector('.product-detail p').textContent.replace(/[^\d]/g, '');
        const category = productBlock.closest('section')?.querySelector('h2')?.textContent || 'Unknown';
        
        const product = {
            id: `PROD-${Date.now()}`,
            name: name,
            price: parseInt(price),
            category: category,
            listName: 'Product Detail'
        };
        
        trackViewItem(product);
    });
});

// Update addToCart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Get selected color and size
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="size"]:checked')?.value;
        
        if (!selectedColor || !selectedSize) {
            alert('Vui lòng chọn màu sắc và kích thước');
            return;
        }

        const productWithDetails = {
            ...product,
            color: selectedColor,
            size: selectedSize,
            quantity: 1,
            category: product.category || 'Unknown',
            brand: 'JUNO'
        };

        cart.push(productWithDetails);
        updateCart();
        trackAddToCart(productWithDetails);
    }
}

// Update checkout function
function checkout() {
    if (cart.length > 0) {
        trackBeginCheckout({
            total: cart.reduce((sum, item) => sum + item.price, 0),
            items: cart.map(item => ({
                ...item,
                category: item.category || 'Unknown',
                brand: 'JUNO'
            }))
        });
        
        // Simulate order completion
        const order = {
            id: 'ORD-' + Date.now(),
            total: cart.reduce((sum, item) => sum + item.price, 0),
            items: cart.map(item => ({
                ...item,
                category: item.category || 'Unknown',
                brand: 'JUNO'
            }))
        };
        
        trackPurchase(order);
        cart = [];
        updateCart();
        alert('Đặt hàng thành công!');
    }
}

// ... existing code ... 