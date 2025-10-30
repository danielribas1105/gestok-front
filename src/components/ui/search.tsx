import { IconPlus, IconSearch } from "@tabler/icons-react"
import { Button } from "./button"

interface SearchProps {
	className?: string
	placeholder: string
}

export default function Search({ className, placeholder }: SearchProps) {
	return (
		<div
			className={` ${className} flex justify-between items-center border border-zinc-400 rounded-4xl pl-4 py-1`}
		>
			<input className="flex-1" placeholder={placeholder} />
			<IconSearch className="text-zinc-400 mx-2" />
		</div>
	)
}
