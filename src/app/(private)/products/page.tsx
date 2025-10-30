import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
/* import ListCars from "@/components/car/list-cars" */

export default function ProductsPage() {
	return (
		<PageLayout>
			<section className="flex flex-col gap-7">
				<TitlePage
					title="Produtos"
					placeholder="Procure pelo nome"
					textButton="Adicionar Produto"
				/>
				<div className="flex justify-center">
					{/* <ListCars /> */}
				</div>
			</section>
		</PageLayout>
	)
}
