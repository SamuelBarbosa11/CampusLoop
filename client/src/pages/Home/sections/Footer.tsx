import { useNavigate } from "react-router";

import { useAuth } from "../../../hooks/useAuth";

import Text from "../../../components/Text";
import ExitButtom from "../../../components/navegation/ExitButtom";

import { FaArrowRight } from "react-icons/fa6";

export default function Footer() {
	const navigate = useNavigate();
	const { isAuthenticated, profile } = useAuth();

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
					className="flex justify-center items-center text-(--secondary) gap-2 mt-16 cursor-default"
				>
					Sessão: {profile?.name ?? ""}
					<ExitButtom labelClassName="underline"/>
				</Text>
			)}
		</footer>
	);
}
