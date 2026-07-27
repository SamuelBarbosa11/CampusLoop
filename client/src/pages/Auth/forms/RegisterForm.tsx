import { useState, type ChangeEvent } from "react";

import FormInput from "../../../components/form/FormInput";
import FormButton from "../../../components/form/FormButton";
import Text from "../../../components/text/Text";

import { useAuth } from "../../../hooks/useAuth";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import useOnlineStatus from "../../../hooks/useOnlineStatus";

import { toast } from "../../../services/toast";

import { validateEmail } from "../../../utils/validators";

import type { AuthMode } from "../types";

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

	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const isOnline = useOnlineStatus();

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
			setSubmitted(true);

			// Validação de nome
			if (!formData.name) {
				setError("Informe um nome para cadastro");
			}

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

			if (!isOnline) {
				toast.error("Verifique sua conexão com a internet e tente novamente.");
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
				label="Nome"
				name="name"
				value={formData.name}
				onChange={handleChange}
				required
			/>

			<FormInput
				label="E-mail"
				type="email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				invalid={submitted && Boolean(validateEmail(formData.email))}
				required
			/>

			<FormInput
				label="Senha"
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				invalid={submitted && !formData.password}
				viewEye
				required
			/>

			<FormInput
				label="Confirmar senha"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				invalid={
					submitted &&
					(!formData.confirmPassword ||
						formData.password !== formData.confirmPassword)
				}
				viewEye
				required
			/>

			{error && (
				<Text variant="muted" className="text-red-500 text-center">
					{error}
				</Text>
			)}

			<FormButton type="submit" loading={loading} className="mt-2">
				Criar conta
			</FormButton>

			{isDesktop ? (
				<Text
					variant="heading"
					className="text-(--secondary) transition-colors duration-200 hover:text-(--primary) text-center cursor-default"
				>
					Já tem uma Conta?{" "}
					<Text
						as="button"
						type="button"
						variant="heading"
						className="hover:underline cursor-pointer"
						onClick={() => setMode("login")}
					>
						Entrar
					</Text>
				</Text>
			) : (
				<>
					<div className="flex justify-center items-center gap-2">
						<div className="h-px w-full bg-(--secondary)"></div>
						<Text variant="muted" className="text-(--secondary) shrink-0">
							Já tem uma Conta?
						</Text>
						<div className="h-px w-full bg-(--secondary)"></div>
					</div>

					<FormButton
						type="button"
						backgroundColor="var(--shark)"
						color="white"
						onClick={() => setMode("login")}
					>
						Entrar
					</FormButton>
				</>
			)}
		</form>
	);
}
