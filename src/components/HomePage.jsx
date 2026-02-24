import { useEffect } from "react"
import { api } from "../lib/Api"
import { useNavigate, Link, href } from "react-router-dom"
import { Menubar } from 'primereact/menubar';

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

const items = [

    
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Components',
                    icon: 'pi pi-bolt'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        }
    ];
    return (
        <>
            <div className="card flex ml-1 mt-2 mr-2 mb-1  justify-between">
            <Menubar model={items} />
            </div>
            <Link to="/produtos">Produtos</Link>
            <Link to="/login">Fazer lofin</Link>
            <h1>Ben vindo a nossa pagina</h1>

           

        </>
    )
}