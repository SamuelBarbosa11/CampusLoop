import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";

import ButtonBackTo from "../../components/navegation/ButtonBackTo";
import AuthCard from "./AuthCard";

import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import ResetPasswordForm from "./forms/ResetPasswordForm";

import { useAuthMode } from "./hooks/useAuthMode";

export default function Auth() {
	const { mode, setMode } = useAuthMode();

	const navigate = useNavigate();

	const { isAuthenticated, isRecoveringPassword, loading } = useAuth();

	useEffect(() => {
		if (loading) return;

		if (isAuthenticated && !isRecoveringPassword) {
			navigate("/", {
				replace: true,
			});
		}
	}, [isAuthenticated, isRecoveringPassword, loading, navigate]);

	const forms = {
		login: <LoginForm setMode={setMode} />,

		register: <RegisterForm setMode={setMode} />,

		forgot: <ForgotPasswordForm setMode={setMode} />,

		reset: <ResetPasswordForm setMode={setMode} />,
	};

	const legends = {
		login: {
			title: "Bem-vindo ao Loopus",
			subtitle: "Entre com seu nome do campus para continuar.",
		},

		register: {
			title: "Primeira vez no CampusLoop?",
			subtitle: "Crie uma conta e anuncie o que quer desapegar.",
		},

		forgot: {
			title: "Esqueceu sua senha?",
			subtitle: "Sem problema, da pra recuperar.",
		},

		reset: {
			title: "Resete sua senha aqui",
			subtitle: "Lembre-se de guardar a nova senha.",
		},
	};

	return (
		<section className="absolute inset-0 bg-(--woodsmoke-tertiary) flex min-h-screen justify-center items-center">
			<ButtonBackTo tag="/" className="absolute top-4 left-4" />

			<AuthCard title={legends[mode].title} subtitle={legends[mode].subtitle}>
				{forms[mode]}
			</AuthCard>
		</section>
	);
}
