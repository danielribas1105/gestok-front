import { apiRoutes, QUERY_KEYS } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { Stock } from "@/schemas/stock"
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface UseStockProps {
	enabled?: boolean
	refetchInterval?: number
}

export const useStock = (options?: UseStockProps) => {
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: QUERY_KEYS.inventory.getAll,
		enabled: options?.enabled ?? true,
		refetchInterval: options?.refetchInterval,
		queryFn: async () => {
			try {
				const data = await fetchBackend.get<{ stock: Stock[] }>(apiRoutes.inventory.getAll)

				if (!data?.stock) {
					throw new Error("Dados do estoque não encontrados")
				}

				return data.stock
			} catch (error) {
				console.error("Erro ao buscar estoque:", error)
				throw new Error("Erro ao carregar estoque")
			}
		},
	})

	// Método para invalidar e refazer a query
	const refreshStock = async () => {
		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.inventory.getAll,
		})
	}

	// Método para adicionar usuário otimisticamente ao cache
	const addStockOptimistic = (newStock: Stock) => {
		queryClient.setQueryData<Stock[]>(QUERY_KEYS.inventory.getAll, (oldData) =>
			oldData ? [...oldData, newStock] : [newStock],
		)
	}

	// Método para atualizar usuário no cache
	const updateStockInCache = (stockId: string, updatedStock: Partial<Stock>) => {
		queryClient.setQueryData<Stock[]>(
			QUERY_KEYS.inventory.getAll,
			(oldData) =>
				oldData?.map((stock) => (stock.id === stockId ? { ...stock, ...updatedStock } : stock)) ?? [],
		)
	}

	// Método para remover usuário do cache
	const removeStockFromCache = (stockId: string) => {
		queryClient.setQueryData<Stock[]>(
			QUERY_KEYS.inventory.getAll,
			(oldData) => oldData?.filter((stock) => stock.id !== stockId) ?? [],
		)
	}

	return {
		stock: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refreshStock,
		/* addStockOptimistic,
		updateStockInCache,
		removeStockFromCache, */
		// Expõe o objeto query completo para casos avançados
		query,
	}
}
