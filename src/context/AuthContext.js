import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(decodedToken);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('jwtToken', token);
    const decodedToken = jwtDecode(token);
    setUser(decodedToken);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };