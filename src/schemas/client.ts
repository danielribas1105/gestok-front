import { z } from "zod"

const clientSchema = z.object({
   id: z.uuid(),
   cod_client: z.string().min(4, "Código deve ter pelo menos 4 caracteres"),
	client: z.string().min(10, "Nome deve ter pelo menos 10 caracteres"),
	active: z.boolean().optional(),
})

// Gerar o tipo TypeScript automaticamente
export type Client = z.infer<typeof clientSchema>