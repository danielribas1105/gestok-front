"use client"
import { apiRoutes } from "@/config/routes"
import { useLogin } from "@/hooks/auth/use-login"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconAlertSquareRounded } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"


const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

export const LoginForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"form">) => {
	const { error, mutate, isPending } = useLogin()
	//const error = false
	//const isPending = false

	//const router = useRouter()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
		console.log("data", data)
		console.log("apiRoutes", apiRoutes.auth.login)
		//router.push(`${apiRoutes.auth.login}`)
		mutate({
			body: { username: data.email, password: data.password },
		})
	}

	return (
		<Form {...form}>
			<form
				className={cn("flex flex-col gap-4", className)}
				onSubmit={form.handleSubmit(onSubmit)}
				autoComplete="on"
				{...props}
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<p className="text-balance text-md text-logo-blue-dark">
						Digite seu e-mail para acessar sua conta
					</p>
					{error /* && error.message */ && (
						<Alert variant="destructive" className="flex items-center text-start">
							<IconAlertSquareRounded className="h-4 w-4" />
							<AlertTitle className="mt-1">Error login</AlertTitle>
							<AlertDescription>{error.message}</AlertDescription>
						</Alert>
					)}
				</div>
				<div className="grid gap-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-logo-blue-dark">Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="email@exemplo.com"
										autoComplete="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-logo-blue-dark">Password</FormLabel>
								<FormControl>
									<Input type="password" autoComplete="current-password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full bg-logo-blue-dark bg-blue-700 hover:bg-blue-900"
						disabled={isPending}
					>
						{/* {isPending && <Spinner />} */}
						Login
					</Button>
				</div>
			</form>
		</Form>
	)
}
