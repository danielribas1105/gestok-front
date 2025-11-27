import { z } from "zod"

export const productSchema = z.object({
   id: z.uuid().optional(),
   cod_product: z.string().min(4, "Código deve ter pelo menos 4 caracteres"),
	description: z.string().min(10, "Nome do produto deve ter pelo menos 10 caracteres"),
	unit: z.string().min(2, "Unidade deve ter pelo menos 2 caracteres"),
	value: z.number().positive("Valor deve ser positivo"),
   active: z.boolean().optional(),
})

// Gerar o tipo TypeScript automaticamente
export type Product = z.infer<typeof productSchema>
