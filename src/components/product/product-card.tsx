import { Product } from "@/schemas/product"
import { IconCircleFilled } from "@tabler/icons-react"
import Link from "next/link"

export interface ProductCardProps {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<Link href={`/products/${product.id}`}>
			<article className="w-56 h-64 border-2 rounded-lg p-2 flex flex-col gap-2">
				<section>Código: {product.cod_product}</section>
				<header>{product.description}</header>
				<footer className="flex items-center gap-1">
					<IconCircleFilled size={16} color={product.active ? "#00FF00" : "#FF0000"} />
					<span className="text-sm uppercase">{product.active}</span>
				</footer>
			</article>
		</Link>
	)
}
