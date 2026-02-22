// hooks/useProdutos.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/Api'

export function useProdutos() {
  return useQuery({
    queryKey: ['produtos'],
    queryFn: async () => {
      const response = await api.get('/produtos')
      console.log(response.data)
      return response.data
    },
  })
}

export function useToggleRecebido() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, recebido }) => {
      const { data } = await api.patch(`/produtos/${id}/recebido`, { recebido })
      return data
    },
    onMutate: async ({ id, recebido }) => {
      await queryClient.cancelQueries({ queryKey: ['produtos'] })

      const previous = queryClient.getQueryData(['produtos'])

      queryClient.setQueryData(['produtos'], (old) =>
        old?.map((p) => (p.id === id ? { ...p, recebido } : p))
      )

      return { previous }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(['produtos'], context?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos'] })
    },
  })
}