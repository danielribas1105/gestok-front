
export async function create(data: any, path: string) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		const error = await res.json().catch(() => ({}))
		throw new Error(error.detail || "Erro ao criar objeto")
	}

	return res.json()
}
