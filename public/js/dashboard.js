// Check authentication
if (!auth.requireAuth()) {
    // Redirect will happen in auth.js
    throw new Error('Not authenticated');
}

// DOM elements
const userGreeting = document.getElementById('userGreeting');
const welcomeMessage = document.getElementById('welcomeMessage');
const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileId = document.getElementById('profileId');
const profileCreated = document.getElementById('profileCreated');
const logoutBtn = document.getElementById('logoutBtn');

// Load user data
async function loadUserData() {
    try {
        const user = auth.getUser();
        if (user) {
            displayUserData(user);
        }
        
        // Verify token and get fresh user data
        const freshUser = await auth.verifyToken();
        if (freshUser) {
            displayUserData(freshUser);
        }
        
    } catch (error) {
        console.error('Failed to load user data:', error);
    }
}

// Display user data
function displayUserData(user) {
    userGreeting.textContent = `Welcome, ${user.name}`;
    welcomeMessage.textContent = `Welcome back, ${user.name}!`;
    profileName.textContent = user.name;
    profileEmail.textContent = user.email;
    profileId.textContent = user.id;
    
    if (user.created_at) {
        profileCreated.textContent = new Date(user.created_at).toLocaleDateString();
    }
}

// Logout functionality
logoutBtn.addEventListener('click', function() {
    auth.clearAuth();
    window.location.href = '/login';
});

// Load dashboard data
async function loadDashboardData() {
    try {
        // Simulate loading some data
        // In a real app, you'd fetch this from your API
        setTimeout(() => {
            document.getElementById('totalProducts').textContent = '24';
            document.getElementById('totalSales').textContent = '156';
            document.getElementById('revenue').textContent = '$12,450';
            document.getElementById('customers').textContent = '89';
        }, 1000);
        
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadDashboardData();
});
