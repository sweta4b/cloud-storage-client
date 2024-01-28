import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [loggedInUser, setLoggedInUser] = useState({})
    const navigate = useNavigate()

    const url = "http://localhost:9000"

    const logIn = async (email, password) => {
        try {
            const response = await axios.post(`${url}/auth/login`, {
                email,
                password,
            }
            );
            const { token, user: foundUser } = response.data;

            if (foundUser && foundUser.email === email) {
                saveUserAndTokenToLocalStorage(foundUser, token);
                navigate('/');
                toast("Login successful", {
                    position: 'bottom-right',
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast(error.response.data.error, {
                position: 'bottom-right',
                autoClose: 2000,
            });
            console.error("Authentication error:", error.message);
        }
    };

    const signUp = async (email, password, role) => {
        try {
            const response = await axios.post(`${url}/auth/signup`, {
                email,
                password,
                role: "user",
            });
            const { token, user: newUser } = response.data;
            if (newUser && newUser.email === email) {
                saveUserAndTokenToLocalStorage(newUser, token);
                navigate('/registered')
                toast("Successfully registered", {
                    position: 'bottom-right',
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast(error.response.data.error, {
                position: 'bottom-right',
                autoClose: 2000,
            });
            console.error("Signup error:", error.message);
        }
    };

    const saveUserAndTokenToLocalStorage = (user, token) => {
        document.cookie = `token=${token}; secure; HttpOnly; SameSite=Strict`;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedInUser(user)
    };

    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate('/login')
        toast("Logout ", {
            position: 'bottom-right',
            autoClose: 2000,
        });
    }

    return {
        logIn,
        logOut,
        loggedInUser,
        signUp,
    }
}