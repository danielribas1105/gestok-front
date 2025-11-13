import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { GlobalProviders } from "@/providers/global-providers"
import { QueryProvider } from "@/providers/query-provider"
import { Toaster } from "sonner"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "GestOk",
	description: "Gestão inteligente de estoque",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<GlobalProviders>
			<html lang="pt-BR">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
					<Toaster />
					<QueryProvider>{children}</QueryProvider>
				</body>
			</html>
		</GlobalProviders>
	)
}
