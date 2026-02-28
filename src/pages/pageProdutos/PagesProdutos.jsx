import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/Api';

const fetchProdutos = async (page = 0) => {
  const limit = 5
  const response = await api.get(`/produtos/pages?page=${page + 1}&limit=${limit}`)
  return {
    produtos: response.data.produtos,
    hasMore: response.data.hasMore
  }
}

export default function PagesProdutos() {
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(0)

  const { status, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ['produtos', page],
    queryFn: () => fetchProdutos(page),
    keepPreviousData: true,
    staleTime: 5000,
  })

  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['produtos', page + 1],
        queryFn: () => fetchProdutos(page + 1),
      })
    }
  }, [data, isPreviousData, page, queryClient])

  return (
    <div>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.produtos?.map((produto) => (
            <p key={produto.id}>{produto.name}</p>
          ))}
        </div>
      )}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
         disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => setPage((old) => (data?.hasMore ? old + 1 : old))}
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  )
}