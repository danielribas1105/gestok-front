import { apiRoutes } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

// Types
export interface Client {
   id: string
   cod_client: string
   client: string
   cpf_cnpj?: string
   phone?: string
   email?: string
   address?: string
   active: boolean
   created_at: string
}

export interface User {
   id: string
   name: string
   email: string
   role: string
   active: boolean
   created_at: string
}

export interface Product {
   id: string
   cod_product: string
   name: string
   unit: string
   unit_value: number
   active: boolean
   created_at: string
}

export interface OrderItem {
   id: string
   order_id: string
   product_id: string
   quantity: number
   unit_value: number
   total_value: number
   product?: Product
}

export interface Order {
   id: string
   cod_order: string
   client_id: string
   user_id: string
   order_type: "ENTRADA" | "SAIDA"
   order_date: string
   processed_date?: string
   status: "PENDENTE" | "PROCESSADO" | "CANCELADO"
   observations?: string
   client?: Client
   user?: User
   order_items: OrderItem[]
}

export interface OrdersResponse {
   orders: Order[]
   total: number
   page: number
   page_size: number
   total_pages: number
}

export interface OrderCreateItem {
   product_id: string
   quantity: number
   unit_value: number
}

export interface OrderCreatePayload {
   cod_order: string
   client_id: string
   order_type: "ENTRADA" | "SAIDA"
   observations?: string
   items: OrderCreateItem[]
}

export interface OrderProcessResponse {
   success: boolean
   message: string
   order: Order
   movements_created: number
}

