import PageLayout from "@/components/ui/page-layout"
import TitlePage from "@/components/ui/title-page"

export default function Home() {
   
   return (
		<PageLayout>
			<section>
				<div className="flex flex-col gap-3 md:gap-0">
					<TitlePage title="GestOk" textButton="Carregar Arquivo" />
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
			</section>
		</PageLayout>
	)
}