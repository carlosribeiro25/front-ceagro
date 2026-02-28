import { api } from "../../lib/Api";
import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import Dock from "../../components/Dock";

const buscarProdutos = async () => {
    const { data } = await api.get("/produtos");
    return data.produtos;
};

const atualizarProduto = async ({ id, ...payload }) => {
    const { data } = await api.put(`/produtos/${id}`, payload);
    return data;
};

function ProdutoRow({ produto }) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        name: produto.name ?? "",
        QNT:  produto.QNT  ?? "",
        D1:   produto.D1   ?? "",
        D2:   produto.D2   ?? "",
    });

    const [editando, setEditando] = useState(false);

    const mutation = useMutation({
        mutationFn: atualizarProduto,

        onMutate: async ({ id, ...payload }) => {
            await queryClient.cancelQueries({ queryKey: ["produtos"] });

            const snapshot = queryClient.getQueryData(["produtos"]);

            queryClient.setQueryData(["produtos"], (atual) =>
                atual?.map((p) => (p.id === id ? { ...p, ...payload } : p))
            );

            return { snapshot };
        },

        onError: (error, variables, context) => {
            queryClient.setQueryData(["produtos"], context.snapshot);
            console.error("Erro ao atualizar:", error);
        },

        onSuccess: () => {
            setEditando(false);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSalvar = () => {
        mutation.mutate({ id: produto.id, ...form });
    };

    const handleCancelar = () => {
        setForm({
            name: produto.name ?? "",
            QNT:  produto.QNT  ?? "",
            D1:   produto.D1   ?? "",
            D2:   produto.D2   ?? "",
        });
        setEditando(false);
        mutation.reset();
    };

    return (
        
        
        
       
        <tr className="gap-2">
            <td >{produto.id}</td>

            <td >
                {editando
                    ? <input name="name" value={form.name} onChange={handleChange} />
                    : produto.name
                }
            </td>
            <td>
                {editando
                    ? <input name="QNT" value={form.QNT} onChange={handleChange} />
                    : produto.QNT
                }
            </td>
            <td>
                {editando
                    ? <input name="D1" value={form.D1} onChange={handleChange} />
                    : produto.D1
                }
            </td>
            <td>
                {editando
                    ? <input name="D2" value={form.D2} onChange={handleChange} />
                    : produto.D2
                }
            </td>
           
            {mutation.isError && (
                <td>
                    <span>
                        Erro: {mutation.error?.response?.data?.message ?? mutation.error.message}
                    </span>
                </td>
            )}

            <td>
                {editando ? (
                    <>
                        <button
                            onClick={handleSalvar}
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Salvando…" : "Salvar"}
                        </button>

                        <button
                            onClick={handleCancelar}
                            disabled={mutation.isPending}
                        >
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button onClick={() => setEditando(true)}>
                        Editar
                    </button>
                )}
            </td>
        </tr>
         
    );
}

export default function ListaProdutos() {
    const { data: produtos, isLoading, isError, error } = useQuery({
        queryKey: ["produtos"],
        queryFn: buscarProdutos,
    });

    if (isLoading) return <p>Carregando produtos...</p>;

    if (isError) return (
        <p>
            Erro ao carregar produtos:{" "}
            {error?.response?.data?.message ?? error.message}
        </p>
    );

    return (
        <div>
        <Header/>
        <Dock/>
            <h1>Produtos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>QNT</th>
                        <th>D1</th>
                        <th>D2</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos?.map((produto) => (
                        <ProdutoRow key={produto.id} produto={produto} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}  