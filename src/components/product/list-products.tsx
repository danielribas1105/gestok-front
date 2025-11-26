import { useProducts } from "@/hooks/product/use-products"
import ProductCard from "./product-card"

export default function ListProducts() {
	const { products, isLoading, isError, error } = useProducts()

	if (isLoading) {
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-muted-foreground">Carregando produtos...</p>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-destructive">
					{error instanceof Error ? error.message : "Erro ao carregar produtos"}
				</p>
			</div>
		)
	}

	if (!products?.length) {
		return (
			<div className="flex items-center justify-center p-8">
				<p className="text-muted-foreground">Nenhum produto encontrado</p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}
