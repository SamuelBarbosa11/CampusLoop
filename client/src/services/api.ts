import validateToken from "./validateToken";

import { showError } from "./toast.service";

const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> {
	const token = await validateToken();

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,

		headers: {
			...(options?.body instanceof FormData
				? {}
				: {
						"Content-Type": "application/json",
					}),

			...(token && {
				Authorization: `Bearer ${token}`,
			}),

			...options?.headers,
		},
	});

	if (!response.ok) {
		const error = await response.json();

		if (response.status >= 500) {
			showError("Falha temporária. Verifique sua conexão e tente novamente.");
		}

		throw new Error(error.error);
	}

	if (response.status === 204) {
		return undefined as T;
	}

	return response.json();
}
