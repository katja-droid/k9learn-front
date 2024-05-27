import React from 'react';
import { useAuthorization } from './AuthorizationContext';

const Logout = () => {
    const { logout } = useAuthorization();

    const handleLogout = () => {
        // Call logout function
        logout();
    };

    return (
        <div>
            <button  onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
