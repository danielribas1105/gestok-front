"use client"
import CSVDataTable from "@/components/csv-data-table"
import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"
import { UploadFileModal } from "@/components/upload-file-modal"
import { useState } from "react"

export default function Home() {
	
   const [isModalOpen, setIsModalOpen] = useState(false)
	const [tableData, setTableData] = useState<{ data: any[]; columns: string[] }>({
		data: [],
		columns: [],
	})

   return (
		<PageLayout>
			<section>
				<div className="flex flex-col gap-3 md:gap-0">
					<TitlePage title="GestOk" textButton="Carregar Arquivo" onButtonClick={() => setIsModalOpen(true)} />
					<div className="flex flex-col items-start text-xl mb-4">
						<div className="flex gap-2">
							<span>
								Status:
							</span>
							{/* <span className={status.status === "online" ? "text-green-600" : "text-red-600"}>
								{status.status === "online" ? "online" : "offline"}
							</span> */}
						</div>
						<div className="text-sm text-gray-400">Última atualização: {/* {status.timestamp} */}</div>
					</div>
				</div>
				{/* {jobs && <DataTable columns={columns} data={jobs}/> } */}
				{/* DataTable */}
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