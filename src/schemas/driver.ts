import { z } from "zod"

export const driverSchema = z.object({
   id: z.uuid().optional(),
   plate_number: z.string().min(7, "A placa deve ter 7 dígitos. Ex: OKK5B97"),
   name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
   car_type: z.string(),
   capacity: z.number().positive("Valor deve ser positivo"),
   active: z.boolean().optional(),
})

// Gerar o tipo TypeScript automaticamente
export type Driver = z.infer<typeof driverSchema>
