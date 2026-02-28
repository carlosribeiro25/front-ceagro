import { api } from "../../lib/Api";
import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import Dock from "../../components/Dock";

const buscarProdutoPorId = async (id) => {
    const { data } = await api.get(`/produtos/${id}`);
    console.log("retorno da api", data)
    return data;
};

const atualizarProduto = async ({ id, ...payload }) => {
    const { data } = await api.put(`/produtos/${id}`, payload);
    return data;
};

export default function AtualizarProduto() {
    const queryClient = useQueryClient();

    const [buscaId, setBuscaId] = useState("");
    const [idAtivo, setIdAtivo] = useState(null);
    const [form, setForm] = useState({
        name: "",
        QNT: "",
        D1: "",
        D2: "",
    });

    const {
        data: produtoEncontrado,
        isLoading: buscando,
        isError: erroBusca,
        error: erroBuscaDetalhe,
    } = useQuery({
        queryKey: ["produto", idAtivo],
        queryFn: () => buscarProdutoPorId(idAtivo),
        enabled: !!idAtivo,          
        retry: false,                 
        onSuccess: (data) => {
            setForm({
                name: data.name ?? "",
                QNT:  data.QNT  ?? "",
                D1:   data.D1   ?? "",
                D2:   data.D2   ?? "",
            });
        },
    });

    const mutation = useMutation({
        mutationFn: atualizarProduto,

        onSuccess: (data) => {
            queryClient.setQueryData(["produto", idAtivo], data);
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
        },

        onError: (error) => {
            console.error("Erro ao atualizar produto:", error);
        },
    });

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!buscaId.trim()) return;

        mutation.reset();
        setForm({ name: "", QNT: "", D1: "", D2: "" });
        setIdAtivo(buscaId.trim());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (mutation.isSuccess || mutation.isError) mutation.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            id:   idAtivo,
            name: form.name,
            QNT:  form.QNT,
            D1:   form.D1,
            D2:   form.D2,
        });
    };
    
    return (
        <div>
            <Header/>
            <Dock/>

            <h1>Atualizar Produto</h1>

            <form onSubmit={handleBuscar}>
                <label htmlFor="buscaId">Digite o id do produto</label>
                <input
                    id="buscaId"
                    type="number"
                    value={buscaId}
                    onChange={(e) => setBuscaId(e.target.value)}
                    placeholder="Digite o ID do produto"
                    required
                />
                <button type="submit" >
                    {buscando ? "Buscando…" : "Buscar"}
                </button>
            </form>

            {erroBusca && (
                <p>
                    Produto não encontrado:{" "}
                    {erroBuscaDetalhe?.response?.data?.message ?? erroBuscaDetalhe.message}
                </p>
            )}

            {produtoEncontrado && (
                <form onSubmit={handleSubmit}>
                    <div>
                    <p>
                       ID: {idAtivo} — Produto <strong>{produtoEncontrado.produto.name}</strong>                                     
                    </p>

                    </div>
                    
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nome do produto"
                       
                    />

                    <label htmlFor="QNT">Quantidade</label>
                    <input
                        id="QNT"
                        name="QNT"
                        type="text"
                        value={form.QNT}
                        onChange={handleChange}
                        placeholder="Quantidade"
                        
                    />

                    <label htmlFor="D1">D1</label>
                    <input
                        id="D1"
                        name="D1"
                        type="text"
                        value={form.D1}
                        onChange={handleChange}
                        placeholder="D1"
                    />

                    <label htmlFor="D2">D2</label>
                    <input
                        id="D2"
                        name="D2"
                        type="text"
                        value={form.D2}
                        onChange={handleChange}
                        placeholder="D2"
                    />

                    {mutation.isSuccess && <p> Produto atualizado com sucesso!</p>}
                    {mutation.isError && (
                        <p>
                            Erro ao atualizar:{" "}
                            {mutation.error?.response?.data?.message ?? mutation.error.message}
                        </p>
                    )}

                    <button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? "Salvando…" : "Salvar alterações"}
                    </button>
                </form>
            )}
        </div>
    );
}