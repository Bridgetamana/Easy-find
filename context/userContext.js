import React, { createContext, useContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Custom hook for easy usage of the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Value to be passed to context consumers
    const value = {
        user,
        setUser
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
