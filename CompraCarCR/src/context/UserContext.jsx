/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin } from "../services/UserServices";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    const user = await apiLogin(email, password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUserState(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserState(null);
  };

  const register = async (newUser) => {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const exists = users.find(u => u.email === newUser.email);
    if (exists) {
      return { success: false, message: "Este correo ya está registrado" };
    }
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    setUserState(newUser);
    return { success: true };
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
