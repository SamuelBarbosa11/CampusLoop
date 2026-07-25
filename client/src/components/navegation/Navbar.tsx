import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

import Text from "../Text";
import Logo from "../Smalls/Logo";
import Hello from "../Smalls/Hello";

import { scrollToSection } from "../../utils/scrollToSection";

export default function NavBar() {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const esperar = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	return (
		<nav className="fixed top-0 z-10 flex justify-between items-center w-full py-4 px-6 bg-(--navbar) backdrop-blur-md">
			<Logo />

			<ul className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
				<li>
					<Text
						as="button"
						variant="heading"
						className="cursor-pointer text-(--secondary) hover:text-(--mauve) transition duration-300 ease-in-out"
						onClick={async () => {
							navigate("/");
							await esperar(500);
							scrollToSection("news");
						}}
					>
						Vitrine
					</Text>
				</li>

				<li>
					<Text
						as="button"
						variant="heading"
						className="cursor-pointer text-(--secondary) hover:text-(--mauve) transition duration-300 ease-in-out"
						onClick={async () => {
							navigate("/");
							await esperar(500);
							scrollToSection("impact");
						}}
					>
						Impacto
					</Text>
				</li>

				<li>
					<Text
						as="button"
						variant="heading"
						className="cursor-pointer text-(--secondary) hover:text-(--mauve) transition duration-300 ease-in-out"
						onClick={async () => {
							navigate("/");
							await esperar(500);
							scrollToSection("pwa");
						}}
					>
						Instalar
					</Text>
				</li>
			</ul>

			<div className="flex gap-3">
				{isAuthenticated ? (
					<Hello />
				) : (
					<button
						id="sign-in"
						onClick={() => navigate("/auth")}
						className="cursor-pointer text-(--secondary) transition duration-300 ease-in-out hover:text-(--primary)"
					>
						Entrar
					</button>
				)}

				<button
					onClick={() => navigate("/dashboard")}
					className="button rounded-full transition duration-300 ease-in-out hover:scale-105 px-4 py-2"
				>
					Anúncios
				</button>
			</div>
		</nav>
	);
}
