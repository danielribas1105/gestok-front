"use client"
import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
import { AddUserModal } from "@/components/user/add-user-modal"
import ListUsers from "@/components/user/list-users"
import { useState } from "react"

export default function UsersPage() {
	const [open, setOpen] = useState(false)
	
	return (
		<PageLayout>
			<section className="flex flex-col gap-7">
				{/* Título e campo de busca */}
				<TitlePage
					title="Usuários"
					placeholder="Procure pelo nome"
					textButton="Adicionar Usuário"
					onButtonClick={() => setOpen(true)}
				/>

				{/* Modal de adicionar usuário */}
				<div className="flex justify-end">
					<AddUserModal open={open} onOpenChange={setOpen} />
				</div>

				{/* Tabela de usuários (futuro) */}
				<div className="flex justify-center">
					<ListUsers />
				</div>
			</section>
		</PageLayout>
	)
}
