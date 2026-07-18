import Text from "../../components/Text";
import BubbleIcon from "../../components/BubbleIcon";

import { BsStars } from "react-icons/bs";
import { LuShieldCheck } from "react-icons/lu";
import { LuLeaf } from "react-icons/lu";

export default function PWA() {
	return (
		<section
			id="pwa"
			className="flex flex-col max-w-3xl justify-center items-center mx-auto mb-44"
		>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="flex max-w-max justify-center items-center bg-(--woodsmoke) border border-(--shark) rounded-full cursor-default mx-auto gap-2 px-3 py-1">
					<BsStars color="#C29FFF" />
					<Text
						variant="label"
						className="text-(--manatee) font-bold uppercase"
					>
						PWA instalável
					</Text>
				</div>

				<Text variant="subtitle" className="text-center">
					O CampusLoop no seu celular, como um app.
				</Text>

				<Text
					variant="description"
					className="text-(--manatee) text-center max-w-xl"
				>
					Não é outro app — é a mesma página, responsiva e compacta. Adicione à
					tela inicial pelo navegador e use a barra inferior para navegar entre
					Início, Anunciar, Dashboard e Perfil.
				</Text>
			</div>

			<div className="flex flex-wrap max-w-2xl gap-3 mt-8">
				<div className="flex w-32 sm:w-38 md:w-46 lg:w-54 bg-(--woodsmoke) justify-center items-center border rounded-2xl border-(--shark) gap-3 p-4">
					<BubbleIcon
						icon={LuShieldCheck}
						color="var(--mauve)"
						backgroundColor="var(--mauve-10)"
						borderColor="var(--mauve-40)"
					/>

					<Text variant="pwa_card" className="text-(--athens-grey)">
						Interface compacta e responsiva
					</Text>
				</div>

				<div className="flex w-32 sm:w-38 md:w-46 lg:w-54 bg-(--woodsmoke) justify-center items-center border rounded-2xl border-(--shark) gap-3 p-4">
					<BubbleIcon
						icon={LuLeaf}
						color="var(--mauve)"
						backgroundColor="var(--mauve-10)"
						borderColor="var(--mauve-40)"
					/>

					<Text variant="pwa_card" className="text-(--athens-grey)">
						Login com ID universitário
					</Text>
				</div>

				<div className="flex w-32 sm:w-38 md:w-46 lg:w-54 bg-(--woodsmoke) justify-center items-center border rounded-2xl border-(--shark) gap-3 p-4">
					<BubbleIcon
						icon={BsStars}
						color="var(--mauve)"
						backgroundColor="var(--mauve-10)"
						borderColor="var(--mauve-40)"
					/>

					<Text variant="pwa_card" className="text-(--athens-grey)">
						Anúncio em poucos toques
					</Text>
				</div>
			</div>
		</section>
	);
}
