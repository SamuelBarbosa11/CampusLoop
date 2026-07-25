import { useNavigate } from "react-router";

import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { scrollToSection } from "../../../utils/scrollToSection";

import Text from "../../../components/Text";
import { IoIosAdd } from "react-icons/io";
import TextAnimated from "../../../components/TextAnimated";

export default function HeroSection() {
	const navigate = useNavigate();

	const isDesktop = useIsDesktop();

	return (
		<section className="relative w-full flex flex-col items-center mt-24 mb-8">
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
				<div className="text-center justify-center items-center max-w-4xl mb-6">
					<TextAnimated
						variant="title"
						className="text-center"
						text="A economia circular feita para a"
					/>
					<br />
					<TextAnimated
						variant="title"
						className="text-(--mauve) text-center"
						text="vida universitária."
						delay={450}
					/>
				</div>
			) : (
				<div className="flex flex-wrap text-center justify-center items-center max-w-4xl mb-6">
					<TextAnimated
						variant="title"
						className="text-center flex justify-center flex-wrap gap-x-2"
						text="Pronto para"
					/>

					<TextAnimated
						variant="title"
						className="text-(--mauve) text-center"
						text="desapegar?"
						delay={300}
					/>
				</div>
			)}

			<div className="mb-6 sm:mb-10 max-w-2xl text-center">
				<TextAnimated
					variant="muted"
					className="text-(--secondary) font-semibold"
					text="Passe adiante seus jalecos, livros e equipamentos. Economize, reduza o
					desperdício e fortaleça a comunidade estudantil."
					delay={500}
				/>
			</div>

			{isDesktop && (
				<div className="flex flex-wrap justify-center items-center gap-3">
					<Text
						as="button"
						variant="button"
						onClick={() => navigate("/announce")}
						className="button max-h-max flex rounded-2xl transition duration-200 hover:opacity-105 hover:scale-103 gap-1 px-4 py-3 md:px-8 md:py-4"
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
				</div>
			)}
		</section>
	);
}
