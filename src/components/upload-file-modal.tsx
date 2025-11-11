"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Papa from "papaparse"
import * as XLSX from "xlsx"
import { useState } from "react"
import { Upload } from "lucide-react"

interface UploadFileModalProps {
	open: boolean
	onClose: () => void
	onDataLoaded: (data: any[], headers: string[]) => void
}

export function UploadFileModal({ open, onClose, onDataLoaded }: UploadFileModalProps) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		setError("")
		setLoading(true)

		const extension = file.name.split(".").pop()?.toLowerCase()

		if (extension === "csv") {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
            transformHeader: (header) =>
               header
                  .trim()                // remove espaços extras no início/fim
                  .replace(/\uFEFF/g, "") // remove BOM invisível
                  .replace(/\./g, "")     // remove pontos (ex: "COD. CLIENTE" → "COD CLIENTE")
                  .toUpperCase(),         // padroniza em maiúsculas
				complete: (results) => {
               console.log("Colunas:", results.meta.fields)
               console.log("Primeira linha:", results.data[0])
					if (results.data.length > 0) {
						onDataLoaded(results.data, results.meta.fields || [])
						onClose()
					} else setError("O arquivo CSV está vazio.")
					setLoading(false)
				},
				error: (err) => {
					setError(`Erro ao processar CSV: ${err.message}`)
					setLoading(false)
				},
			})
		} else if (["xlsx", "xls"].includes(extension!)) {
			const reader = new FileReader()
			reader.onload = (e) => {
				try {
					const data = new Uint8Array(e.target!.result as ArrayBuffer)
					const workbook = XLSX.read(data, { type: "array" })
					const sheet = workbook.Sheets[workbook.SheetNames[0]]
					const json = XLSX.utils.sheet_to_json(sheet, { raw: false, defval: null })
					const headers = Object.keys(json[0] || {})
					onDataLoaded(json, headers)
					onClose()
				} catch (err: any) {
					setError(`Erro ao processar Excel: ${err.message}`)
				} finally {
					setLoading(false)
				}
			}
			reader.readAsArrayBuffer(file)
		} else {
			setError("Formato inválido. Envie um arquivo .csv, .xlsx ou .xls.")
			setLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Carregar Arquivo</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col items-center justify-center py-6">
					<label className="cursor-pointer flex flex-col items-center gap-3 border-2 border-dashed border-gray-400 rounded-xl p-6 hover:border-blue-500 transition">
						<div className="bg-blue-100 rounded-full p-4">
							<Upload className="text-blue-600 w-8 h-8" />
						</div>
						<span className="text-sm text-gray-700">
							{loading ? "Processando arquivo..." : "Clique para selecionar um arquivo"}
						</span>
						<input
							type="file"
							accept=".csv,.xlsx,.xls"
							onChange={handleFileUpload}
							className="hidden"
							disabled={loading}
						/>
					</label>

					{error && <p className="text-red-600 text-sm mt-4">{error}</p>}
				</div>
			</DialogContent>
		</Dialog>
	)
}
