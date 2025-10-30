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
		me: "/user/me",
		getAll: "/user",
		change_password: "/change_password"
	},
	car: {
		getAll: "/car",
		getByID: (params: UUID) => `/car/${params}`,
	},
	work: {
		getAll: "/work",
		getByID: (params: UUID) => `/work/${params}`,
	},
	job: {
		getAll: "/job",
		getByID: (params: UUID) => `/job/${params}`,
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

export const privateRoutes = ["/users", "/works", "/cars", "/statements", "/reports"]

export const defaultPrivateRoute = "/home"
export const defaultPublicRoute = "/login"
