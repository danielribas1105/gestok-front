"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DriverForm } from "./driver-form"

interface AddDriverModalProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
}

export function AddDriverModal({ open, onOpenChange }: AddDriverModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-6">
				<DialogHeader>
					<DialogTitle>Novo Motorista</DialogTitle>
				</DialogHeader>
				<DriverForm onSuccess={() => onOpenChange(false)} />
			</DialogContent>
		</Dialog>
	)
}
