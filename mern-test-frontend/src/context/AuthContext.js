import { createContext, useContext, useState, useEffect } from "react";

const initialState = {
    user: null,
    login: (user) => {},
    logout: () => {},
    register: (user) => {},
}

const AuthContext = createContext(initialState);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const register = async (user) => {
        const req = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/v1/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if(!req.ok){
            throw new Error('Failed to register');
        }
        const res = await req.json();
        setUser(res.data);
        localStorage.setItem("token", JSON.stringify(res.token));
    }
    const login = async (user) => {
        const req = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if(!req.ok){
            throw new Error('Failed to login');
        }
        const res = await req.json();
        setUser(res.data);
        localStorage.setItem("token", JSON.stringify(res.token));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if(token){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/v1/get-users-info`, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                }
            }).then((res) => res.json()).then((data) => {
                setUser(data.data);
            }).catch((err) => {
                console.error(err);
            })
        }
    }, []);
    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}