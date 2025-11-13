import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
/* import ListCars from "@/components/car/list-cars" */

export default function ClientssPage() {
   return (
      <PageLayout>
         <section className="flex flex-col gap-7">
            <TitlePage
               title="Clientes"
               placeholder="Procure pelo nome"
               textButton="Adicionar Cliente"
            />
            <div className="flex justify-center">
               {/* <ListCars /> */}
            </div>
         </section>
      </PageLayout>
   )
}
