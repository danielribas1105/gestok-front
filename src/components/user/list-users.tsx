"use client"
import { useUsers } from "@/hooks/user/use-users"
import UserCard from "./user-card"

export default function ListUsers() {
	const { users, isLoading, isError, error } = useUsers()

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-muted-foreground">Carregando usuários...</p>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-destructive">
					{error instanceof Error ? error.message : "Erro ao carregar usuários"}
				</p>
			</div>
		)
	}

	if (!users?.length) {
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-muted-foreground">Nenhum usuário encontrado</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	)
}
