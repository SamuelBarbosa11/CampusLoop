import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

import Text from "../../../components/text/Text";
import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";

import { useAuth } from "../../../hooks/useAuth";
import useOnlineStatus from "../../../hooks/useOnlineStatus";

import { toast } from "../../../services/toast";

import { getAuthErrorMessage } from "../../../utils/auth.errors";

import type { AuthMode } from "../types";

interface ResetPasswordData {
	password: string;
	confirmPassword: string;
}

interface ResetPasswordFormProps {
	setMode: (mode: AuthMode) => void;
}

export default function ResetPasswordForm({ setMode }: ResetPasswordFormProps) {
	const navigate = useNavigate();

	const { resetPassword, logout, finishPasswordRecovery } = useAuth();

	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const isOnline = useOnlineStatus();

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
			setSubmitted(true);

			if (formData.password !== formData.confirmPassword) {
				setError("As senhas devem ser iguais!");
				return;
			}

			if (!isOnline) {
				toast.error("Verifique sua conexão com a internet e tente novamente.");
				return;
			}

			await resetPassword({
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			});

			finishPasswordRecovery();

			await logout();

			toast.success("Senha alterada com sucesso.");

			setMode("login");

			navigate("/auth?mode=login", {
				replace: true,
			});
		} catch (error) {
			setError(getAuthErrorMessage(error));
			console.log(error);
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
				viewEye
				invalid={submitted && !formData.password}
				required
			/>

			<FormInput
				label="Confirmar senha"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				viewEye
				invalid={
					submitted &&
					(!formData.confirmPassword ||
						formData.password !== formData.confirmPassword)
				}
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
