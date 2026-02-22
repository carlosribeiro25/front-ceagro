// components/ListaProdutos.jsx
import { useProdutos, useToggleRecebido } from '../../hooks/useProdutos'

export function ListProduct() {
  const { data: produtos, isLoading, isError } = useProdutos()
  const { mutate: toggleRecebido, isPending } = useToggleRecebido()

  if (isLoading) return <p>Carregando...</p>
  if (isError) return <p>Erro ao carregar produtos.</p>

  return (
    <ul>
      {produtos?.produtos?.map((produto) => (
        <li key={produto.id} style={{ opacity: produto.recebido ? 0.5 : 1 }}>
          <label>
            <input
              type="checkbox"
              checked={produto.recebido}
              onChange={(e) =>
                toggleRecebido({ id: produto.id, recebido: e.target.checked })
              }
            />
            <span>{produto.name}</span>
            {produto.QNT && <span> — Qtd: {produto.QNT}</span>}
            {produto.recebidoAt && (
              <small>
                {' '}✓ Recebido em {new Date(produto.recebidoAt).toLocaleString('pt-BR')}
              </small>
            )}
          </label>
        </li>
      ))}
    </ul>
  )
}