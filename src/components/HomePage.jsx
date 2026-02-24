import { useEffect } from "react"
import { api } from "../lib/Api"
import { useNavigate, Link } from "react-router-dom"
import Header from "./Header"
import Dock from "./Dock"

export default function HomePage() {
    const navigate = useNavigate()

    useEffect(() => {
        const checkAutenticated = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                navigate('/login')
                return
            }
            try {
                await api.get('/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            } catch (error) {
                if (error.response?.status === 401) {
                    localStorage.removeItem("token")
                    navigate('/login')
                }
                console.error(`Erro ao acesssar a página: ${error}`)
            }
        }

        checkAutenticated()
    }, [navigate])


    return (
        <>
           
            <Header/>
            <Dock/>


        </>
    )
}