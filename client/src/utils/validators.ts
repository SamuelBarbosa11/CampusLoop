export function validateEmail(email: string): string | null {
	email = email.trim();

	if (email.length === 0) {
		return "Informe seu e-mail.";
	}

	if (!email.includes("@")) {
		return "O e-mail deve conter @";
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
		return "Informe um e-mail válido.";
	}

	return null;
}