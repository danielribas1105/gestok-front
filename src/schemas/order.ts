import z from "zod"
   
export const orderSchema = z.object({
   id: z.uuid(),
   cod_order: z.number(),
   client_code: z.string(),
   user_name: z.string(),
   status: z.string(),
   observations: z.string(),

   origin_id: z.uuid(),
   destiny_id: z.uuid(),
   car_id: z.uuid(),
   driver_id: z.uuid(),
   m3: z.number(),
   statement_id: z.uuid(),
   user_id: z.uuid(),
   created_at: z.string(),
   updated_at: z.string()
})

export type Order = z.infer<typeof orderSchema>


/* export interface Order {
   id: string
   cod_order: number
   client_id: string
   user_id: string
   order_type: "BONIFICACAO" | "DEGUSTACAO" | "VENDA"
   order_date: string
   processed_date?: string
   status: "PENDENTE" | "PROCESSADO" | "CANCELADO"
   observations?: string
   client?: Client
   user?: User
   order_items: OrderItem[]
} */
