import { trackUserLogin, trackUserLogout, trackUserRegistration } from './analytics.js';

// User authentication and management
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || false;
let users = [
    {
        id: 1,
        username: 'user1',
        password: '123456',
        email: 'user1@example.com',
        fullName: 'Nguyễn Văn A',
        gender: 'Nam',
        age: 25,
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0123456789'
    },
    {
        id: 2,
        username: 'user2',
        password: '123456',
        email: 'user2@example.com',
        fullName: 'Trần Thị B',
        gender: 'Nữ',
        age: 30,
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        phone: '0987654321'
    }
];

function login(username, password) {
    try {
        console.log('Đang đăng nhập với:', { username, password });
        console.log('Danh sách người dùng:', users);
        
        if (!username || !password) {
            throw new Error('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
        }

        const user = users.find(u => u.username === username);
        console.log('Tìm thấy người dùng:', user);
        
        if (!user) {
            throw new Error('Tên đăng nhập không tồn tại');
        }

        if (user.password !== password) {
            throw new Error('Mật khẩu không chính xác');
        }

        // Remove password before storing in currentUser
        const { password: _, ...userWithoutPassword } = user;
        currentUser = userWithoutPassword;
        isAuthenticated = true;
        
        // Lưu vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Track login event
        trackUserLogin(user.id);
        
        console.log('Đăng nhập thành công, người dùng hiện tại:', currentUser);
        return { success: true };
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return { 
            success: false, 
            message: error.message || 'Đăng nhập thất bại'
        };
    }
}

function logout() {
    try {
        // Track logout event
        if (currentUser) {
            trackUserLogout();
        }
        
        currentUser = null;
        isAuthenticated = false;
        
        // Xóa thông tin khỏi localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        
        return { success: true };
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
        return { 
            success: false, 
            message: 'Đăng xuất thất bại'
        };
    }
}

function register(userData) {
    try {
        if (!userData.username || !userData.password || !userData.email) {
            throw new Error('Vui lòng nhập đầy đủ thông tin đăng ký');
        }

        // Check if username or email already exists
        if (users.some(u => u.username === userData.username)) {
            throw new Error('Tên đăng nhập đã tồn tại');
        }
        if (users.some(u => u.email === userData.email)) {
            throw new Error('Email đã được sử dụng');
        }
        
        // Add new user
        const newUser = {
            id: users.length + 1,
            ...userData
        };
        
        users.push(newUser);
        
        // Track registration event
        trackUserRegistration(newUser.id);
        
        console.log('Đăng ký thành công, danh sách người dùng mới:', users);
        return { success: true };
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        return { 
            success: false, 
            message: error.message || 'Đăng ký thất bại'
        };
    }
}

function updateProfile(userData) {
    try {
        if (!currentUser) {
            throw new Error('Vui lòng đăng nhập để cập nhật thông tin');
        }
        
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
            throw new Error('Không tìm thấy thông tin người dùng');
        }
        
        // Update user data
        users[userIndex] = {
            ...users[userIndex],
            ...userData
        };
        
        // Update current user
        currentUser = {
            ...currentUser,
            ...userData
        };
        
        // Cập nhật localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        console.log('Cập nhật thông tin thành công:', currentUser);
        return { success: true };
    } catch (error) {
        console.error('Lỗi cập nhật thông tin:', error);
        return { 
            success: false, 
            message: error.message || 'Cập nhật thông tin thất bại'
        };
    }
}

function isLoggedIn() {
    return isAuthenticated && currentUser !== null;
}

function getCurrentUser() {
    return currentUser;
}

// Thêm hàm để lấy trạng thái đăng nhập
function getAuthStatus() {
    return {
        isAuthenticated,
        currentUser
    };
}

export {
    getAuthStatus,
    getCurrentUser,
    isLoggedIn,
    login,
    logout,
    register,
    updateProfile
};

