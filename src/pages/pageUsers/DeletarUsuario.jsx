import { api } from "../../lib/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const buscarUsuarioPorId = async (id) => {
    const { data } = await api.get(`/usuarios/${id}`);
    return data;
}

const deletarUsuario = async (id) => {
    await api.delete(`/usuarios/${id}`);
}

export default function DeletarUsuario() {
    const queryClient = useQueryClient();
   

    const [buscarId, setBuscarId] = useState("");
    const [idAtivo, setIdAtivo] = useState(null);

    const {
        data: usuarioEncontrado,
        isLoading: buscando,
        isError: erroBusca,
        error: erroBuscarDetalhe,
    } = useQuery({
        queryKey: ["usuarios", idAtivo],
        queryFn: () => buscarUsuarioPorId(idAtivo),
        enabled: !!idAtivo,
        retry: false,
    });

    const mutation = useMutation({
        mutationFn: deletarUsuario,

        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['usuarios'] });
            const snapshot = queryClient.getQueryData(['usuarios']);
            queryClient.setQueryData(['usuarios'], (atual) =>
                atual?.filter((p) => p.id !== id)
            );
            return { snapshot };
        },

        onError: (error, id, context) => {
            console.error("Erro ao deletar usuario:", error);
            queryClient.setQueryData(['usuarios'], context.snapshot);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['usuarios'] });
        },
    });

    const usuario = usuarioEncontrado?.users; 
   
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
            <h1>Deletar usuario</h1>
            <Link to="/usuarios">Usuarios</Link>

            <form onSubmit={handleBuscar}>
                <label htmlFor="buscaId">Buscar por ID</label>
                <input
                    id="buscaId"
                    type="number"
                    value={buscarId}
                    onChange={(e) => setBuscarId(e.target.value)}
                    placeholder="Digite o ID do usuario"
                    required
                />
                <button type="submit">
                    {buscando ? "Buscando…" : "Buscar"}
                </button>
            </form>

            {erroBusca && (
                <p>
                    Usuario não encontrado:{" "}
                   
                    {erroBuscarDetalhe?.response?.data?.message ?? erroBuscarDetalhe?.message}
                </p>
            )}

           
            {usuario && (
                <div>
                    <p><strong>ID:</strong> {usuario.id}</p>
                    <p><strong>Nome:</strong> {usuario.name}</p>
    
                    <button
                        onClick={() => handleDelete(usuario.id, usuario.name)}
                        disabled={mutation.isPending && mutation.variables === usuario.id}
                    >
                        {mutation.isPending ? "Excluindo..." : "Excluir"}
                    </button>
                </div>
            )}
        </div>
    );
}