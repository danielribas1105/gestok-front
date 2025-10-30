import { IconBlocks, IconChecklist, IconCookie, IconForklift, IconLogout } from "@tabler/icons-react"
import { Construction, FileText, Home, Truck, UserCircle2 } from "lucide-react"

// Menu web application
export const itemsMenu = [
	{
		title: "Home",
		url: "/home",
		icon: Home,
	},
	{
		title: "Estoque",
		url: "/estoque",
		icon: IconBlocks,
	},
	{
		title: "Produtos",
		url: "/produtos",
		icon: IconCookie,
	},
	{
		title: "Usuários",
		url: "/users",
		icon: UserCircle2,
	},
	{
		title: "Relatórios",
		url: "/reports",
		icon: FileText,
	},
	{
		title: "Logout",
		url: "/",
		icon: IconLogout,
	},
]

// Menu landing page
export const menuLanding = [
	{
		title: "HOME",
		url: "/",
	},
	{
		title: "SOBRE NÓS",
		url: "/sobre-nos",
	},
	{
		title: "CONTATO",
		url: "/contato",
	},
]
