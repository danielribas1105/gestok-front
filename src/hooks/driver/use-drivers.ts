import { apiRoutes, QUERY_KEYS } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { Driver } from "@/schemas/driver"
import { User } from "@/schemas/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface UseDriversProps {
	enabled?: boolean
	refetchInterval?: number
}

export const useDrivers = (options?: UseDriversProps) => {
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: QUERY_KEYS.driver.getAll,
		enabled: options?.enabled ?? true,
		refetchInterval: options?.refetchInterval,
		queryFn: async () => {
			try {
				const data = await fetchBackend.get<{ drivers: Driver[] }>(apiRoutes.driver.getAll)

				if (!data?.drivers) {
					throw new Error("Dados dos motoristas não encontrados")
				}

				return data.drivers
			} catch (error) {
				console.error("Erro ao buscar motoristas:", error)
				throw new Error("Erro ao carregar motoristas")
			}
		},
	})

	// Método para invalidar e refazer a query
	const refreshDrivers = async () => {
		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.driver.getAll,
		})
	}

	// Método para adicionar usuário otimisticamente ao cache
	const addUserOptimistic = (newUser: User) => {
		queryClient.setQueryData<User[]>(QUERY_KEYS.user.getAll, (oldData) =>
			oldData ? [...oldData, newUser] : [newUser],
		)
	}

	// Método para atualizar usuário no cache
	const updateUserInCache = (userId: string, updatedUser: Partial<User>) => {
		queryClient.setQueryData<User[]>(
			QUERY_KEYS.user.getAll,
			(oldData) => oldData?.map((user) => (user.id === userId ? { ...user, ...updatedUser } : user)) ?? [],
		)
	}

	// Método para remover usuário do cache
	const removeUserFromCache = (userId: string) => {
		queryClient.setQueryData<User[]>(
			QUERY_KEYS.user.getAll,
			(oldData) => oldData?.filter((user) => user.id !== userId) ?? [],
		)
	}

	return {
		drivers: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refreshDrivers,
		/* addUserOptimistic,
      updateUserInCache,
		removeUserFromCache, */
		// Expõe o objeto query completo para casos avançados
		query,
	}
}
