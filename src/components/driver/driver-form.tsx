"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QUERY_KEYS } from "@/config/routes"
import { create } from "@/lib/api"
import { Driver, driverSchema } from "@/schemas/driver"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface DriverFormProps {
	onSuccess?: () => void // ✅ callback para fechar o modal
}

export function DriverForm({ onSuccess }: DriverFormProps) {
   const queryClient = useQueryClient()

	const form = useForm<Driver>({
		resolver: zodResolver(driverSchema),
		defaultValues: {
			plate_number: "",
			name: "",
			car_type: "",
			capacity: 0,
		},
	})

	const onSubmit = async (data: Driver) => {
		try {
			await create(data, "drivers")
         // Invalida o cache dos motoristas para forçar atualização
         await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.driver.getAll,
         })
			toast.success("Motorista criado com sucesso!")
			form.reset() // ✅ limpa os campos
			onSuccess?.() // ✅ fecha o modal
		} catch (err: any) {
			toast.error("Erro ao cadastrar motorista", {
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
					name="plate_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Placa</FormLabel>
							<FormControl>
								<Input placeholder="OKK5B97" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="car_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Modelo do Veículo</FormLabel>
							<FormControl>
								<Input placeholder="Ex: Fiorino" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="capacity"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Capacidade de carga (m3)</FormLabel>
							<FormControl>
								<Input 
									type="number" 
									placeholder="Somente números. Ex: 150" 
									{...field}
									onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
								/>
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
