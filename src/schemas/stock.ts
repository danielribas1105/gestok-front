import z from "zod"
   
export const StockSchema = z.object({
   id: z.uuid(),
   product_id: z.uuid(),
   current_quantity: z.number().positive("Valor deve ser positivo"),
   reserved_quantity: z.number().positive("Valor deve ser positivo"),
   available_quantity: z.number().positive("Valor deve ser positivo"),
   last_update: z.string()
})

export type Stock = z.infer<typeof StockSchema>
