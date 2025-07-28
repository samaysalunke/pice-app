import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get saved user from localStorage
    const savedUser = localStorage.getItem('pice-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    // Save user to localStorage whenever user state changes
    if (user) {
      localStorage.setItem('pice-user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('pice-user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pice-user');
    localStorage.removeItem('pice-onboarding-complete');
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = () => {
    localStorage.setItem('pice-onboarding-complete', 'true');
    if (user) {
      updateUser({ onboardingComplete: true });
    }
  };

  const checkOnboardingComplete = () => {
    return localStorage.getItem('pice-onboarding-complete') === 'true' || user?.onboardingComplete;
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    login,
    logout,
    updateUser,
    completeOnboarding,
    isOnboardingComplete: checkOnboardingComplete()
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 