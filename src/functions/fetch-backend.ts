import { tokensLifetime } from "@/config/auth"
import { COOKIE_NAMES, getCookieName } from "@/config/cookies"
import { apiRoutes, baseUrls } from "@/config/routes"
import { LoginResponse } from "@/types/api/auth"
import { addSeconds } from "date-fns"
import { StatusCodes } from "http-status-codes"
import Cookies from "js-cookie"

type FetchOptions = {
	authToken?: string
	ignoreAuthError?: boolean
	companyId?: string
	queryParams?: Record<string, string | number | boolean>
}

const baseHeaders: HeadersInit = {
	Accept: "application/json",
}

const formDataHeaders: HeadersInit = {
	...baseHeaders,
}

const jsonBodyHeaders: HeadersInit = {
	...baseHeaders,
	"Content-Type": "application/json",
}

const assembleHeaders = (headers: HeadersInit, authToken?: string, companyId?: string) => {
	return {
		...headers,
		...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
		...(companyId ? { "X-Tenant-Id": companyId } : {}),
	}
}

export type FetchError<T extends BasicErrorResponse = BasicErrorResponse> = {
	error: string
	data: T
	response?: Response
	fetchOptions?: FetchOptions
	tokenRefreshed: boolean
}

export type BasicErrorResponse = {
	detail: string
}

const buildUrl = (path: string, queryParams?: Record<string, string | number | boolean>) => {
	const query = Object.entries(queryParams ?? {})
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join("&")

	return `${baseUrls.backend}${path}${queryParams ? `?${query}` : ""}`
}

const insecureGet = async <TResponseBody extends object | unknown = unknown>(
	url: string,
	fetchOptions?: FetchOptions,
) => {
	const requestOptions = {
		method: "GET",
		headers: assembleHeaders(jsonBodyHeaders, fetchOptions?.authToken, fetchOptions?.companyId),
	}

	return fetch(buildUrl(url, fetchOptions?.queryParams), requestOptions).then((response) =>
		handleResponse<TResponseBody>(response, fetchOptions),
	)
}

const get = async <TResponseBody extends object | unknown = unknown>(
	url: string,
	fetchOptions?: FetchOptions,
) => {
	return insecureGet<TResponseBody>(url, {
		authToken:
			typeof window !== "undefined" ? Cookies.get(getCookieName(COOKIE_NAMES.tokens.access)) : undefined,
		...fetchOptions,
	})
}

const insecurePost = async <
	TRequestBody extends object | unknown = unknown,
	TResponseBody extends object | unknown = unknown,
>(
	url: string,
	body: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	const requestOptions = {
		method: "POST",
		headers: assembleHeaders(jsonBodyHeaders, fetchOptions?.authToken, fetchOptions?.companyId),
		body: JSON.stringify(body),
	}

	return fetch(buildUrl(url, fetchOptions?.queryParams), requestOptions).then((response) =>
		handleResponse<TResponseBody>(response, fetchOptions),
	)
}

const post = async <
	TRequestBody extends object | unknown = unknown,
	TResponseBody extends object | unknown = unknown,
>(
	url: string,
	body: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	return insecurePost<TRequestBody, TResponseBody>(url, body, {
		authToken:
			typeof window !== "undefined" ? Cookies.get(getCookieName(COOKIE_NAMES.tokens.access)) : undefined,
		...fetchOptions,
	})
}

const insecurePostForm = async <TResponseBody extends object | unknown = unknown>(
	url: string,
	body: Record<string, string | Blob>,
	fetchOptions?: FetchOptions,
) => {
	const formData = new FormData()
	Object.entries(body).forEach(([key, value]) => {
		formData.append(key, value)
	})

	const requestOptions = {
		method: "POST",
		headers: assembleHeaders(formDataHeaders, fetchOptions?.authToken, fetchOptions?.companyId),
		body: formData,
	}

	return fetch(buildUrl(url, fetchOptions?.queryParams), requestOptions).then((response) =>
		handleResponse<TResponseBody>(response, fetchOptions),
	)
}

const postForm = async <TResponseBody extends object | unknown = unknown>(
	url: string,
	body: Record<string, string | Blob>,
	fetchOptions?: FetchOptions,
) => {
	return insecurePostForm<TResponseBody>(url, body, {
		authToken:
			typeof window !== "undefined" ? Cookies.get(getCookieName(COOKIE_NAMES.tokens.access)) : undefined,
		...fetchOptions,
	})
}

const insecurePut = async <TRequestBody extends object, TResponseBody extends object | unknown = unknown>(
	url: string,
	body: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	const requestOptions = {
		method: "PUT",
		headers: assembleHeaders(jsonBodyHeaders, fetchOptions?.authToken, fetchOptions?.companyId),
		body: JSON.stringify(body),
	}
	return fetch(buildUrl(url, fetchOptions?.queryParams), requestOptions).then((response) =>
		handleResponse<TResponseBody>(response, fetchOptions),
	)
}

const put = async <TRequestBody extends object, TResponseBody extends object | unknown = unknown>(
	url: string,
	body: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	return insecurePut<TRequestBody, TResponseBody>(url, body, {
		authToken:
			typeof window !== "undefined" ? Cookies.get(getCookieName(COOKIE_NAMES.tokens.access)) : undefined,
		...fetchOptions,
	})
}

