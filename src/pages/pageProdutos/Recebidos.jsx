import { api } from "../../lib/Api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import DataHoraAtual from "../../components/DataHoraAtual";
import Header from "../../components/Header";
import Dock from "../../components/Dock"

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
      <Header />
      <DataHoraAtual />
      <Dock/>

      <div className=" w-full">
        <table className="table-auto border-collapse border border-gray-700 w-full text-xs sm:text-sm">
          <thead className="border-collapse border border-gray-700">
            <tr >
              <th className="px-1 py-1 text-left text-accent border-collapse border border-gray-800">Id</th>
              <th className="px-1 py-1 text-left text-accent border-collapse border border-gray-800">Produto</th>
              <th className="px-1 py-1 text-left text-accent border-collapse border border-gray-800">QNT</th>
              <th className="px-1 py-1 text-left text-accent border-collapse border border-gray-800">D1</th>
              <th className="px-1 py-1 text-left text-accent border-collapse border border-gray-800">D2</th>
              <th className="px-1 py-1 text-left text-accent border-collapse border border-gray-800" >OK</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id} className={`transition-colors duration-200 ${produto.recebido ? 'bg-green-900 text-white' : ''}`}>
                <td className="px-1 py-1 text-left border-collapse border border-gray-800">{produto.id}</td>
                <td className="px-2 py-1 text-base border-collapse border border-gray-800">{produto.name}</td>
                <td className="px-1 py-1 text-balance border-collapse border border-gray-800">{produto.QNT}</td>
                <td className="px-1 py-1 text-left border-collapse border border-gray-800">{produto.D1}</td>
                <td className="px-1 py-1 text-left border-collapse border border-gray-800">{produto.D2}</td>
                <td className="px-1 py-1 text-left border-collapse border border-gray-800">
                  <label htmlFor={`recebido-${produtos.id}`}></label>
                  <input
                    id={`recebido-${produto.id}`}
                    type="checkbox"
                    className="w-4 h-4 accent-emerald-500"
                    checked={!!produto.recebido}
                    onChange={() => handleToggle(produto)}
                    disabled={mutation.isPending}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}