export type LoginResponse = {
	access_token: string
	token_type: string
	refresh_token: string
	expire_at: number
}

export type UserLogin = {
	id: string
	name: string
	email: string
	profile: string
}
