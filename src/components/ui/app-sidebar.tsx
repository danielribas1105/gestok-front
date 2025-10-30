import { itemsMenu } from "@/data/constants/ItensMenu"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"
import { IconBuildingWarehouse } from "@tabler/icons-react"
import Footer from "./footer"


export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex flex-col items-center">
					<IconBuildingWarehouse size={50} color="#0030cc"/>
					<h3 className="font-logo font-bold text-3xl text-logo-blue-dark">GestOk</h3>
					<p className="text-sm text-center text-logo-blue-dark/60">
						Plataforma para gestão de estoque
					</p>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel></SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{itemsMenu.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon color="#51a41e" />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<h3>User</h3>
			</SidebarFooter>
			<SidebarFooter>
				<Footer />
			</SidebarFooter>
		</Sidebar>
	)
}