const insecurePatch = async <TRequestBody extends object, TResponseBody extends object | unknown = unknown>(
	url: string,
	body: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	const requestOptions = {
		method: "PATCH",
		headers: assembleHeaders(jsonBodyHeaders, fetchOptions?.authToken, fetchOptions?.companyId),
		body: JSON.stringify(body),
	}
	return fetch(buildUrl(url, fetchOptions?.queryParams), requestOptions).then((response) =>
		handleResponse<TResponseBody>(response, fetchOptions),
	)
}

const patch = async <TRequestBody extends object, TResponseBody extends object | unknown = unknown>(
	url: string,
	body: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	return insecurePatch<TRequestBody, TResponseBody>(url, body, {
		authToken:
			typeof window !== "undefined" ? Cookies.get(getCookieName(COOKIE_NAMES.tokens.access)) : undefined,
		...fetchOptions,
	})
}

const insecureDelete = async <
	TRequestBody extends object | unknown = unknown,
	TResponseBody extends object | unknown = unknown,
>(
	url: string,
	body?: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	const requestOptions = {
		method: "DELETE",
		headers: assembleHeaders(jsonBodyHeaders, fetchOptions?.authToken, fetchOptions?.companyId),
		body: body ? JSON.stringify(body) : "",
	}
	return fetch(buildUrl(url, fetchOptions?.queryParams), requestOptions).then((response) =>
		handleResponse<TResponseBody>(response, fetchOptions),
	)
}

const _delete = async <
	TRequestBody extends object | unknown = unknown,
	TResponseBody extends object | unknown = unknown,
>(
	url: string,
	body?: TRequestBody,
	fetchOptions?: FetchOptions,
) => {
	return insecureDelete<TRequestBody, TResponseBody>(url, body, {
		authToken:
			typeof window !== "undefined" ? Cookies.get(getCookieName(COOKIE_NAMES.tokens.access)) : undefined,
		...fetchOptions,
	})
}

let refreshTokenPromise: Promise<boolean> | null = null

const handleResponse = async <TResponseBody extends object | unknown = unknown>(
	response: Response,
	fetchOptions?: FetchOptions,
) => {
	if (!response.ok) {
		const data = (await response.json()) as BasicErrorResponse
		let error = "Something went wrong. Please try again."

		if (data) {
			error = data.detail ?? error
		}

		let tokenRefreshed = false

		if (
			response?.status === StatusCodes.UNAUTHORIZED &&
			typeof window !== "undefined" &&
			!fetchOptions?.ignoreAuthError
		) {
			Cookies.remove(getCookieName(COOKIE_NAMES.tokens.access))

			const refreshToken = Cookies.get(getCookieName(COOKIE_NAMES.tokens.refresh))

			if (refreshToken) {
				if (!refreshTokenPromise) {
					refreshTokenPromise = insecurePost<{ refresh_token: string }, LoginResponse>(
						apiRoutes.auth.refresh,
						{
							refresh_token: refreshToken,
						},
						{ ignoreAuthError: true },
					)
						.then((tokens) => {
							Cookies.set(getCookieName(COOKIE_NAMES.tokens.access), tokens.access_token, {
								expires: new Date(tokens.expire_at * 1000),
								sameSite: "strict",
							})

							Cookies.set(getCookieName(COOKIE_NAMES.tokens.refresh), tokens.refresh_token, {
								expires: addSeconds(new Date(), tokensLifetime.refresh),
								sameSite: "strict",
							})

							return true
						})
						.catch(() => false)
						.finally(() => {
							refreshTokenPromise = null
						})
				}
				tokenRefreshed = (await refreshTokenPromise) as boolean
			}

			// if (refreshToken) {
			//   tokenRefreshed = (await insecurePost<
			//     { refresh_token: string },
			//     LoginResponse
			//   >(
			//     apiRoutes.auth.refresh,
			//     {
			//       refresh_token: refreshToken,
			//     },
			//     { ignoreAuthError: true }
			//   )
			//     .then((tokens) => {
			//       Cookies.set(
			//         getCookieName(COOKIE_NAMES.tokens.access),
			//         tokens.access_token,
			//         {
			//           expires: new Date(tokens.expire_at * 1000),
			//           sameSite: "strict",
			//         }
			//       );

			//       Cookies.set(
			//         getCookieName(COOKIE_NAMES.tokens.refresh),
			//         tokens.refresh_token,
			//         {
			//           expires: addSeconds(new Date(), tokensLifetime.refresh),
			//           sameSite: "strict",
			//         }
			//       );

			//       return true;
			//     })
			//     .catch(() => false)) as boolean;
			// }
		}

		return Promise.reject({
			error,
			data,
			response,
			fetchOptions,
			tokenRefreshed,
		} satisfies FetchError<BasicErrorResponse>)
	}

	const data = (await response.json().catch(() => ({ ok: response.ok }))) as TResponseBody

	return data
}

export const fetchBackend = {
	get,
	post,
	postForm,
	put,
	patch,
	delete: _delete,
	unauthGet: insecureGet,
	unauthPost: insecurePost,
	unauthPostForm: insecurePostForm,
	unauthPut: insecurePut,
	unauthPatch: insecurePatch,
	unauthDelete: insecureDelete,
}
