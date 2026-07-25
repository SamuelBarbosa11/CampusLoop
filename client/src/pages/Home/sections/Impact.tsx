import Text from "../../../components/text/Text";

export default function Impact() {
	return (
		<section id="impact" className="mx-auto mb-38">
			<div className="flex flex-wrap justify-center gap-8">
				<div id="circulated-items" className="grid gap-2 text-center ">
					<Text variant="subtitle">1.4k</Text>
					<Text
						variant="heading"
						className="uppercase text-(--secondary) tracking-[1.2px] leading-4"
					>
						items circulados
					</Text>
				</div>

				<div id="active-students" className="grid gap-2 text-center ">
					<Text variant="subtitle">850+</Text>
					<Text
						variant="heading"
						className="uppercase text-(--secondary) tracking-[1.2px] leading-4"
					>
						Estudantes ativos
					</Text>
				</div>

				<div id="coletive-economic" className="grid gap-2 text-center ">
					<Text variant="subtitle">R$ 84 mil</Text>
					<Text
						variant="heading"
						className="uppercase text-(--secondary) tracking-[1.2px] leading-4"
					>
						Economia coletiva
					</Text>
				</div>

				<div id="Co2-avoided" className="grid gap-2 text-center ">
					<Text variant="subtitle">420 kg</Text>
					<Text
						variant="heading"
						className="uppercase text-(--secondary) tracking-[1.2px] leading-4"
					>
						CO₂ evitado
					</Text>
				</div>
			</div>
		</section>
	);
}
