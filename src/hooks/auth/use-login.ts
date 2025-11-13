import { tokensLifetime } from "@/config/auth"
import { COOKIE_NAMES, getCookieName } from "@/config/cookies"
import { apiRoutes, defaultPrivateRoute, defaultPublicRoute, QUERY_KEYS } from "@/config/routes"
import { fetchBackend, FetchError } from "@/functions/fetch-backend"
import { LoginResponse } from "@/types/api/auth"
import { useMutation } from "@tanstack/react-query"
import { addSeconds } from "date-fns"
import { StatusCodes } from "http-status-codes"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useLogin = () => {
	const router = useRouter()

	const fetchTokens = async ({ body }: { body: { username: string; password: string } }) => {
		
		return await fetchBackend
			.unauthPostForm<LoginResponse>(apiRoutes.auth.login, body, {
				ignoreAuthError: true,
			})
			.then((tokens) => {
				Cookies.set(getCookieName(COOKIE_NAMES.tokens.access), tokens.access_token, {
					expires: new Date(tokens.expire_at * 1000),
					sameSite: "strict",
				})

				Cookies.set(getCookieName(COOKIE_NAMES.tokens.refresh), tokens.refresh_token, {
					expires: addSeconds(new Date(), tokensLifetime.refresh),
					sameSite: "strict",
				})

				router.push(defaultPrivateRoute)
			})
			.catch((e) => {
				const error = e as FetchError

				Cookies.remove(getCookieName(COOKIE_NAMES.tokens.access))

				if (error.response?.status === StatusCodes.UNAUTHORIZED) {
					throw new Error("Invalid credentials")
				}

				toast.error("Alguma coisa deu errado!", {
					description: "Por favor, tente novamente.",
				})

				throw new Error()
			})
	}

	const loginMutation = useMutation({
		mutationFn: fetchTokens,
		mutationKey: QUERY_KEYS.auth.login,
	})

	return loginMutation
}

export const useLogout = () => {
	const router = useRouter()

	const logout = async () => {
		Cookies.remove(getCookieName(COOKIE_NAMES.tokens.access))
		Cookies.remove(getCookieName(COOKIE_NAMES.tokens.refresh))

		router.push(defaultPublicRoute)
	}

	return {
		logout,
	}
}
