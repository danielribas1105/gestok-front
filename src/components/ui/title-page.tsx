"use client"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "./button"
import Search from "./search"

interface TitlePageProps {
	title: string
	className?: string
	placeholder?: string
	textButton?: string
	onButtonClick?: () => void
}

export default function TitlePage({ title, className, placeholder, textButton, onButtonClick }: TitlePageProps) {
	
	return (
		<div
			className={`${className ?? ""} flex flex-col md:flex-row justify-between items-center gap-3 md:gap-20`}
		>
			<div className="flex flex-col justify-between">
				<h1 className="text-3xl text-logo-blue-dark font-logo font-bold">{title}</h1>
			</div>
			{placeholder && <Search className="flex-1" placeholder={placeholder} />}
			{textButton && (
				<Button className="flex gap-2" onClick={onButtonClick}>
					<IconPlus />
					<span>{textButton}</span>
				</Button>
			)}
		</div>
	)
}
