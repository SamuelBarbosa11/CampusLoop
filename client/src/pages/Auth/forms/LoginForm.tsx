import { useState } from "react";

import type { ChangeEvent } from "react";

import { useAuth } from "../../../hooks/useAuth";
import type { AuthMode } from "../types";

import { getAuthErrorMessage } from "../../../utils/auth.errors";
import { validateEmail } from "../../../utils/validators";
import { useIsDesktop } from "../../../hooks/useIsDesktop";

import FormButton from "../../../components/form/FormButton";
import FormInput from "../../../components/form/FormInput";

import Text from "../../../components/text/Text";

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
			<FormInput
				label="E-mail"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
			/>

			<FormInput
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

			<FormButton
				type="submit"
				loading={loading}
				backgroundColor="var(--bg-button)"
			>
				Entrar
			</FormButton>

			{isDesktop ? (
				<Text
					variant="heading"
					className="text-(--secondary) transition duration-300 hover:text-(--text-primary) text-center cursor-default"
				>
					Primeira vez no CampusLoop?{" "}
					<Text
						as="button"
						type="button"
						variant="heading"
						className="hover:underline cursor-pointer"
						onClick={() => setMode("register")}
					>
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
					<FormButton type="button" onClick={() => setMode("register")}>
						Criar conta
					</FormButton>
				</>
			)}
		</form>
	);
}
