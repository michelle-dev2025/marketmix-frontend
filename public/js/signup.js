// Redirect if already logged in
if (auth.isLoggedIn()) {
    window.location.href = '/dashboard';
}

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const messageDiv = document.getElementById('message');
    const signupBtn = document.getElementById('signupBtn');
    
    // Clear previous messages
    messageDiv.style.display = 'none';
    messageDiv.className = 'message';
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showMessage('You must agree to the terms and conditions.', 'error');
        return;
    }
    
    // Show loading state
    signupBtn.textContent = 'Creating Account...';
    signupBtn.disabled = true;
    
    try {
        const response = await fetch(`${auth.API_BASE}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        showMessage('Account created successfully! Redirecting to login...', 'success');
        
        // Reset form
        document.getElementById('signupForm').reset();
        document.getElementById('passwordStrengthBar').style.width = '0%';
        
        // Redirect to login after successful registration
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
        
    } catch (error) {
        console.error('Signup error:', error);
        showMessage(error.message, 'error');
    } finally {
        signupBtn.textContent = 'Create Account';
        signupBtn.disabled = false;
    }
});

// Password strength indicator
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    let strength = 0;
    
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    
    strengthBar.style.width = strength + '%';
    
    if (strength < 50) {
        strengthBar.style.backgroundColor = '#e74c3c';
    } else if (strength < 75) {
        strengthBar.style.backgroundColor = '#f39c12';
    } else {
        strengthBar.style.backgroundColor = '#2ecc71';
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}
