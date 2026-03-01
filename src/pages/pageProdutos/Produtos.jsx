
import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/Api"
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Dock from "../../components/Dock";
import NavProdutos from "../../components/NavProdutos";

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
            <NavProdutos />
           

            <table>
               <thead>
                 <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Divina1</th>
                    <th>Divina2</th>
                </tr>
               </thead>

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
