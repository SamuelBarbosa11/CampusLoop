export function getAuthErrorMessage(error: unknown): string {
	if (!(error instanceof Error)) return "Erro inesperado.";

	switch (error.message) {
		case "Email not confirmed":
			return "Confirme seu e-mail antes de entrar.";

		case "Invalid login credentials":
			return "E-mail ou senha incorretos.";

		case "User already registered":
			return "Já existe uma conta com este e-mail.";

		case "email rate limit exceeded":
			return "Você solicitou muitos e-mails em pouco tempo. Aguarde alguns minutos antes de tentar novamente.";

		default:
			return "Ocorreu um erro.";
	}
}
