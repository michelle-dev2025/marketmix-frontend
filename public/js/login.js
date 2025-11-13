// Redirect if already logged in
if (auth.isLoggedIn()) {
    window.location.href = '/dashboard';
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const loginBtn = document.getElementById('loginBtn');
    
    // Clear previous messages
    messageDiv.style.display = 'none';
    messageDiv.className = 'message';
    
    // Validation
    if (!email || !password) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Show loading state
    loginBtn.textContent = 'Signing In...';
    loginBtn.disabled = true;
    
    try {
        const response = await fetch(`${auth.API_BASE}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        // Store authentication data
        auth.setAuth(data.token, data.user);
        
        showMessage('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage(error.message || 'Invalid email or password.', 'error');
    } finally {
        loginBtn.textContent = 'Sign In';
        loginBtn.disabled = false;
    }
});

// Forgot password
document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (email) {
        showMessage(`Password reset instructions would be sent to ${email}`, 'info');
    } else {
        showMessage('Please enter your email address first.', 'error');
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}
