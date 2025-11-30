import { useState, createContext, useContext } from "react";
import * as userService from "../services/userService";
import {toast} from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(userService.getUser());

    const login = async (username, password) => {
        try {
            const user = await userService.login(username, password);
            setUser(user);
            toast.success("Login successful!");
        } catch (error) {
            toast.error(error.response?.data || "Login failed!");
        }
    };

    const register = async data => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success('Register Successful');
    } catch (err) {
      toast.error(err.response.data);
    }
  };

    const logout = () => {
        userService.logout();
        setUser(null);
        toast.success("Logged out successfully.");
    };
    
    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return useContext(AuthContext);
}