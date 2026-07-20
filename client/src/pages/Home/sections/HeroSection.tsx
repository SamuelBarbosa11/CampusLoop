import { useNavigate } from "react-router";

import { useIsDesktop } from "../../../utils/useIsDesktop";
import { scrollToSection } from "../../../utils/scrollToSection";

import Text from "../../../components/Text";

import { IoIosAdd } from "react-icons/io";

export default function HeroSection() {
	const navigate = useNavigate();

	const isDesktop = useIsDesktop();

	return (
		<section className="relative w-full mt-16 mb-8 md:mb-24 md:mt-24 flex flex-col items-center">
			<div
				id="blur"
				className="
					absolute
					-top-25
					md:-top-50
					-z-1
					h-full
					w-full
					rounded-full
					blur-3xl
					bg-[radial-gradient(circle,rgba(194,159,255,0.18)_0%,rgba(194,159,255,0.18)_70%,transparent_100%)]
				"
			/>

			{isDesktop && (
				<div className="flex gap-2 p-3 py-1 mb-6 justify-center items-center bg-(--mauve)/10 border border-(--mauve)/20 rounded-full">
					<div
						id="ball"
						className="bg-(--mauve) rounded-full w-2 h-2 animate-pulse"
					></div>
					<Text variant="label" className="text-(--mauve) font-bold uppercase">
						Exclusivo do campus
					</Text>
				</div>
			)}

			{isDesktop ? (
				<div className="flex flex-wrap text-center justify-center items-center max-w-4xl mb-6">
					<Text variant="title" className="text-center">
						A economia circular <br /> feita para a{" "}
						<Text variant="title" className="text-(--mauve) text-center">
							vida universitária.
						</Text>
					</Text>
				</div>
			) : (
				<div className="flex flex-wrap text-center justify-center items-center max-w-4xl mb-6">
					<Text
						variant="title"
						className="text-center flex justify-center flex-wrap gap-x-2"
					>
						Pronto para
						<Text variant="title" className="text-(--mauve) text-center">
							desapegar?
						</Text>
					</Text>
				</div>
			)}

			<Text
				variant="muted"
				className="text-center text-(--secondary) font-semibold max-w-2xl mb-6 sm:mb-10"
			>
				Passe adiante seus jalecos, livros e equipamentos. Economize, reduza o
				desperdício e fortaleça a comunidade estudantil.
			</Text>

			<div className="flex flex-wrap justify-center items-center gap-3">
				{isDesktop && (
					<>
						<Text
							as="button"
							variant="button"
							onClick={() => navigate("/announce")}
							className="button flex rounded-2xl transition duration-200 hover:opacity-105 hover:scale-103 gap-1 px-4 py-3 md:px-8 md:py-4"
						>
							<IoIosAdd color="black" size="1.5rem" />
							Anunciar item
						</Text>

						<Text
							as="button"
							variant="button"
							onClick={() => scrollToSection("news")}
							className="button-opaque rounded-2xl transition duration-200 hover:scale-103 px-8 py-4"
						>
							Explore a Vitrine
						</Text>
					</>
				)}
			</div>
		</section>
	);
}
