import { useState, useEffect } from "react";

import { useAuth } from "../../../auth";
import { getAuthErrorMessage } from "../../../auth/auth.errors";

import type { AuthMode } from "../types";

import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

import Text from "../../../components/Text";

interface ForgotPasswordFormProps {
	setMode: (mode: AuthMode) => void;
}

export default function ForgotPasswordForm({
	setMode,
}: ForgotPasswordFormProps) {
	const { forgotPassword } = useAuth();

	const [loading, setLoading] = useState(false);

	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState("");

	const [cooldown, setCooldown] = useState(0);

	const [email, setEmail] = useState("");

	async function handleSubmit() {
		try {
			setLoading(true);

			await forgotPassword({ email });

			setCooldown(30);

			setEmailSent(true);
		} catch (error) {
			setError(getAuthErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (cooldown === 0) return;

		const timer = setInterval(() => {
			setCooldown((previous) => previous - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [cooldown]);

	return (
		<form
			className="grid gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				void handleSubmit();
			}}
		>
			{emailSent ? (
				<>
					<Text variant="muted" className="text-center text-(--mauve-40)">
						Enviamos um link para{" "}
						<Text variant="muted" className="font-semibold text-(--primary)">
							{email}
						</Text>
						.
						<br />
						Abra sua caixa de entrada e clique no link para criar uma nova
						senha. Se não encontrar o e-mail, verifique a pasta de spam.
					</Text>

					{error && (
						<Text variant="muted" className="text-center text-red-500">
							{error}
						</Text>
					)}

					<AuthButton
						type="button"
						loading={loading}
						onClick={() => void handleSubmit()}
						disabled={cooldown > 0}
					>
						{cooldown > 0 ? `Reenviar em ${cooldown}s` : "Reenviar e-mail"}
					</AuthButton>
				</>
			) : (
				<>
					<AuthInput
						label="E-mail"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
					/>

					{error && (
						<Text variant="muted" className="text-center text-red-500">
							{error}
						</Text>
					)}

					<AuthButton type="submit" loading={loading}>
						Enviar e-mail
					</AuthButton>
				</>
			)}

			<Text
				as="button"
				type="button"
				variant="muted"
				className="text-(--secondary) transition-colors duration-200 hover:text-(--primary)"
				onClick={() => setMode("login")}
			>
				Voltar
			</Text>
		</form>
	);
}
