import { apiRoutes, QUERY_KEYS } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserLogin } from "@/types/api/auth"
import { toast } from "sonner"

export const useCurrentUser = () => {
	const { data: user, ...userQuery } = useQuery({
		queryKey: QUERY_KEYS.user.me,
		queryFn: () => fetchBackend.get<UserLogin>(apiRoutes.user.me),
	})

	return {
		user,
		...userQuery,
	}
}

export const useUpdateUser = () => {
	const client = useQueryClient()

	// Função que realiza a atualização do usuário no backend
	const updateUserData = async (userData: { user_id: UserLogin["id"]; email: string; name: string }) => {
		const { user_id, email, name } = userData

		if (!user_id || !email || !name) {
			throw new Error("Incomplete data for update.")
		}

		try {
			// Fazendo a requisição PUT para o backend (ajuste aqui para seu endpoint real)
			const response = await fetchBackend.put(apiRoutes.user.me, {
				user_id,
				email: email,
				name: name,
			})

			// Verificação da resposta
			if (!response) {
				throw new Error("Unexpected error: invalid server response.")
			}
			return response // Retorna a resposta do backend
		} catch (e) {
			// Lançamento de erro, se algo der errados
			console.error("Error:", e)
			throw new Error((e as Error).message || "Error while trying to update the user.")
		}
	}

	// Usando useMutation para disparar a mutação
	const mutation = useMutation({
		mutationFn: updateUserData,

		mutationKey: ["updateUser"],

		onError: (e: any) => {
			// Exibindo erro com toast
			toast.error("Error updating", {
				description: (e as Error).message || "Something went wrong while trying to update the user.",
			})
		},
		onSuccess: async () => {
			await client.refetchQueries({
				queryKey: ["updateUser"],
				exact: false,
			})

			toast.success("Success", {
				description: "The user has been successfully updated.",
			})
		},
	})

	return mutation
}

export const useChangePassword = () => {
	const client = useQueryClient()
	const changePassword = async (passwordUpdateData: {
		user_id: UserLogin["id"]
		password: string
		confirmPassword: string
	}) => {
		const { user_id, password, confirmPassword } = passwordUpdateData
		if (!user_id || !password || !confirmPassword) {
			throw new Error("Incomplete data for password change.")
		}
		try {
			const response = await fetchBackend.put(apiRoutes.user.change_password, {
				user_id,
				password,
				confirm_password: confirmPassword,
			})

			if (!response) {
				throw new Error("Unexpected error: invalid server response.")
			}
			return response
		} catch (e) {
			console.error("Error:", e)
			throw new Error((e as Error).message || "Error while trying to change the password.")
		}
	}

	const mutation = useMutation({
		mutationFn: async (passwordUpdateData: {
			user_id: UserLogin["id"]
			password: string
			confirmPassword: string
		}) => changePassword(passwordUpdateData),
		mutationKey: ["changePassword"],
		onError: (e: any) => {
			toast.error("Error updating", {
				description: (e as Error).message || "Something went wrong while trying to update the user.",
			})
		},
		onSuccess: async (userData) => {
			toast.success("Success!", {
				description: "The user has been successfully updated.",
			})
			await client.invalidateQueries({ queryKey: ["user"] })
		},
	})

	return mutation
}
