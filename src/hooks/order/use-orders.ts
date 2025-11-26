import { apiRoutes } from "@/config/routes"
import { fetchBackend } from "@/functions/fetch-backend"
import { Product } from "@/schemas/product"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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

/* export interface Product {
	id: string
	cod_product: string
	name: string
	unit: string
	unit_value: number
	active: boolean
	created_at: string
} */

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
	order_type: "BONIFICACAO" | "DEGUSTACAO" | "VENDA"
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
	order_type: "BONIFICACAO" | "DEGUSTACAO" | "VENDA"
	observations?: string
	items: OrderCreateItem[]
}

export interface OrderProcessResponse {
	success: boolean
	message: string
	order: Order
	movements_created: number
}

// Flattened Order Item Row - cada linha representa um item de pedido
export interface OrderItemRow {
	// Dados do pedido (repetidos em cada linha)
	order_id: string
	cod_order: string
	order_type: "BONIFICACAO" | "DEGUSTACAO" | "VENDA"
	order_type_label: string
	order_date: string
	order_date_formatted: string
	processed_date?: string
	processed_date_formatted?: string
	status: "PENDENTE" | "PROCESSADO" | "CANCELADO"
	status_label: string
	observations?: string

	// Dados do cliente (repetidos em cada linha)
	client_id: string
	client_name: string
	client_code: string
	client_cpf_cnpj?: string
	client_phone?: string
	client_email?: string

	// Dados do usuário (repetidos em cada linha)
	user_id: string
	user_name: string
	user_email: string

	// Dados do item específico desta linha
	item_id: string
	product_id: string
	product_code: string
	product_name: string
	product_unit: string
	quantity: number
	unit_value: number
	item_total_value: number

	// Metadados do pedido
	total_order_items: number
	total_order_value: number

	// Dados brutos para referência
	raw_order: Order
	raw_item: OrderItem
}

export const useOrders = (page: number = 1, pageSize: number = 20, search?: string) => {
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
					`${apiRoutes.orders.getAll}?${params.toString()}`,
				)

				if (!ordersData?.orders) {
					throw new Error("Nenhum pedido encontrado")
				}

				// Flatten orders: cada item vira uma linha
				const flattenedRows: OrderItemRow[] = []

				ordersData.orders.forEach((order) => {
               console.log("order",order)
               console.log("order.order_items",order.order_items)
					// Calculate total order value
					const totalOrderValue = order.order_items.reduce((sum, item) => sum + item.total_value, 0)

					const totalOrderItems = order.order_items.length

					// Para cada item do pedido, criar uma linha
					order.order_items.forEach((item) => {
						flattenedRows.push({
							// Dados do pedido (repetidos)
							order_id: order.id,
							cod_order: order.cod_order,
							order_type: order.order_type,
							order_type_label: order.order_type === "VENDA" ? "Venda" : "Degustação",
							order_date: order.order_date,
							order_date_formatted: new Date(order.order_date).toLocaleDateString("pt-BR", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
								/* hour: "2-digit",
								minute: "2-digit", */
							}),
							processed_date: order.processed_date || undefined,
							processed_date_formatted: order.processed_date
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
							observations: order.observations,

							// Dados do cliente (repetidos)
							client_id: order.client_id,
							client_name: order.client?.client || "Cliente não encontrado",
							client_code: order.client?.cod_client || "-",
							client_cpf_cnpj: order.client?.cpf_cnpj,
							client_phone: order.client?.phone,
							client_email: order.client?.email,

							// Dados do usuário (repetidos)
							user_id: order.user_id,
							user_name: order.user?.name || "Usuário não encontrado",
							user_email: order.user?.email || "-",

							// Dados específicos do item
							item_id: item.id,
							product_id: item.product_id,
							product_code: item.product?.cod_product || "-",
							product_name: item.product?.description || "Produto desconhecido",
							product_unit: item.product?.unit || "-",
							quantity: item.quantity,
							unit_value: item.unit_value,
							item_total_value: item.total_value,

							// Metadados
							total_order_items: totalOrderItems,
							total_order_value: totalOrderValue,

							// Raw data
							raw_order: order,
							raw_item: item,
						})
					})
				})

				return {
					rows: flattenedRows,
					total: ordersData.total,
					page: ordersData.page,
					page_size: ordersData.page_size,
					total_pages: ordersData.total_pages,
					total_rows: flattenedRows.length,
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

	// Get all rows for a specific order
	const getRowsByOrderId = (orderId: string) => {
		return query.data?.rows.filter((row) => row.order_id === orderId) || []
	}

	// Get unique orders (deduplicated)
	const getUniqueOrders = () => {
		if (!query.data?.rows) return []

		const uniqueOrdersMap = new Map<string, OrderItemRow>()
		query.data.rows.forEach((row) => {
			if (!uniqueOrdersMap.has(row.order_id)) {
				uniqueOrdersMap.set(row.order_id, row)
			}
		})

		return Array.from(uniqueOrdersMap.values())
	}

	// Filter rows by order status
	const getRowsByStatus = (status: Order["status"]) => {
		return query.data?.rows.filter((row) => row.status === status) || []
	}

	// Filter rows by order type
	const getRowsByType = (type: Order["order_type"]) => {
		return query.data?.rows.filter((row) => row.order_type === type) || []
	}

	// Filter rows by product
	const getRowsByProduct = (productId: string) => {
		return query.data?.rows.filter((row) => row.product_id === productId) || []
	}

	// Filter rows by client
	const getRowsByClient = (clientId: string) => {
		return query.data?.rows.filter((row) => row.client_id === clientId) || []
	}

	// Calculate total value of all rows
	const getTotalValue = () => {
		return query.data?.rows.reduce((sum, row) => sum + row.item_total_value, 0) || 0
	}

	// Calculate total quantity of a specific product
	const getTotalQuantityByProduct = (productId: string) => {
		return (
			query.data?.rows
				.filter((row) => row.product_id === productId)
				.reduce((sum, row) => sum + row.quantity, 0) || 0
		)
	}

	// Get summary statistics
	const getSummary = () => {
		if (!query.data?.rows) {
			return {
				totalOrders: 0,
				totalItems: 0,
				totalValue: 0,
				pendingOrders: 0,
				processedOrders: 0,
				canceledOrders: 0,
			}
		}

		const uniqueOrders = getUniqueOrders()

		return {
			totalOrders: uniqueOrders.length,
			totalItems: query.data.rows.length,
			totalValue: getTotalValue(),
			pendingOrders: uniqueOrders.filter((r) => r.status === "PENDENTE").length,
			processedOrders: uniqueOrders.filter((r) => r.status === "PROCESSADO").length,
			canceledOrders: uniqueOrders.filter((r) => r.status === "CANCELADO").length,
		}
	}

	return {
		...query,
		rows: query.data?.rows || [],
		pagination: {
			total: query.data?.total || 0,
			page: query.data?.page || 1,
			pageSize: query.data?.page_size || 20,
			totalPages: query.data?.total_pages || 0,
			totalRows: query.data?.total_rows || 0,
		},
		refreshOrders,
		getRowsByOrderId,
		getUniqueOrders,
		getRowsByStatus,
		getRowsByType,
		getRowsByProduct,
		getRowsByClient,
		getTotalValue,
		getTotalQuantityByProduct,
		getSummary,
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
