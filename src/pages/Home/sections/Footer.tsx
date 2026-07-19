import { useNavigate } from "react-router";

import { useAuth } from "../../../auth";
import { logout } from "../../../auth/auth.service";

import Text from "../../../components/Text";
import Spinner from "../../../components/Spinner";

import { FaArrowRight } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useState } from "react";

export default function Footer() {
	const navigate = useNavigate();
	const { isAuthenticated, profile } = useAuth();

	const [loading, setLoading] = useState(false);

	async function handleLogout() {
		try {
			setLoading(true);
			await logout();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<footer className="flex flex-col justify-center items-center gap-6">
			<Text variant="subtitle">Pronto para desapegar?</Text>
			<Text variant="description" className="text-(--secondary) text-center">
				Junte-se a mais de 850 estudantes que já circulam materiais no campus.
			</Text>

			<Text
				as="button"
				variant="button"
				className="button rounded-2xl px-8 py-4 gap-2 transition duration-200 hover:scale-102"
				onClick={() => navigate("/announce")}
			>
				Começar agora <FaArrowRight />
			</Text>

			{isAuthenticated && (
				<Text
					variant="label"
					className="flex justify-center items-center text-(--secondary) gap-2 cursor-default"
				>
					Sessão: {profile?.name ?? ""}
					<Text
						as="button"
						variant="label"
						className="flex justify-center items-center trasition duration-200 hover:text-(--primary) gap-2"
						onClick={() => handleLogout()}
					>
						{loading ? (
							<Spinner size=".75rem"/>
						) : (
							<>
								<MdLogout />
								<Text variant="label" className="underline">
									sair
								</Text>
							</>
						)}
					</Text>
				</Text>
			)}
		</footer>
	);
}
