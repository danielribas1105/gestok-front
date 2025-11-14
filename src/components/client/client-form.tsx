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

const clientSchema = z.object({
	cod_client: z.string().min(3, "Código deve ter pelo menos 3 caracteres"),
	client: z.string().min(10, "Nome deve ter pelo menos 10 caracteres"),
	active: z.boolean().optional(),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
	onSuccess?: () => void // ✅ callback para fechar o modal
}

export function ClientForm({ onSuccess }: ClientFormProps) {
	const router = useRouter()

	const form = useForm<ClientFormValues>({
		resolver: zodResolver(clientSchema),
		defaultValues: {
			cod_client: "",
			client: "",
			active: true,
		},
	})

	const onSubmit = async (data: ClientFormValues) => {
		try {
			await create(data, "clients")
			toast.success("Cliente criado com sucesso!")
			form.reset() // ✅ limpa os campos
			onSuccess?.() // ✅ fecha o modal
			//router.push("/users")
		} catch (err: any) {
			toast.error("Erro ao cadastrar cliente", {
				description: err.message || "Falha inesperada",
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
				<FormField
					control={form.control}
					name="cod_client"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Código do Cliente</FormLabel>
							<FormControl>
								<Input placeholder="000000" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="client"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente</FormLabel>
							<FormControl>
								<Input placeholder="Nome do cliente" {...field} />
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
