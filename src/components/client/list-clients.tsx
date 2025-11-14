"use client"
import { Client } from "@/schemas/client"
import { useQuery } from "@tanstack/react-query"
import ClientCard from "./client-card"

async function fetchClients(): Promise<Client[]> {
	const res = await fetch("http://localhost:8000/clients")
	if (!res.ok) throw new Error("Erro ao buscar clientes")

   const data = await res.json()

	return data.clients
}

export default function ListClients() {
	const {
		data: clients,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["clients"],
		queryFn: fetchClients,
	})
   console.log("clients",clients)
	if (isLoading) return <p>Carregando clientes...</p>
	if (error) return <p>Erro ao carregar clientes</p>

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{clients && clients.map((client: Client) => <ClientCard key={client.id} client={client} />)}
		</div>
	)
}
