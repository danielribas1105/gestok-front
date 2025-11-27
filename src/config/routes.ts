import { UUID } from "crypto"

export const baseUrls = {
	backend: process.env.NEXT_PUBLIC_API_URL ?? "",
} as const satisfies Record<string, string>

export const apiRoutes = {
	auth: {
		login: "/auth/token",
		refresh: "/auth/refresh",
	},
	user: {
		register: "/user/register",
		me: "/users/me",
		getAll: "/users",
		change_password: "/change_password"
	},
	client: {
		getAll: "/clients",
		getByID: (params: UUID) => `/clients/${params}`,
	},
	product: {
		getAll: "/products",
		getByID: (params: UUID) => `/products/${params}`,
	},
	driver: {
		getAll: "/drivers",
		getByID: (params: UUID) => `/drivers/${params}`,
	},
	orders: {
		getAll: "/orders",
		getById: (id: UUID) => `/orders/${id}`,
		create: "/orders",
		process: (id: string) => `/orders/${id}/process`,
		cancel: (id: string) => `/orders/${id}/cancel`,
	},
	stock: {
		getAll: "/stock",
		getByID: (params: UUID) => `/stock/${params}`,
	},
	inventory: {
		getAll: "/inventory",
		getByID: (params: UUID) => `/inventory/${params}`,
	},
}

type ApiRoutesFirstLevel = keyof typeof apiRoutes

type ApiRoutesSecondLevel = {
	[K in ApiRoutesFirstLevel]: keyof (typeof apiRoutes)[K]
}[ApiRoutesFirstLevel]

export const QUERY_KEYS = Object.fromEntries(
	Object.entries(apiRoutes).map(([flk, slr]) => [
		flk,
		Object.fromEntries(Object.entries(slr).map(([slk]) => [slk, [flk, slk]])),
	]),
) as Record<ApiRoutesFirstLevel, Record<ApiRoutesSecondLevel, string[]>>

export const privateRoutes = ["/users", "/clients", "/products", "/stock", "/reports"]

export const defaultPrivateRoute = "/orders"
export const defaultPublicRoute = "/login"
