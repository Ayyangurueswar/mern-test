import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    const navigate = useNavigate();
    const register = async (user) => {
        const req = await toast.promise(fetch(`/api/auth/v1/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }), {
            pending: 'Registering...'
        })
        const res = await req.json();
        if(res.success){
            toast.success(`Welcome, ${res.data.username}`);
        }
        else{
            toast.error(`${res.message}`);
            throw new Error(res.message);
        }
        setUser(res.data);
        localStorage.setItem("token", JSON.stringify(res.token));
    }
    const login = async (user) => {
        const req = await toast.promise(fetch(`/api/auth/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }), {
            pending: 'Logging in...'
        })
        const res = await req.json();
        if(res.data){
            toast.success(`Welcome, ${res.data.username}`);
        }
        else{
            toast.error(`${res.message}`);
            throw new Error(res.message);
        }
        setUser(res.data);
        localStorage.setItem("token", JSON.stringify(res.token));
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate('/login');
        toast.success('Logged out');
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        if(token){
            fetch(`/api/user/v1/get-users-info`, {
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