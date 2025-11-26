import z from "zod"
   
export const OrderSchema = z.object({
   id: z.uuid(),
   cod_order: z.string(),
   client_code: z.string(),
   client_name: z.string(),
   user_name: z.string(),
   status: z.string(),
   observations: z.string(),

   origin_id: z.uuid(),
   destiny_id: z.uuid(),
   car_id: z.uuid(),
   driver_id: z.uuid(),
   m3: z.float32(),
   statement_id: z.uuid(),
   user_id: z.uuid(),
   created_at: z.string(),
   updated_at: z.string()
})

export type Order = z.infer<typeof OrderSchema>
