import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthorizationContext = createContext();

export const useAuthorization = () => {
    return useContext(AuthorizationContext);
};

export const AuthorizationProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage on component mount
        const storedUser = localStorage.getItem('currentUser');
        const storedAuthorization = localStorage.getItem('isAuthorized');

        if (storedUser && storedAuthorization) {
            try {
                setCurrentUser(JSON.parse(storedUser));
                setIsAuthorized(JSON.parse(storedAuthorization));
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    }, []);

    const login = (userData) => {
        setIsAuthorized(true);
        setCurrentUser(userData);
        // Store user data in localStorage upon login
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('isAuthorized', JSON.stringify(true));
    };

    const logout = () => {
        setIsAuthorized(false);
        setCurrentUser(null);
        // Remove user data from localStorage upon logout
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthorized');
    };

    const addFriendToCurrentUser = (friend) => {
        setCurrentUser(prevUser => ({
            ...prevUser,
            friends: [...prevUser.friends, friend]
        }));
        // Update user data in localStorage when adding a friend
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };

    return (
        <AuthorizationContext.Provider value={{ isAuthorized, currentUser, setCurrentUser, setIsAuthorized, login, logout, addFriendToCurrentUser }}>
            {children}
        </AuthorizationContext.Provider>
    );
};
