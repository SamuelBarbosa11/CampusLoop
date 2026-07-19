import { useState } from "react";

import type { ChangeEvent } from "react";

import { useAuth } from "../../../auth";
import type { AuthMode } from "../types";

import { getAuthErrorMessage } from "../../../auth/auth.errors";
import { validateEmail } from "../../../utils/validators";
import { useIsDesktop } from "../../../utils/useIsDesktop";

import AuthButton from "../components/AuthButton";
import AuthInput from "../components/AuthInput";

import Text from "../../../components/Text";

interface LoginFormProps {
	setMode: (mode: AuthMode) => void;
}

interface LoginFormData {
	email: string;
	password: string;
}

export default function LoginForm({ setMode }: LoginFormProps) {
	const { login } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	});

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}));
	}

	async function handleSubmit() {
		try {
			setLoading(true);

			// Validação de Email

			const emailError = validateEmail(formData.email);

			if (emailError) {
				setError(emailError);
				return;
			}

			await login(formData);

			// depois vamos redirecionar
		} catch (error) {
			setError(getAuthErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}

	const isDesktop = useIsDesktop();

	return (
		<form
			className="grid gap-4"
			onSubmit={(event) => {
				event.preventDefault();

				void handleSubmit();
			}}
		>
			<AuthInput
				label="E-mail"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
			/>

			<AuthInput
				label="Senha"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				viewEye
				required
			/>

			<Text
				as="button"
				variant="heading"
				type="button"
				className="text-sm text-(--secondary) transition duration-300 hover:text-(--text-primary) justify-self-end"
				onClick={() => setMode("forgot")}
			>
				Esqueci minha senha
			</Text>

			{error && (
				<Text variant="muted" className="text-red-500 text-center">
					{error}
				</Text>
			)}

			<AuthButton
				type="submit"
				loading={loading}
				backgroundColor="var(--bg-button)"
			>
				Entrar
			</AuthButton>

			{isDesktop ? (
				<Text
					as="button"
					variant="heading"
					type="button"
					className="text-(--secondary) transition duration-300 hover:text-(--text-primary)"
					onClick={() => setMode("register")}
				>
					Primeira vez no CampusLoop?{" "}
					<Text variant="heading" className="hover:underline">
						Criar conta
					</Text>
				</Text>
			) : (
				<>
					<div className="flex justify-center items-center gap-2">
						<div className="h-px w-full bg-(--secondary)"></div>
						<Text variant="muted" className="text-(--secondary)">
							ou
						</Text>
						<div className="h-px w-full bg-(--secondary)"></div>
					</div>
					<AuthButton type="submit" loading={loading}>
						Criar conta
					</AuthButton>
				</>
			)}
		</form>
	);
}
