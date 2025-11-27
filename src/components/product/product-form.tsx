"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { QUERY_KEYS } from "@/config/routes"
import { create } from "@/lib/api"
import { Product, productSchema } from "@/schemas/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface ProductFormProps {
	onSuccess?: () => void
}

// Função para formatar o valor como moeda brasileira
const formatCurrency = (value: string): string => {
	// Remove tudo que não é dígito
	const numbers = value.replace(/\D/g, "")
	
	// Converte para centavos
	const amount = Number(numbers) / 100
	
	// Formata como moeda brasileira
	return amount.toLocaleString("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

// Função para converter o valor formatado de volta para número
const parseCurrency = (value: string): number => {
	const numbers = value.replace(/\D/g, "")
	return Number(numbers) / 100
}

export function ProductForm({ onSuccess }: ProductFormProps) {
	const queryClient = useQueryClient()

	const form = useForm<Product>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			cod_product: "",
			description: "",
			unit: "",
			value: 0,
		},
	})

	const onSubmit = async (data: Product) => {
		try {
			await create(data, "products")
			// Invalida o cache dos produtos para forçar atualização
			await queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.product.getAll,
			})
			toast.success("Produto criado com sucesso!")
			form.reset()
			onSuccess?.()
		} catch (err: any) {
			toast.error("Erro ao cadastrar produto", {
				description: err.message || "Falha inesperada",
			})
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
				<FormField
					control={form.control}
					name="cod_product"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Código do Produto</FormLabel>
							<FormControl>
								<Input placeholder="000000" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descrição</FormLabel>
							<FormControl>
								<Input placeholder="Nome completo do produto" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="unit"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unidade</FormLabel>
							<FormControl>
								<Input placeholder="CX, UN, KG, etc." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="value"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor</FormLabel>
							<FormControl>
								<div className="relative">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
										R$
									</span>
									<Input
										placeholder="0,00"
										className="pl-10"
										value={field.value ? formatCurrency(String(field.value * 100)) : ""}
										onChange={(e) => {
											const formatted = formatCurrency(e.target.value)
											const numericValue = parseCurrency(formatted)
											field.onChange(numericValue)
										}}
									/>
								</div>
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