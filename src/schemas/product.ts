import { z } from "zod"

export const ProductSchema = z.object({
   id: z.uuid(),
   cod_product: z.string().min(4, "Código deve ter pelo menos 4 caracteres"),
	description: z.string().min(10, "Nome do produto deve ter pelo menos 10 caracteres"),
	unit: z.string().min(2, "Unidade deve ter pelo menos 2 caracteres"),
	value: z.number().positive("Valor deve ser positivo"),
   active: z.boolean(),
})

// Gerar o tipo TypeScript automaticamente
export type Product = z.infer<typeof ProductSchema>
