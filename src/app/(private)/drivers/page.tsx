"use client"
import { AddDriverModal } from "@/components/driver/add-driver-modal"
import ListDrivers from "@/components/driver/list-drivers"
import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
import { useState } from "react"

export default function DriversPage() {
   const [open, setOpen] = useState(false)
   
   return (
      <PageLayout>
         <section className="flex flex-col gap-7">
            {/* Título e campo de busca */}
            <TitlePage
               title="Motoristas"
               placeholder="Procure pelo nome"
               textButton="Adicionar Motorista"
               onButtonClick={() => setOpen(true)}
            />

            {/* Modal de adicionar motorista */}
            <div className="flex justify-end">
               <AddDriverModal open={open} onOpenChange={setOpen} />
            </div>

            {/* Tabela de motoristas (futuro) */}
            <div className="flex justify-center">
               <ListDrivers />
            </div>
         </section>
      </PageLayout>
   )
}
