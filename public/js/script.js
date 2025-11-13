// Mock products data
const mockProducts = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        description: "Premium cotton t-shirt for everyday comfort",
        price: 29.99,
        category: "Tops",
        image: "👕",
        rating: 4.5
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        description: "Modern slim fit jeans with stretch comfort",
        price: 59.99,
        category: "Bottoms",
        image: "👖",
        rating: 4.3
    },
    {
        id: 3,
        name: "Summer Floral Dress",
        description: "Lightweight floral dress perfect for summer",
        price: 79.99,
        category: "Dresses",
        image: "👗",
        rating: 4.7
    },
    {
        id: 4,
        name: "Denim Jacket",
        description: "Classic denim jacket for casual styling",
        price: 89.99,
        category: "Outerwear",
        image: "🧥",
        rating: 4.4
    },
    {
        id: 5,
        name: "Running Shoes",
        description: "Comfortable running shoes for active lifestyle",
        price: 99.99,
        category: "Footwear",
        image: "👟",
        rating: 4.6
    },
    {
        id: 6,
        name: "Winter Beanie",
        description: "Warm knitted beanie for cold days",
        price: 24.99,
        category: "Accessories",
        image: "🧢",
        rating: 4.2
    },
    {
        id: 7,
        name: "Leather Handbag",
        description: "Elegant leather handbag for daily use",
        price: 129.99,
        category: "Accessories",
        image: "👜",
        rating: 4.8
    },
    {
        id: 8,
        name: "Sports Shorts",
        description: "Breathable sports shorts for workouts",
        price: 34.99,
        category: "Bottoms",
        image: "🩳",
        rating: 4.1
    }
];

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h4 class="product-name">${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Function to handle adding to cart
function addToCart(productId) {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        // In a real app, this would call an API
        console.log(`Added to cart: ${product.name}`);
        
        // Show a nice notification
        showNotification(`${product.name} added to cart!`);
    }
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(mockProducts);
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
