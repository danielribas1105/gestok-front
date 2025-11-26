"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddStockModalProps {
	open?: boolean
	onOpenChange: (open: boolean) => void
}

export function AddStockModal({ open, onOpenChange }: AddStockModalProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg p-6">
				<DialogHeader>
					<DialogTitle>Novo Estoque</DialogTitle>
				</DialogHeader>
				{/* <ProductForm onSuccess={() => onOpenChange(false)} /> */}
			</DialogContent>
		</Dialog>
	)
}
