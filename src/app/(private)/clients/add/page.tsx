import { ClientForm } from "@/components/client/client-form"

export default function NewClientPage() {
   return (
      <div className="p-6">
         <h1 className="text-2xl font-semibold mb-6">Novo Cliente</h1>
         <ClientForm/>
      </div>
   )
}
