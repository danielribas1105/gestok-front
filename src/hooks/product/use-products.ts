import { apiRoutes, QUERY_KEYS } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { Product } from "@/schemas/product"
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface UseProductsProps {
	enabled?: boolean
	refetchInterval?: number
}

export const useProducts = (options?: UseProductsProps) => {
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: QUERY_KEYS.product.getAll,
		enabled: options?.enabled ?? true,
		refetchInterval: options?.refetchInterval,
		queryFn: async () => {
			try {
				const data = await fetchBackend.get<{ products: Product[] }>(apiRoutes.product.getAll)

				if (!data?.products) {
					throw new Error("Dados dos produtos não encontrados")
				}

				return data.products
			} catch (error) {
				console.error("Erro ao buscar produtos:", error)
				throw new Error("Erro ao carregar produtos")
			}
		},
	})

	// Método para invalidar e refazer a query
	const refreshProducts = async () => {
		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.product.getAll,
		})
	}

	// Método para adicionar produto otimisticamente ao cache
	const addProductOptimistic = (newProduct: Product) => {
		queryClient.setQueryData<Product[]>(QUERY_KEYS.product.getAll, (oldData) =>
			oldData ? [...oldData, newProduct] : [newProduct],
		)
	}

	// Método para atualizar produto no cache
	const updateProductInCache = (productId: string, updatedProduct: Partial<Product>) => {
		queryClient.setQueryData<Product[]>(
			QUERY_KEYS.product.getAll,
			(oldData) => oldData?.map((product) => (product.id === productId ? { ...product, ...updatedProduct } : product)) ?? [],
		)
	}

	// Método para remover produto do cache
	const removeProductFromCache = (productId: string) => {
		queryClient.setQueryData<Product[]>(
			QUERY_KEYS.product.getAll,
			(oldData) => oldData?.filter((product) => product.id !== productId) ?? [],
		)
	}

	return {
		products: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refreshProducts,
		/* addProductOptimistic,
      updateProductInCache,
		removeProductFromCache, */
		// Expõe o objeto query completo para casos avançados
		query,
	}
}
