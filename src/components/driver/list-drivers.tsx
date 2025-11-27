import { useDrivers } from "@/hooks/driver/use-drivers"
import DriverCard from "./driver-card"

export default function ListDrivers() {
   const { drivers, isLoading, isError, error } = useDrivers()

   if (isLoading) {
      return (
         <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Carregando motoristas...</p>
         </div>
      )
   }

   if (isError) {
      return (
         <div className="flex items-center justify-center p-8">
            <p className="text-destructive">
               {error instanceof Error ? error.message : "Erro ao carregar motoristas"}
            </p>
         </div>
      )
   }

   if (!drivers?.length) {
      return (
         <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Nenhum motorista encontrado</p>
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
         {drivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
         ))}
      </div>
   )
}
