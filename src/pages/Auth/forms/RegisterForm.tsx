import { useState } from "react";
import type { ChangeEvent } from "react";

import { useAuth } from "../../../auth";

import type { AuthMode } from "../types";

import { validateEmail } from "../../../utils/validators";

import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import Text from "../../../components/Text";

interface RegisterFormProps {
	setMode: (mode: AuthMode) => void;
}

interface RegisterFormData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function RegisterForm({ setMode }: RegisterFormProps) {
	const { register } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [formData, setFormData] = useState<RegisterFormData>({
		name: "",
		email: "",
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

			// Validação de Email

			const emailError = validateEmail(formData.email);

			if (emailError) {
				setError(emailError);
				return;
			}

			// Validação de Senhas

			if (formData.password !== formData.confirmPassword) {
				setError("As senhas devem ser iguais!");
				return;
			}

			await register(formData);

			alert("Conta criada! Verifique seu e-mail para confirmar o cadastro.");

			setMode("login");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			className="grid gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				void handleSubmit();
			}}
		>
			<AuthInput
				label="Nome"
				name="name"
				value={formData.name}
				onChange={handleChange}
				required
			/>

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

			<AuthInput
				label="Confirmar senha"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				viewEye
				required
			/>

			{error && (
				<Text variant="muted" className="text-red-500 text-center">
					{error}
				</Text>
			)}

			<AuthButton type="submit" loading={loading} className="mt-2">
				Criar conta
			</AuthButton>

			<Text
				as="button"
				type="button"
				variant="muted"
				className="text-(--secondary) transition-colors duration-200 hover:text-(--primary)"
				onClick={() => setMode("login")}
			>
				Já tem uma Conta?{" "}
				<Text variant="muted" className="hover:underline">
					Entrar
				</Text>
			</Text>
		</form>
	);
}
