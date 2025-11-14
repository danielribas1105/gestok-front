import { Client } from "@/schemas/client"
import { IconCircleFilled } from "@tabler/icons-react"
import Link from "next/link"

export interface ClientCardProps {
   client: Client
}

export default function ClientCard({ client }: ClientCardProps) {
   return (
      <Link href={`/clients/${client.id}`}>
         <article className="w-56 h-64 border-2 rounded-lg p-2 flex flex-col gap-2">
            <section>Código: {client.cod_client}</section>
            <header>{client.client}</header>
            <footer className="flex items-center gap-1">
               <IconCircleFilled size={16} color={client.active ? "#00FF00" : "#FF0000"} />
               <span className="text-sm uppercase">{client.active}</span>
            </footer>
         </article>
      </Link>
   )
}
