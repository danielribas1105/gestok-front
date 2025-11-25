import { User } from "@/schemas/user"
import { apiRoutes, QUERY_KEYS } from "@/config/routes"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { fetchBackend } from "@/functions/fetch-backend"

interface ChangePasswordData {
	old_password: string
	new_password: string
}

export const useCurrentUser = () => {
	const queryClient = useQueryClient()

	// Query para buscar dados do usuário atual
	const query = useQuery({
		queryKey: QUERY_KEYS.user.me,
		queryFn: async () => {
			try {
				const data = await fetchBackend.get<User>(apiRoutes.user.me)

				if (!data) {
					throw new Error("Dados do usuário não encontrados")
				}

				return data
			} catch (err) {
				console.error("Erro ao buscar dados do usuário:", err)
				throw new Error("Erro ao carregar perfil")
			}
		},
		staleTime: 1000 * 60 * 5, // 5 minutos
	})

	// Mutation para alterar senha
	const changePasswordMutation = useMutation({
		mutationFn: async (data: ChangePasswordData) => {
			return fetchBackend.post<ChangePasswordData, { message: string }>(
				apiRoutes.user.change_password,
				data,
			)
		},
		onSuccess: () => {
			toast.success("Senha alterada com sucesso")
		},
		onError: (error: any) => {
			toast.error(error?.data?.detail || "Erro ao alterar senha")
		},
	})

	// Método para invalidar dados do usuário
	const refreshUser = async () => {
		await queryClient.invalidateQueries({
			queryKey: QUERY_KEYS.user.me,
		})
	}

	// Método para atualizar dados do usuário no cache
	const updateUserInCache = (updatedUser: Partial<User>) => {
		queryClient.setQueryData<User>(QUERY_KEYS.user.me, (oldData) =>
			oldData ? { ...oldData, ...updatedUser } : undefined,
		)
	}

	return {
		user: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refreshUser,
		updateUserInCache,
		changePassword: changePasswordMutation.mutate,
		changePasswordAsync: changePasswordMutation.mutateAsync,
		isChangingPassword: changePasswordMutation.isPending,
		query,
	}
}
