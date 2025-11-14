export async function createUser(data: any) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		const error = await res.json().catch(() => ({}))
		throw new Error(error.detail || "Erro ao criar usuário")
	}

	return res.json()
}

export async function createClient(data: any) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		const error = await res.json().catch(() => ({}))
		throw new Error(error.detail || "Erro ao criar cliente")
	}

	return res.json()
}

export async function createProduct(data: any) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})

	if (!res.ok) {
		const error = await res.json().catch(() => ({}))
		throw new Error(error.detail || "Erro ao criar produto")
	}

	return res.json()
}
