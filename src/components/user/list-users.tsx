"use client"
import { User } from "@/schemas/user"
import { useQuery } from "@tanstack/react-query"
import UserCard from "./user-card"

async function fetchUsers(): Promise<User[]> {
	const res = await fetch("http://localhost:8000/users")
	if (!res.ok) throw new Error("Erro ao buscar usuários")

   const data = await res.json()

	return data.users
}

export default function ListUsers() {
	const {
		data: users,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	})
   console.log("users",users)
	if (isLoading) return <p>Carregando usuários...</p>
	if (error) return <p>Erro ao carregar usuários</p>

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{users && users.map((user: User) => <UserCard key={user.id} user={user} />)}
		</div>
	)
}
