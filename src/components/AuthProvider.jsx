import { api } from "../lib/Api";
import { createContext, useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export default function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? { token } : null;
    })
    const navigate = useNavigate()

    const login = useCallback((token, userData) => {
        localStorage.setItem("token", token)
        setUser({ token, ...userData })
    }, []);

    const logout = useCallback(async () => {
        const token = localStorage.getItem("token")

        try {
            await api.post("/logout")
        } catch (error) {
            console.warn("Erro ao invalidar token no servidor", error)
        } finally {
            localStorage.removeItem("token");
            sessionStorage.clear();
            setUser(null);
            navigate("/login", { replace: true})
        }
    }, [navigate])


      return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
        
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider")
    }
    return ctx;
}