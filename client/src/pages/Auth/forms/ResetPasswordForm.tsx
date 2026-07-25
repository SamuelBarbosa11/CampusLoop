import { useState } from "react";
import type { ChangeEvent } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { getAuthErrorMessage } from "../../../utils/auth.errors";

import type { AuthMode } from "../types";

import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";

import Text from "../../../components/Text";

interface ResetPasswordData {
	password: string;
	confirmPassword: string;
}

interface ResetPasswordFormProps {
	setMode: (mode: AuthMode) => void;
}

export default function ResetPasswordForm({ setMode }: ResetPasswordFormProps) {
	const { resetPassword, logout } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState<ResetPasswordData>({
		password: "",
		confirmPassword: "",
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

			if (formData.password !== formData.confirmPassword) {
				setError("As senhas devem ser iguais!");
				return;
			}

			await resetPassword({
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			});

			await logout();

			alert("Senha alterada com sucesso.");

			setMode("login");
		} catch (error) {
			setError(getAuthErrorMessage(error));
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				void handleSubmit();
			}}
		>
			<FormInput
				label="Nova senha"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				required
			/>

			<FormInput
				label="Confirmar senha"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				required
			/>

			{error && (
				<Text variant="muted" className="text-red-500 text-center">
					{error}
				</Text>
			)}

			<FormButton type="submit" loading={loading}>
				Salvar senha
			</FormButton>
		</form>
	);
}
