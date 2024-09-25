import conf from '../config/conf.js';


const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.token : null;
};

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const clearUser = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user || null;
};



export const login = async (username, email, password) => {
    console.log({
        username,
        email,
        password
    })
    const response = await fetch(`${conf.backendUrl}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password }),
    });

    if (response.ok) {
        const user = await response.json();
        setUser(user);
        return user;
    } else {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
    }
};

export const logout = async () => {
    const token = getToken();
    if (!token) {
        throw new Error("No user is currently logged in");
    }

    const response = await fetch(`${conf.backendUrl}/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (response.ok) {
        clearUser();
        return true;
    } else {
        const error = await response.json();
        throw new Error(error.message || "Logout failed");
    }
};


export const register = async (email, password) => {
    const response = await fetch(`${conf.backendUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const user = await response.json();
        setUser(user); 
        return user;
    } else {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
    }
};

export const authService = {
    getCurrentUser,
    login,
    logout,
    register,
};
