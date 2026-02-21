import { api } from "../../lib/Api";
import { useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

const buscarUsuarioPorId = async (id) => {
    const { data } = await api.get(`/usuarios/${id}`);
    console.log("Retorno da API:", data);
    return data;
};

const AtualizarUser = async ({ id, ...payload }) => {
    const { data } = await api.patch(`/usuarios/${id}`, payload);
    return data;
};

export default function AtualizarUsuario() {
    const queryClient = useQueryClient();

    const [buscaId, setBuscaId] = useState("");
    const [idAtivo, setIdAtivo] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        telefone: "",
        password: "",
        role: "",
    });

    const {
        data: usuarioEncontrado,
        isLoading: buscando,
        isError: erroBusca,
        error: erroBuscaDetalhe,
    } = useQuery({
        queryKey: ["produto", idAtivo],
        queryFn: () => buscarUsuarioPorId(idAtivo),
        enabled: !!idAtivo,
        retry: false,
        onSuccess: (data) => {
            setForm({
                name: "",
                email: "",
                telefone: "",
                password: "",
            });
        },
    });

    const mutation = useMutation({
        mutationFn: AtualizarUser,

        onSuccess: (data) => {
            queryClient.setQueryData(["usuario", idAtivo], data);
            queryClient.invalidateQueries({ queryKey: ["usuarios"] });
            setForm({ name: "", email: "", telefone: "", password: "", role: "", })
            alert(data.message);
        },

        onError: (error) => {
            console.error("Erro ao atualizar usuario:", error);
        },
    });

    const formatarTelefone = (valor) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 10) {
        return numeros
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    };

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!buscaId.trim()) return;

        mutation.reset();
        setForm({ name: "", email: "", telefone: "", password: "" , role: ""});
        setIdAtivo(buscaId.trim());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        const formatFone = name === "telefone" ? formatarTelefone(value) : value;

        setForm((prev) => ({ ...prev, [name]: formatFone }));

        if (mutation.isSuccess || mutation.isError) mutation.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            id: idAtivo,
            name: form.name,
            email: form.email,
            telefone: form.telefone,
            password: form.password,
        });
    };

    return (
        <div>
            <h1>Atualizar Usuario</h1>

            <form onSubmit={handleBuscar}>
                <label htmlFor="buscaId">Buscar por ID</label>
                <input
                    id="buscaId"
                    type="number"
                    value={buscaId}
                    onChange={(e) => setBuscaId(e.target.value)}
                    placeholder="Digite o ID do usuario"
                    required
                />
                <button type="submit" >
                    {buscando ? "Buscando…" : "Buscar"}
                </button>
            </form>

            {erroBusca && (
                <p>
                    Usuario não encontrado:{" "}
                    {erroBuscaDetalhe?.response?.data?.message ?? erroBuscaDetalhe.message}
                </p>
            )}

            {usuarioEncontrado && (
                    <>
                 <p>
                        ID: <strong>{idAtivo}</strong>  Usuário: <strong>{usuarioEncontrado?.users?.name}</strong>  
                    </p>
                <form onSubmit={handleSubmit}>
                   
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nome do usuario"
                        
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />

                    <label htmlFor="telefone">Telefone</label>
                    <input
                        id="telefone"
                        name="telefone"
                        type="text"
                        value={form.telefone}
                        onChange={handleChange}
                        placeholder="Telefone"
                    />

                    <label htmlFor="password">Senha</label>
                    <input
                        id="password"
                        name="password"
                        type="text"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />

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

                 </>
            )}
            
        </div>
    );
}