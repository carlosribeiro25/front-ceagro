import { api } from "../../lib/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavProdutos from "../../components/NavProdutos";
import Header from "../../components/Header";
import Dock from "../../components/Dock";


const buscarProdutosPorId = async (id) => {
    const { data } = await api.get(`/produtos/${id}`);
    return data;
}

const deletarProduto = async (id) => {
    await api.delete(`/produtos/${id}`);
}

export default function DeletarProduto() {
    const queryClient = useQueryClient();
   

    const [buscarId, setBuscarId] = useState("");
    const [idAtivo, setIdAtivo] = useState(null);

    const {
        data: produtoEncontrado,
        isLoading: buscando,
        isError: erroBusca,
        error: erroBuscarDetalhe,
    } = useQuery({
        queryKey: ["produto", idAtivo],
        queryFn: () => buscarProdutosPorId(idAtivo),
        enabled: !!idAtivo,
        retry: false,
    });

    const mutation = useMutation({
        mutationFn: deletarProduto,

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['produtos'] });
            const snapshot = queryClient.getQueryData(['produtos']);
            queryClient.setQueryData(['produtos'], (atual) =>
                atual?.filter((p) => p.id !== id)
            );
            return { snapshot };
        },

        onError: (error, id, context) => {
            console.error("Erro ao deletar produto:", error);
            queryClient.setQueryData(['produtos'], context.snapshot);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['produtos'] });
        },
    });

    const produto = produtoEncontrado?.produto; 
   
    const handleBuscar = (e) => {
        e.preventDefault();
        if (!buscarId.trim()) return;
        mutation.reset();
        setIdAtivo(Number(buscarId.trim()));
    };

    const handleDelete = (id, nome) => {
        const confirmar = window.confirm(`Deseja excluir o "${nome}"?`);
        if (confirmar) {
            mutation.mutate(id, {
                onSuccess: () => {
                    setIdAtivo(null);
                    setBuscarId("");
                }
            });
        }
    };

    return (
        <div>           
           <Header/>
           <NavProdutos/>
           <Dock/>

            <h1>Deletar Produto</h1>

            <form onSubmit={handleBuscar}>
                <label htmlFor="buscaId">Buscar por ID</label>
                <input
                    id="buscaId"
                    type="number"
                    value={buscarId}
                    onChange={(e) => setBuscarId(e.target.value)}
                    placeholder="Digite o ID do produto"
                    required
                />
                <button type="submit">
                    {buscando ? "Buscando…" : "Buscar"}
                </button>
            </form>

            {erroBusca && (
                <p>
                    Produto não encontrado:{" "}
                   
                    {erroBuscarDetalhe?.response?.data?.message ?? erroBuscarDetalhe?.message}
                </p>
            )}

           
            {produto && (
                <div>
                    <p><strong>ID:</strong> {produto.id}</p>
                    <p><strong>Nome:</strong> {produto.name}</p>
    
                    <button
                        onClick={() => handleDelete(produto.id, produto.name)}
                        disabled={mutation.isPending && mutation.variables === produto.id}
                    >
                        {mutation.isPending ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            )}
        </div>
    );
}