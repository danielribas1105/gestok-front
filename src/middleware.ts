import { COOKIE_NAMES, getCookieName } from "@/config/cookies"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isPublicPath = pathname.startsWith("/login")
	const isPrivatePath = pathname.startsWith("/home")

	const token = request.cookies.get(getCookieName(COOKIE_NAMES.tokens.access))?.value

	if (pathname === "/") {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	// Bloqueia rotas privadas sem token
	if (isPrivatePath && !token) {
		return NextResponse.redirect(new URL("/login", request.url))
	}

	// Redireciona usuário autenticado que tenta acessar login
	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/home", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/", "/login", "/home/:path*"],
}