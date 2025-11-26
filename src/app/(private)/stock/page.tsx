"use client"
import { useState } from "react"
import { AddStockModal } from "@/components/stock/add-stock-modal"
import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
import { useStock } from "@/hooks/stock/use-stock"

export default function StockPage() {
   const [isModalOpen, setIsModalOpen] = useState(false)
   const { stock } = useStock()
   
   console.log("stock",stock)
   
	return (
		<PageLayout>
         <section className="flex flex-col gap-7">
            <TitlePage
               title="Estoque"
               textButton="Atualizar Estoque"
               onButtonClick={() => setIsModalOpen(true)}
            />
            {/* Modal de adicionar estoque */}
            <div className="flex justify-end">
               <AddStockModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            </div>
            <div className="flex justify-center">
               {/* <ListProducts/> */}
            </div>
         </section>
		</PageLayout>
	)
}
