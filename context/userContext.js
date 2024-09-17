import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Custom hook for easy usage of the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); 
    } else {
      localStorage.removeItem('user'); 
    }
  }, [user]);

  // Value to be passed to context consumers
  const value = {
    user,
    setUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
