
import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/Api"
import { Link} from "react-router-dom";

export default function Produtos() {
    
    const token = localStorage.getItem("token");

    const {data, isLoading, error, isError} = useQuery({
        
        queryKey: ['produtos'],
        queryFn: async () => {
            const response = await api.get('/produtos', {
                headers: {
                   Authorization: `Bearer ${token}` 
                }
            })
            console.log(response.data)
            
            return response.data.produtos
        },
        refetchOnWindowFocus: false
    })

    if(isLoading){
        return <span> ...Carregando</span>
    }

    if(isError) {
        return <span> Error{error.message}</span>
    }

    return (
        <div>
            
             <Link to="/CreateProduct"> Cadastrar produto</Link>
             <Link to="/DeleteProduct"> Deletar produto</Link>
             <Link to="/UpdateProduct"> Atualizar produto</Link>
            
            {data.map((produto) => (
                <div key={produto.id}>
                    <p>{produto.id}</p>
                    <p>{produto.name}</p>
                    <p>{produto.QNT}</p>
                    <p>{produto.D1}</p>
                    <p>{produto.D2}</p>
                </div>
            ))}
        </div>
    )
}