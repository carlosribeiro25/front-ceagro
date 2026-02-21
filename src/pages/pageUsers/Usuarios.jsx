import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/Api"

export default function Usuarios() {
    const token = localStorage.getItem("token");

    const {data, isLoading, error, isError} = useQuery({
        
        queryKey: ['usuarios'],
        queryFn: async () => {
            const response = await api.get('/usuarios', {
                headers: {
                   Authorization: `Bearer ${token}` 
                }
            })
            console.log(response.data)
            
            return response.data.users
        }
    })

    if(isLoading){
        return <span> ...Carregando</span>
    }

    if(isError) {
        return <span> Error{error.message}</span>
    }

    return (
        <div>
            {data.map((users) => (
                <div key={users.id}>
                    <p>{users.id}</p>
                    <p>{users.name}</p>
                    <p>{users.email}</p>
                    <p>{users.telefone}</p>
                    <p>{users.role}</p>
                </div>
            ))}
        </div>
    )
}