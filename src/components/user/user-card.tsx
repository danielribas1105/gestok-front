import Link from "next/link"
import Image from "next/image"
import { IconCircleFilled } from "@tabler/icons-react"
import { User } from "@/schemas/user"

export interface UserCardProps {
	user: User
}

export default function UserCard({ user }: UserCardProps) {
	return (
		<Link href={`/users/${user.id}`}>
			<article className="w-56 h-64 border-2 rounded-lg p-2 flex flex-col gap-2">
				<div className="relative w-full h-36 flex justify-center overflow-hidden">
					<Image src={user.image_url} alt="Avatar usuário" fill className="object-cover rounded-lg" />
				</div>
				<header>{user.name}</header>
				<section>Código: {user.id}</section>
				<footer className="flex items-center gap-1">
					<IconCircleFilled size={16} color={user.active ? "#00FF00" : "#FF0000"} />
					<span className="text-sm uppercase">{user.active}</span>
				</footer>
			</article>
		</Link>
	)
}
