import { useNavigate } from "react-router";

import Text from "./Text";
import Logo from "./Logo";
import Hello from "./Hello";

import { scrollToSection } from "../utils/scrollToSection";

export default function Navbar() {
	const navigate = useNavigate();

	const isLoged = true;

	return (
		<nav className="fixed top-0 z-10 flex justify-between items-center w-full py-4 px-6 bg-(--navbar) backdrop-blur-md">
			<Logo />

			<ul className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
				<li>
					<Text
						as="button"
						variant="heading"
						className="cursor-pointer text-(--secondary) hover:text-(--mauve) transition duration-300 ease-in-out"
						onClick={() => scrollToSection("news")}
					>
						Vitrine
					</Text>
				</li>
				<li>
					<Text
						as="button"
						variant="heading"
						className="cursor-pointer text-(--secondary) hover:text-(--mauve) transition duration-300 ease-in-out"
						onClick={() => scrollToSection("impact")}
					>
						Impacto
					</Text>
				</li>
				<li>
					<Text
						as="button"
						variant="heading"
						className="cursor-pointer text-(--secondary) hover:text-(--mauve) transition duration-300 ease-in-out"
						onClick={() => scrollToSection("pwa")}
					>
						Instalar
					</Text>
				</li>
			</ul>

			<div className="flex gap-3">
				{isLoged ? (
					<Hello />
				) : (
					<button
						id="sign-in"
						onClick={() => navigate("/login")}
						className="cursor-pointer text-(--secondary) hover:text-(--primary) transition duration-300 ease-in-out"
					>
						Entrar
					</button>
				)}

				<button
					id="announce"
					onClick={() => navigate("/announce")}
					className="button rounded-full px-4 py-2"
				>
					Anunciar
				</button>
			</div>
		</nav>
	);
}
