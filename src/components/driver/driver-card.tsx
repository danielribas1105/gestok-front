import userAvatar from "@/../public/img-user.png"
import { Driver } from "@/schemas/driver"
import { IconCircleFilled } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export interface DriverCardProps {
	driver: Driver
}

export default function DriverCard({ driver }: DriverCardProps) {
	return (
		<Link href={`/users/${driver.id}`}>
			<article className="w-56 h-64 border-2 rounded-lg p-2 flex flex-col gap-2">
				{/* <div className="relative w-full h-36 flex justify-center overflow-hidden">
					<Image 
						src={driver.image_url ?? userAvatar} 
						alt="Avatar usuário" 
						fill 
						className="object-contain rounded-lg" 
					/>
				</div> */}
				<header>Motorista: {driver.name}</header>
				<section>Placa: {driver.plate_number}</section>
				<footer className="flex items-center gap-1">
					<IconCircleFilled size={16} color={driver.active ? "#00FF00" : "#FF0000"} />
					<span className="text-sm uppercase">{driver.active}</span>
				</footer>
			</article>
		</Link>
	)
}
