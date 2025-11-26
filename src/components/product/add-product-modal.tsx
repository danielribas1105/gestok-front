"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductForm } from "./product-form"

interface AddProductModalProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
}

export function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-6">
				<DialogHeader>
					<DialogTitle>Novo Produto</DialogTitle>
				</DialogHeader>
				<ProductForm onSuccess={() => onOpenChange(false)} />
			</DialogContent>
		</Dialog>
	)
}
