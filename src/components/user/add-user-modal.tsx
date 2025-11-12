"use client"
import { UserForm } from "@/components/forms/user-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddUserModalProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
}

export function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-6">
				<DialogHeader>
					<DialogTitle>Novo Usuário</DialogTitle>
				</DialogHeader>
				<UserForm onSuccess={() => onOpenChange(false)} />
			</DialogContent>
		</Dialog>
	)
}
