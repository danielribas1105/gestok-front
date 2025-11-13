//import { LoginForm } from "@/components/login/login-form"
import { LoginForm } from "@/components/login/login-form"
import { IconBuildingWarehouse } from "@tabler/icons-react"
import Image from "next/image"
import stockImg from "@/../public/images/gestao-estoque.jpg"

export default function LoginPage() {

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-6 py-4">
				<div className="flex flex-col gap-2 items-center">
					<IconBuildingWarehouse size={20} color="#0030cc"/>
					<h1 className="text-3xl text-logo-blue-dark font-logo font-bold">GestOk</h1>
				</div>
				<div className="flex flex-1 justify-center">
					<LoginForm />
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src={stockImg}
					alt="Imagem de um galpão para estoque"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					width={1024}
					height={1024}
				/>
			</div>
		</div>
	)
}
