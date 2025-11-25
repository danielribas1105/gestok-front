import { apiRoutes, QUERY_KEYS } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { User } from "@/schemas/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"

interface UseUsersProps {
	enabled?: boolean
	refetchInterval?: number
}

export const useUsers = (options?: UseUsersProps) => {
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: QUERY_KEYS.user.getAll,
		enabled: options?.enabled ?? true,
		refetchInterval: options?.refetchInterval,
		queryFn: async () => {
			try {
				const data = await fetchBackend.get<{ users: User[] }>(apiRoutes.user.getAll)

				if (!data?.users) {
					throw new Error("Dados de usuários não encontrados")
				}

				return data.users
			} catch (error) {
				console.error("Erro ao buscar usuários:", error)
				throw new Error("Erro ao carregar usuários")
			}
		},
	})

	// Método para invalidar e refazer a query
	const refreshUsers = async () => {
		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.user.getAll,
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
		users: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refreshUsers,
		addUserOptimistic,
      updateUserInCache,
		removeUserFromCache,
		// Expõe o objeto query completo para casos avançados
		query,
	}
}
