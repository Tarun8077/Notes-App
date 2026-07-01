import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Provides authentication state and actions to the whole app
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage so the session persists on refresh
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Save user info and JWT after login/register
  const login = (data) => {
    const { token, ...userInfo } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  // Clear session on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Convenience hook to access auth state
export const useAuth = () => useContext(AuthContext);
