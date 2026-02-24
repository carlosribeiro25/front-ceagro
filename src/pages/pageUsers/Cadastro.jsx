import { api } from '../../lib/Api'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const criarUsuario = async (usuario) => {
    const { data } = await api.post('/usuarios/cadastro', usuario)
    console.log(data)
    return data;
}

export default function Cadastro() {
    const queryClient = useQueryClient()

    const [form, setForm] = useState({
        name: "",
        email: "",
        telefone: "",
        password: "",
        role: "",
    })

    const mutation = useMutation({

        mutationFn: criarUsuario,

        onSuccess: (data) => {
            console.log("Usuario criado:", data.message, "ID:", data.userId)
            queryClient.invalidateQueries({ queryKey: ['usuarios'] });
            setForm({ name: "", email: "", telefone: "", password: "", role: "", })
            alert(data.message);
        },

        onError: (error) => {
            console.error("Erro ao criar usuario", error)
            console.log("Resposta do servidor:", error.response?.data)
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        const formatFone = name === "telefone" ? formatarTelefone(value) : value;
        setForm((prev) => ({ ...prev, [name]: formatFone }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate({
            name: form.name,
            email: form.email,
            telefone: form.telefone,
            password: form.password,
            role: form.role
        });
    };

    return (
        <div>
            <h1> Cadastrar usuario</h1>
            {mutation.isSuccess}

            {mutation.isError && (
                <span className='text-red-600'> Erro ao cadastrar usuario</span>
            )}

            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Nome do usuario</label>
                <input type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    placeholder="Nome do usuario"
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    placeholder="Digite o email"
                    onChange={handleChange}
                    required
                />

                <label htmlFor="telefone">Telefone</label>
                <input type="tel"
                    name="telefone"
                    id="telefone"
                    value={form.telefone}
                    onChange={handleChange}
                    placeholder='telefone'
                    required
                />

                <label htmlFor="password">Password</label>
                <input type="password"
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder='Minimo 8 caracteres'
                    required
                />

                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    id="role"
                    value={form.role}
                    onChange={handleChange}
                    required>
                    <option value="">Selecionar</option>
                    <option value="Client">Client</option>
                </select>

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Salvando…" : "Cadastrar Usuario"}
                </button>

            </form>

        </div>

    )
}
