"use client"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { COOKIE_NAMES, getCookieName } from "@/config/cookies"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const router = useRouter()
	const [authorized, setAuthorized] = useState(false)

	useEffect(() => {
		const token = Cookies.get(getCookieName(COOKIE_NAMES.tokens.access))
		if (!token) {
			router.push("/login")
		} else {
			setAuthorized(true)
		}
	}, [router])

	if (!authorized) return null

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger />
			{children}
		</SidebarProvider>
	)
}