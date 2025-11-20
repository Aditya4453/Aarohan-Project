import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // FAKE LOGIN mode for development
    // Check demo accounts first
    if (email === "teacher@test.com" && password === "123456") {
      const fakeUser = {
        id: 1,
        name: "Demo Teacher",
        email,
        role: "teacher"
      };

      localStorage.setItem("token", "fake-token");
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);

      return { success: true };
    }

    if (email === "student@test.com" && password === "123456") {
      const fakeUser = {
        id: 2,
        name: "Demo Student",
        email,
        role: "student"
      };

      localStorage.setItem("token", "fake-token");
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setUser(fakeUser);

      return { success: true };
    }

    // Check registered users from localStorage (for demo purposes)
    // In production, this would call the backend API
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email);
    
    if (user) {
      // For demo, accept any password for registered users
      // In production, password would be hashed and verified
      localStorage.setItem("token", "fake-token");
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };


  const signup = async (name, email, password, role) => {
    // FAKE SIGNUP mode for development
    // In production, this would call the backend API
    
    // Validate inputs
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    if (!email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    // Check if email already exists (in real app, this would check backend)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (existingUsers.find(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: Date.now(), // Simple ID generation for demo
      name,
      email,
      role: role || 'student'
    };

    // Store registered users (for demo purposes)
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Auto-login after signup
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
