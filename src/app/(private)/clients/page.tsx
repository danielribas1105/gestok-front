"use client"
import { AddClientModal } from "@/components/client/add-client-modal"
import ListClients from "@/components/client/list-clients"
import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
import { useState } from "react"
/* import ListCars from "@/components/car/list-cars" */

export default function ClientsPage() {
   const [open, setOpen] = useState(false)
   
   return (
      <PageLayout>
         <section className="flex flex-col gap-7">
            <TitlePage
               title="Clientes"
               placeholder="Procure pelo nome"
               textButton="Adicionar Cliente"
               onButtonClick={() => setOpen(true)}
            />
            {/* Modal de adicionar cliente */}
            <div className="flex justify-end">
               <AddClientModal open={open} onOpenChange={setOpen} />
            </div>
            <div className="flex justify-center">
               <ListClients/>
            </div>
         </section>
      </PageLayout>
   )
}
