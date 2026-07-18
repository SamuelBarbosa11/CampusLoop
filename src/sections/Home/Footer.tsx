import { useNavigate } from "react-router";

import Text from "../../components/Text";

import { FaArrowRight } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

export default function Footer() {
	const navigate = useNavigate();
	const isLoged = false;

	const logout = () => {
		console.log("logout");
	};

	return (
		<footer className="flex flex-col justify-center items-center gap-6">
			<Text variant="subtitle">Pronto para desapegar?</Text>
			<Text variant="description" className="text-(--manatee) text-center">
				Junte-se a mais de 850 estudantes que já circulam materiais no campus.
			</Text>

			<Text
				as="button"
				variant="button"
				className="button rounded-2xl px-8 py-4 gap-2"
				onClick={() => navigate("/announce")}
			>
				Começar agora <FaArrowRight />
			</Text>

			{isLoged && (
				<Text
					variant="label"
					className="flex justify-center items-center text-(--manatee) gap-2 cursor-default"
				>
					Sessão: toty
					<Text
						as="button"
						variant="label"
						className="flex justify-center items-center trasition duration-200 hover:text-(--primary) gap-2"
						onClick={() => logout()}
					>
						<MdLogout />
						<Text variant="label" className="underline">
							sair
						</Text>
					</Text>
				</Text>
			)}
		</footer>
	);
}
