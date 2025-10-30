import { IconCode, IconHeart, IconMug } from "@tabler/icons-react"

export default function Footer() {
	return (
		<footer className="flex flex-col text-sm">
			<div className="flex items-center gap-1">
				<p>Desenvolvido com</p>
				<IconHeart size={20} color="#ff0000" />
				<p>e</p>
				<IconMug size={22} color="#b5842a" />
			</div>
			<div className="flex items-center gap-1">
				<p>por</p>
				<IconCode size={22} color="#5e17eb" />
				<p>DRCode</p>
			</div>
			<p className="text-sm mt-1">@2025 - Todos os direitos reservados</p>
		</footer>
	)
}
