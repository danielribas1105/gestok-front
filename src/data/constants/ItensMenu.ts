import { IconBlocks, IconChecklist, IconCookie, IconForklift, IconLogout } from "@tabler/icons-react"
import { Construction, FileText, Home, Truck, UserCircle2, UserStar } from "lucide-react"

// Menu web application
export const itemsMenu = [
	{
		title: "Home",
		url: "/home",
		icon: Home,
	},
	{
		title: "Estoque",
		url: "/stock",
		icon: IconBlocks,
	},
	{
		title: "Produtos",
		url: "/products",
		icon: IconCookie,
	},
	{
		title: "Clientes",
		url: "/clients",
		icon: UserStar,
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
