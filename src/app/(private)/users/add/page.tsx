import { UserForm } from "@/components/user/user-form"

export default function NewUserPage() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold mb-6">Novo Usuário</h1>
			<UserForm />
		</div>
	)
}
