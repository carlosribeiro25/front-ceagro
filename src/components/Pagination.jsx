// App.jsx
import { useEffect, useState } from "react";
import { api } from "../lib/Api";

const Pagination = () => {
  const [data, setData] = useState([]); // Dados da API
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Erros
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const itemsPerPage = 5; // Quantidade de itens por página

  // Função para buscar dados da API
  const fetchData = async (page) => {
    try {
      setLoading(true);
      setError(null);

      // Exemplo usando JSONPlaceholder (pode trocar pela sua API)
      const response = await api.get(
        "/produtos",
        {
          params: {
            _page: page,
            _limit: itemsPerPage,
          },
        }
      );

      setData(response.data);

      // Calcula total de páginas usando o header "x-total-count"
      const totalItems = parseInt(response.headers["x-total-count"], 10);
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    } catch (err) {
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Carrega dados quando a página muda
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Função para mudar de página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Tabela com Paginação</h2>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>nome</th>
                <th>QNT</th>
                <th>D1</th>
                <th>D2</th>
              </tr>
            </thead>
            <tbody>

              
              {data?.map?.((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.name}</td>
                  <td>{produto.QNT}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles de paginação */}
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            <span style={{ margin: "0 10px" }}>
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
