import { api } from "../../lib/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import DataHoraAtual from "../../components/DataHoraAtual";

const buscarProdutos = async () => {
  const { data } = await api.get(`/produtos`);
  return data.produtos ?? data; 
};

const atualizarStatus = async ({ id, recebido }) => {
  const { data } = await api.patch(`/produtos/${id}/recebido`, { recebido });
  return data;
};

export default function Recebidos() {
  const queryClient = useQueryClient();

  const {
    data: produtos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: buscarProdutos,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: atualizarStatus,
    onMutate: async ({ id, recebido }) => {
      await queryClient.cancelQueries({ queryKey: ["produtos"] });

      const previous = queryClient.getQueryData(["produtos"]);

      queryClient.setQueryData(["produtos"], (old) =>
        old?.map((p) => (p.id === id ? { ...p, recebido } : p))
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["produtos"], context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });

  const handleToggle = (produto) => {
    mutation.mutate({
      id: produto.id,
      recebido: !produto.recebido, 
    });
  };

  if (isLoading) return <span>Carregando...</span>;
  if (isError) return <span>Erro: {error.message}</span>;

  return (
    <div>
      <DataHoraAtual />

      {produtos?.map((produto) => (
        <div key={produto.id} style={{ marginBottom: "1rem" }}>
          <p><strong>ID:</strong> {produto.id}</p>
          <p><strong>Nome:</strong> {produto.name}</p>
          <p><strong>Quantidade:</strong> {produto.QNT}</p>
          <p><strong>D1:</strong> {produto.D1}</p>
          <p><strong>D2:</strong> {produto.D2}</p>

          <label htmlFor={`recebido-${produto.id}`}>OK</label>
          <input
            id={`recebido-${produto.id}`}
            type="checkbox"
            checked={!!produto.recebido}
            onChange={() => handleToggle(produto)}
            disabled={mutation.isPending} 
          />
        </div>
      ))}
    </div>
  );
}