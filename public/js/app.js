// Mock products data (will be replaced with API call to backend)
const mockProducts = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        category: "Tops",
        image: "👕"
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        price: 59.99,
        category: "Bottoms",
        image: "👖"
    },
    {
        id: 3,
        name: "Summer Dress",
        price: 79.99,
        category: "Dresses",
        image: "👗"
    },
    {
        id: 4,
        name: "Denim Jacket",
        price: 89.99,
        category: "Outerwear",
        image: "🧥"
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 99.99,
        category: "Footwear",
        image: "👟"
    },
    {
        id: 6,
        name: "Winter Beanie",
        price: 24.99,
        category: "Accessories",
        image: "🧢"
    }
];

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('products-container');
    
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <h4 class="product-name">${product.name}</h4>
            <div class="product-price">$${product.price}</div>
            <div class="product-category">${product.category}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Function to handle adding to cart
function addToCart(productId) {
    // This will be connected to your backend later
    console.log(`Adding product ${productId} to cart`);
    alert('Product added to cart! (Backend integration needed)');
}

// Function to fetch products from backend (placeholder for now)
async function fetchProducts() {
    try {
        // This will be your actual API call to backend
        // const response = await fetch('http://localhost:3000/api/products');
        // const products = await response.json();
        // return products;
        
        // Using mock data for now
        return mockProducts;
    } catch (error) {
        console.error('Error fetching products:', error);
        return mockProducts; // Fallback to mock data
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    const products = await fetchProducts();
    displayProducts(products);
});
