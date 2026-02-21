import { api } from '../../lib/Api'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const criarProduto = async (produto) => {
    const { data } = await api.post('/produtos', produto)

    return (data);
}

export default function CriarUsuario() {
    const queryClient = useQueryClient()

    const [form, setForm] = useState({
        name: "",
        QNT: "",
        D1: "",
        D2: "",
    })

    const mutation = useMutation({

        mutationFn: criarProduto,

        onSuccess: (data) => {
            console.log("Produto criado:", data)
            queryClient.invalidateQueries({ queryKey: ['produtos'] });

            setForm({ name: "", QNT: "", D1: "", D2: "" })
            
            alert("Produto cadastrado com sucesso.");
        },

        onError: (error) => {
            console.error("Erro ao criar produto", error)
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate({
            name: form.name,
            QNT: form.QNT,
            D1: form.D1,
            D2: form.D2,
        });
    };

    return (
        <div>
            <h1> Novo produto</h1>
            {mutation.isSuccess }

            {mutation.isError && (
                <span> Erro: {" "}
                    {mutation.error?.response?.data?.message ?? mutation.error.message}
                </span>
            )}

            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Nome do produtos</label>
                <input type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    placeholder="Nome do produto"
                    onChange={handleChange}
                    required
                />

                <label htmlFor="quantidade">Quantidade</label>
                <input type="text"
                    name="QNT"
                    id="QNT"
                    value={form.QNT}
                    placeholder="Digite a quantidade"
                    onChange={handleChange}
                    required
                />

                <label htmlFor="D1">D1</label>
                <input type="text"
                    name="D1"
                    id="D1"
                    value={form.D1}
                    onChange={handleChange}
                    placeholder='Quantidade'
                />

                <label htmlFor="D2">D2</label>
                <input type="text"
                    name="D2"
                    id="D2"
                    value={form.D2}
                    onChange={handleChange}
                    placeholder='Quantidade'
                />
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Salvando…" : "Cadastrar Produto"}
                </button>

            </form>

        </div>

    )
}
