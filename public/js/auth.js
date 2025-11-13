const auth = {
    // API base URL
    API_BASE: 'http://localhost:3000',
    
    // Token storage key
    TOKEN_KEY: 'marketmix_token',
    USER_KEY: 'marketmix_user',
    
    // Check if user is logged in
    isLoggedIn() {
        return !!this.getToken();
    },
    
    // Get stored token
    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    },
    
    // Get stored user data
    getUser() {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },
    
    // Store authentication data
    setAuth(token, user) {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    },
    
    // Clear authentication data
    clearAuth() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    },
    
    // Make authenticated API request
    async apiRequest(url, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(`${this.API_BASE}${url}`, {
                ...options,
                headers
            });
            
            if (response.status === 401) {
                // Token expired or invalid
                this.clearAuth();
                window.location.href = '/login';
                return null;
            }
            
            return response;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },
    
    // Verify token and get current user
    async verifyToken() {
        try {
            const response = await this.apiRequest('/users/me');
            if (response && response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    },
    
    // Redirect to login if not authenticated
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = '/login';
            return false;
        }
        return true;
    }
};
