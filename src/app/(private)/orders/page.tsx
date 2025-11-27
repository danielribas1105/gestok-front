"use client"
import CSVDataTable from "@/components/csv-data-table"
import { OrdersPivotTable } from "@/components/order/orders-pivot-table"
import { OrdersTable } from "@/components/order/orders-table"
import PageLayout from "@/components/ui/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TitlePage from "@/components/ui/title-page"
import { UploadFileModal } from "@/components/upload-file-modal"
import { CheckCircle, Circle, Loader2, XCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function OrdersPage() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [status, setStatus] = useState<{
		status: "checking" | "online" | "offline"
		timestamp: string
	}>({
		status: "checking",
		timestamp: "",
	})

	const [tableData, setTableData] = useState<{ data: any[]; columns: string[] }>({
		data: [],
		columns: [],
	})

	useEffect(() => {
		async function fetchStatus() {
			try {
				setStatus((prev) => ({ ...prev, status: "checking" }))
				const res = await fetch("http://localhost:8000/status")
				const data = await res.json()
				setStatus({
					status: data.status === "online" ? "online" : "offline",
					timestamp: data.timestamp || new Date().toISOString(),
				})
			} catch {
				setStatus({
					status: "offline",
					timestamp: new Date().toISOString(),
				})
			}
		}

		fetchStatus()
		const interval = setInterval(fetchStatus, 60000)
		return () => clearInterval(interval)
	}, [])

	const renderStatusIcon = () => {
		switch (status.status) {
			case "checking":
				return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
			case "online":
				return <CheckCircle className="h-5 w-5 text-green-500" />
			case "offline":
				return <XCircle className="h-5 w-5 text-red-500" />
			default:
				return <Circle className="h-5 w-5 text-gray-400" />
		}
	}

	return (
		<PageLayout>
			<section>
				<div className="flex flex-col gap-3 md:gap-0">
					<TitlePage
						title="Relação de Pedidos"
						textButton="Carregar Arquivo"
						onButtonClick={() => setIsModalOpen(true)}
					/>
					<div className="flex flex-col items-start text-xl mb-4">
						<div className="flex items-center gap-2">
							<span>Status:</span>
							{renderStatusIcon()}
							<span
								className={
									status.status === "online"
										? "text-green-500"
										: status.status === "checking"
											? "text-yellow-500"
											: "text-red-500"
								}
							>
								{status.status === "checking" ? "verificando..." : status.status}
							</span>
						</div>
						<div className="text-sm text-gray-400">
							Última atualização:{" "}
							{status.timestamp ? new Date(status.timestamp).toLocaleTimeString() : "-"}
						</div>
					</div>
				</div>

				{/* Tabs para alternar entre visões */}
				<Tabs defaultValue="pivot" className="w-full">
					<TabsList className="grid w-full max-w-md grid-cols-2">
						<TabsTrigger value="pivot">Visão por Pedido</TabsTrigger>
						<TabsTrigger value="items">Visão por Produto</TabsTrigger>
					</TabsList>

					<TabsContent value="pivot" className="mt-6">
						<OrdersPivotTable />
					</TabsContent>

					<TabsContent value="items" className="mt-6">
						<OrdersTable />
					</TabsContent>
				</Tabs>

				{tableData.data.length > 0 && (
					<div className="mt-6">
						<CSVDataTable data={tableData.data} columns={tableData.columns} />
					</div>
				)}

				{/* Modal de Upload */}
				<UploadFileModal
					open={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onDataLoaded={(parsedData, headers) => {
						setTableData({ data: parsedData, columns: headers })
						setIsModalOpen(false)
					}}
				/>
			</section>
		</PageLayout>
	)
}
