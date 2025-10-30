export const COOKIE_NAMES = {
	tokens: {
		access: "access-token",
		refresh: "refresh-token",
	},
	/* sessionState: {
		selectedCompany: "selected-company",
		selectedUnit: "selected-unit",
	}, */
} as const satisfies Record<string, Record<string, string>>

export const COOKIE_PREFIX = "gestok--"

export type ValidCookieName = typeof COOKIE_NAMES extends Record<string, Record<string, infer V>> ? V : never

export const getCookieName = (name: ValidCookieName) => {
	return `${COOKIE_PREFIX}${name}`
}
