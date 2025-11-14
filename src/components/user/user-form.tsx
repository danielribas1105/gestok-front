"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { create } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const userSchema = z.object({
	name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
	role: z.string().optional(),
})

type UserFormValues = z.infer<typeof userSchema>

interface UserFormProps {
	onSuccess?: () => void // ✅ callback para fechar o modal
}

export function UserForm({ onSuccess }: UserFormProps) {
	const router = useRouter()

	const form = useForm<UserFormValues>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			role: "",
		},
	})

	const onSubmit = async (data: UserFormValues) => {
		try {
			await create(data, "users")
			toast.success("Usuário criado com sucesso!")
			form.reset() // ✅ limpa os campos
			onSuccess?.() // ✅ fecha o modal
			//router.push("/users")
		} catch (err: any) {
			toast.error("Erro ao cadastrar usuário", {
				description: err.message || "Falha inesperada",
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="Ex: João Silva" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input placeholder="exemplo@empresa.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input type="password" placeholder="••••••••" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Função</FormLabel>
							<FormControl>
								<Input placeholder="admin / user" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={form.formState.isSubmitting}>
					{form.formState.isSubmitting ? "Salvando..." : "Cadastrar"}
				</Button>
			</form>
		</Form>
	)
}
