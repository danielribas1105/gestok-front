"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ClientForm } from "./client-form"

interface AddClientModalProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
}

export function AddClientModal({ open, onOpenChange }: AddClientModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-6">
				<DialogHeader>
					<DialogTitle>Novo Cliente</DialogTitle>
				</DialogHeader>
				<ClientForm onSuccess={() => onOpenChange(false)} />
			</DialogContent>
		</Dialog>
	)
}
