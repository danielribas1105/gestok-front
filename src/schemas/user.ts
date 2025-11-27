import { z } from "zod"

export const userSchema = z.object({
	id: z.uuid(),
	name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
	email: z.email(),
	password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
	active: z.boolean(),
	role: z.string(),
	image_url: z.string(),
})

// Gerar o tipo TypeScript automaticamente
export type User = z.infer<typeof userSchema>
