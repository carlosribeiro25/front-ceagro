import { api } from "../../lib/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const buscarProdutos = async () => {
    const { data } = await api.get('/produtos');
    return data.produtos;
}

const deletarProduto = async (id) => {
    await api.delete(`/produtos/${id}`);
}

export default function DeleteProduct() {
    const queryClient = useQueryClient();

    const { data: produtos, isLoading, isError } = useQuery({
        queryKey: ['produtos'],
        queryFn: buscarProdutos,
    })

    const mutation = useMutation({
        mutationFn: deletarProduto,

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['produtos'] });

            const snapshot = queryClient.getQueryData(['produtos']);

            queryClient.setQueryData(['produtos'], (atual) =>
                atual?.filter((p) => p.id !== id)
            );
            return { snapshot }
        },

        onError: (error, id, context) => {
            console.error("Erro ao deletar produto:", error);
            queryClient.setQueryData(['produtos'], context.snapshot);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] });
        },

    });

    const hanleDelete = (id, nome) => {
        const confirmar = window.confirm(`Deseja excluir o "${nome}"?`);
        if (confirmar) {
            mutation.mutate(id);
        }
    };

    if (isLoading) {
        return <p>Carregando produtos...</p>
    }

    if (isError) {
        return <p>Erro ao carregar produtos.</p>
    }

    return (
        <div>
            <h1>Deletar </h1>
            <Link to="/produtos">Produtos</Link>

            {mutation.isError && (
                <p>Erro ao deletar: {""}
                    {mutation.error?.response?.data?.message ?? mutation.error.message}
                </p>
            )}
            <ul>
                {produtos?.map((produto) => (
                    <li key={produto.id}>
                        <span>{produto.id}</span>
                        <span>{produto.name}</span>
                        <span>{produto.QNT}</span>
                        <span>{produto.D1}</span>
                        <span>{produto.D2}</span>

                        <button
                            onClick={() => hanleDelete(produto.id, produto.name)}
                            disabled={mutation.isPending && mutation.variables === produto.id}
                        >
                            {mutation.isPending ? "Excluindo..." : "Excluir"}
                        </button>

                    </li>
                ))}

            </ul>
        </div>
    )
}