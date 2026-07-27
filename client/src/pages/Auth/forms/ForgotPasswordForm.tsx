import { useState, useEffect } from "react";

import Text from "../../../components/text/Text";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";

import { useAuth } from "../../../hooks/useAuth";
import useOnlineStatus from "../../../hooks/useOnlineStatus";

import { toast } from "../../../services/toast";

import { getAuthErrorMessage } from "../../../utils/auth.errors";

import type { AuthMode } from "../types";
import { validateEmail } from "../../../utils/validators";

interface ForgotPasswordFormProps {
	setMode: (mode: AuthMode) => void;
}

export default function ForgotPasswordForm({
	setMode,
}: ForgotPasswordFormProps) {
	const { forgotPassword } = useAuth();

	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [email, setEmail] = useState("");
	const [emailSent, setEmailSent] = useState(false);

	const [cooldown, setCooldown] = useState(0);

	const isOnline = useOnlineStatus();

	async function handleSubmit() {
		try {
			setLoading(true);
			setSubmitted(true);

			// Validação de Email
			const emailError = validateEmail(email);

			if (emailError) {
				setError(emailError);
				return;
			}

			if (!isOnline) {
				toast.error("Verifique sua conexão com a internet e tente novamente.");
				return;
			}

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

					<FormButton
						type="button"
						loading={loading}
						onClick={() => void handleSubmit()}
						disabled={cooldown > 0}
					>
						{cooldown > 0 ? `Reenviar em ${cooldown}s` : "Reenviar e-mail"}
					</FormButton>
				</>
			) : (
				<>
					<FormInput
						label="E-mail"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						invalid={submitted && Boolean(validateEmail(email))}
						required
					/>

					{error && (
						<Text variant="muted" className="text-center text-red-500">
							{error}
						</Text>
					)}

					<FormButton type="submit" loading={loading}>
						Enviar e-mail
					</FormButton>
				</>
			)}

			<Text
				as="button"
				type="button"
				variant="muted"
				className="text-(--secondary) transition-colors duration-200 hover:text-(--primary) hover:underline"
				onClick={() => setMode("login")}
			>
				Voltar
			</Text>
		</form>
	);
}
