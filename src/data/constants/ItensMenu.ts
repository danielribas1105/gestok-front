import { IconBlocks, IconCookie } from "@tabler/icons-react"
import { Car, FileText, Table, UserCircle2, UserStar } from "lucide-react"

// Menu web application
export const itemsMenu = [
	{
		title: "Pedidos",
		url: "/orders",
		icon: Table,
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
		title: "Motoristas",
		url: "/drivers",
		icon: Car,
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
