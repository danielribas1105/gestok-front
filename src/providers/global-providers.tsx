"use client"
import { COOKIE_NAMES, getCookieName } from "@/config/cookies"
import { FetchError } from "@/functions/fetch-backend"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusCodes } from "http-status-codes"
import { Provider } from "jotai"
import Cookies from "js-cookie"
import { NuqsAdapter } from "nuqs/adapters/next/app"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, _error) => {
				const error = _error as any as FetchError

				if (error.response?.status === StatusCodes.UNAUTHORIZED && !error.fetchOptions?.ignoreAuthError) {
					if (!error.tokenRefreshed) {
						Cookies.remove(getCookieName(COOKIE_NAMES.tokens.access))
						window.location.href = "/login"
						return false
					}
					return failureCount < 2
				}

				return false
			},
		},
	},
})

export const GlobalProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider>
				<NuqsAdapter>{children}</NuqsAdapter>
			</Provider>
		</QueryClientProvider>
	)
}