// Transformed Order for display
export interface TransformedOrder {
   id: string
   cod_order: string
   client_name: string
   client_code: string
   user_name: string
   order_type: "ENTRADA" | "SAIDA"
   order_type_label: string
   order_date: string
   processed_date?: string
   status: "PENDENTE" | "PROCESSADO" | "CANCELADO"
   status_label: string
   total_items: number
   total_value: number
   observations?: string
   products_summary: string
   raw_data: Order
   }

   export const useOrders = (
   page: number = 1,
   pageSize: number = 20,
   search?: string
   ) => {
   const queryClient = useQueryClient()

   const query = useQuery({
      queryKey: ["getOrders", page, pageSize, search],
      queryFn: async () => {
         try {
         // Build query parameters
         const params = new URLSearchParams({
            page: page.toString(),
            page_size: pageSize.toString(),
         })
         
         if (search) {
            params.append("search", search)
         }

         // Fetch orders with all relationships
         const ordersData = await fetchBackend.get<OrdersResponse>(
            `${apiRoutes.orders.getAll}?${params.toString()}`
         )

         if (!ordersData?.orders) {
            throw new Error("Nenhum pedido encontrado")
         }

         // Transform orders for display
         const transformedOrders: TransformedOrder[] = ordersData.orders.map((order) => {
            // Calculate total value
            const totalValue = order.order_items.reduce(
               (sum, item) => sum + item.total_value,
               0
            )

            // Create products summary (first 3 products)
            const productsSummary = order.order_items
               .slice(0, 3)
               .map((item) => item.product?.name || "Produto desconhecido")
               .join(", ")
            const moreProduts = order.order_items.length > 3 
               ? ` +${order.order_items.length - 3}` 
               : ""

            return {
               id: order.id,
               cod_order: order.cod_order,
               client_name: order.client?.client || "Cliente não encontrado",
               client_code: order.client?.cod_client || "-",
               user_name: order.user?.name || "Usuário não encontrado",
               order_type: order.order_type,
               order_type_label: order.order_type === "ENTRADA" ? "Entrada" : "Saída",
               order_date: new Date(order.order_date).toLocaleDateString("pt-BR", {
               day: "2-digit",
               month: "2-digit",
               year: "numeric",
               hour: "2-digit",
               minute: "2-digit",
               }),
               processed_date: order.processed_date
               ? new Date(order.processed_date).toLocaleDateString("pt-BR", {
                     day: "2-digit",
                     month: "2-digit",
                     year: "numeric",
                     hour: "2-digit",
                     minute: "2-digit",
                  })
               : undefined,
               status: order.status,
               status_label: getStatusLabel(order.status),
               total_items: order.order_items.length,
               total_value: totalValue,
               observations: order.observations,
               products_summary: productsSummary + moreProduts,
               raw_data: order,
            }
         })

         return {
            orders: transformedOrders,
            total: ordersData.total,
            page: ordersData.page,
            page_size: ordersData.page_size,
            total_pages: ordersData.total_pages,
         }
         } catch (err) {
         console.error("Erro ao buscar pedidos:", err)
         throw new Error("Erro ao carregar pedidos")
         }
      },
   })

   // Function to invalidate and refetch orders
   const refreshOrders = async () => {
      await queryClient.invalidateQueries({
         queryKey: ["getOrders"],
      })
   }

   // Mutation to create a new order
   /* const createOrderMutation = useMutation({
      mutationFn: async ({
         orderData,
         userId,
      }: {
         orderData: OrderCreatePayload
         userId: string
      }) => {
         return await fetchBackend.post<Order>(
         `${apiRoutes.orders.create}?user_id=${userId}`,
         orderData
         )
      },
      onSuccess: () => {
         toast.success("Pedido criado com sucesso!")
         refreshOrders()
      },
      onError: (error: any) => {
         toast.error(error?.message || "Erro ao criar pedido")
         console.error("Erro ao criar pedido:", error)
      },
   }) */

   // Mutation to process an order
   /* const processOrderMutation = useMutation({
      mutationFn: async (orderId: string) => {
         return await fetchBackend.post<OrderProcessResponse>(
         apiRoutes.orders.process(orderId)
         )
      },
      onSuccess: (data) => {
         toast.success(
         `Pedido processado com sucesso! ${data.movements_created} movimentações criadas.`
         )
         refreshOrders()
      },
      onError: (error: any) => {
         toast.error(error?.message || "Erro ao processar pedido")
         console.error("Erro ao processar pedido:", error)
      },
   }) */

   // Mutation to cancel an order
   /* const cancelOrderMutation = useMutation({
      mutationFn: async (orderId: string) => {
         return await fetchBackend.post<Order>(
         apiRoutes.order.cancel(orderId)
         )
      },
      onSuccess: () => {
         toast.success("Pedido cancelado com sucesso!")
         refreshOrders()
      },
      onError: (error: any) => {
         toast.error(error?.message || "Erro ao cancelar pedido")
         console.error("Erro ao cancelar pedido:", error)
      },
   }) */

   // Get a single order by ID
   const getOrderById = (orderId: string) => {
      return query.data?.orders.find((order) => order.id === orderId)
   }

   // Filter orders by status
   const getOrdersByStatus = (status: Order["status"]) => {
      return query.data?.orders.filter((order) => order.raw_data.status === status) || []
   }

   // Filter orders by type
   const getOrdersByType = (type: Order["order_type"]) => {
      return query.data?.orders.filter((order) => order.raw_data.order_type === type) || []
   }

   // Calculate total value of all orders
   const getTotalValue = () => {
      return query.data?.orders.reduce((sum, order) => sum + order.total_value, 0) || 0
   }

   return {
      ...query,
      orders: query.data?.orders || [],
      pagination: {
         total: query.data?.total || 0,
         page: query.data?.page || 1,
         pageSize: query.data?.page_size || 20,
         totalPages: query.data?.total_pages || 0,
      },
      refreshOrders,
      /* createOrder: createOrderMutation.mutate,
      processOrder: processOrderMutation.mutate,
      cancelOrder: cancelOrderMutation.mutate,
      isCreating: createOrderMutation.isPending,
      isProcessing: processOrderMutation.isPending,
      isCanceling: cancelOrderMutation.isPending, */
      getOrderById,
      getOrdersByStatus,
      getOrdersByType,
      getTotalValue,
   }
}

// Helper function to get status label
function getStatusLabel(status: Order["status"]): string {
   const labels = {
      PENDENTE: "Pendente",
      PROCESSADO: "Processado",
      CANCELADO: "Cancelado",
   }
   return labels[status] || status
}