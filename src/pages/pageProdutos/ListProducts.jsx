import Dock from '../../components/Dock'
import Header from '../../components/Header'
import { useProdutos, useToggleRecebido } from '../../hooks/useProdutos'

export function ListProduct() {
  const { data: produtos, isLoading, isError } = useProdutos()
  const { mutate: toggleRecebido, isPending } = useToggleRecebido()

  if (isLoading) return <p>Carregando...</p>
  if (isError) return <p>Erro ao carregar produtos.</p>

  return (
    <>
    
    <Header/>

    <table className="table-auto border-collapse border border-gray-700 w-full text-sm">
      <thead className="border-collapse border border-gray-700 ">
        <tr>
          <th className="px-2 py-1 text-sm text-accent text-left border-collapse border border-gray-800">Produto</th>
          <th className="px-2 py-1 text-sm text-accent text-left border-collapse border border-gray-800">QNT</th>
          <th className="px-2 py-1 text-sm text-accent text-left border-collapse border border-gray-800">D1</th>
          <th className="px-2 py-1 text-sm text-accent text-left border-collapse border border-gray-800">D2</th>
          <th className="px-2 py-1 text-sm text-accent text-left border-collapse border border-gray-800">Recebido</th>
        </tr>
      </thead>
    
      <tbody>
        {produtos?.produtos?.map((produto) => (
          <tr key={produto.id}>
             <td className='px-2 py-1 text-left'>{produto.name}</td>
             <td className='px-4 py-1 text-left'>{produto.QNT}</td>
             <td className='px-4 py-1 text-left'>{produto.D1}</td>
             <td className='px-4 py-1 text-left'>{produto.D2}</td>
             <td className='px-4 py-1 text-left'>
              <label>
            <input
              type="checkbox"
              checked={produto.recebido}
              onChange={(e) =>
                toggleRecebido({ id: produto.id, recebido: e.target.checked })
              }
            />
            
            {produto.recebidoAt && (
              <small className='text-accent'>
                {' '} {new Date(produto.recebidoAt).toLocaleString('pt-BR')}
              </small>
            )}
          </label>

             </td>
          </tr>
        ))}
      
      </tbody>
    </table>
    <div className='p-2 gap-8 justify-center flex'>
          <button className='border rounded-sm p-1 bg-gray-800' type="button">Proximo</button>
          <button className='border rounded-sm p-1  bg-gray-800' type="button">Anterior</button>
      </div>
    
    <Dock/>
    </>
  )
}