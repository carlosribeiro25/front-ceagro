
import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/Api"
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Dock from "../../components/Dock";

// import TestPagination from "../../components/TestPagination";

// const queryClient = new QueryClient()

export default function Produtos() {

    const { data, isLoading, error, isError } = useQuery({

        queryKey: ['produtos'],
        queryFn: async () => {
            const response = await api.get('/produtos')
            console.log(response.data)
            return response.data.produtos
        },
        refetchOnWindowFocus: false
    })

    if (isLoading) {
        return <span> ...Carregando</span>
    }

    if (isError) {
        return <span> Error{error.message}</span>
    }

    return (
        <div>
            <Header />
            {/* <QueryClientProvider client={queryClient}>
                <TestPagination/>
            </QueryClientProvider> 
            
            ,QueryClient, QueryClientProvider*/}
            <nav className="flex gap-2 mb-2 mt-1">
                <NavLink to="/produtos/cadastrar"
                    className={({ isActive }) =>
                        isActive
                            ? "to-blue-400 border-b-4 border-blue-500 p-1"
                            : ""
                    }>Cadastrar</NavLink>
                <NavLink to="/produtos/deletar">Deletar</NavLink>
                <NavLink to="/produtos/atualizar">Atualizar</NavLink>
            </nav>

            <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="btn m-1">Hover</div>
                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><NavLink to="/produtos/cadastrar"
                    className={({ isActive }) =>
                        isActive
                            ? "to-blue-400 border-b-4 border-blue-500 p-1"
                            : ""
                    }>Cadastrar</NavLink></li>

                    <li><NavLink to="/produtos/deletar">Deletar</NavLink></li>
                    <li><NavLink to="/produtos/atualizar">Atualizar</NavLink></li>
                </ul>
            </div>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Divina1</th>
                    <th>Divina2</th>
                </tr>

                <tbody>
                    {data.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.name}</td>
                            <td>{produto.QNT}</td>
                            <td>{produto.D2}</td>
                        </tr>
                    ))}
                </tbody>

               
            </table>
            <Dock />
        </div>
    )
}
