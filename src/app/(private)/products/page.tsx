"use client"
import { AddProductModal } from "@/components/product/app-product-modal"
import ListProducts from "@/components/product/list-products"
import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
import { useState } from "react"

export default function ProductsPage() {
	const [open, setOpen] = useState(false)
	
	return (
		<PageLayout>
			<section className="flex flex-col gap-7">
				<TitlePage
					title="Produtos"
					placeholder="Procure pelo nome"
					textButton="Adicionar Produto"
					onButtonClick={() => setOpen(true)}
				/>
				{/* Modal de adicionar produto */}
				<div className="flex justify-end">
					<AddProductModal open={open} onOpenChange={setOpen} />
				</div>
				<div className="flex justify-center">
					<ListProducts/>
				</div>
			</section>
		</PageLayout>
	)
}
