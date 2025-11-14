"use client"
import { Product } from "@/schemas/product"
import { useQuery } from "@tanstack/react-query"
import ProductCard from "./product-card"


async function fetchProducts(): Promise<Product[]> {
	const res = await fetch("http://localhost:8000/products")
	if (!res.ok) throw new Error("Erro ao buscar produtos")

   const data = await res.json()

	return data.products
}

export default function ListProducts() {
	const {
		data: products,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	})
   console.log("products",products)
	if (isLoading) return <p>Carregando produtos...</p>
	if (error) return <p>Erro ao carregar produtos</p>

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
			{products && products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
		</div>
	)
}
