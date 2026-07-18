import { useState } from "react";

import { useIsDesktop } from "../../utils/useIsDesktop";

import Text from "../../components/Text";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import Card from "../../components/Card";

import { news } from "../../moks/moks_news";

export default function News() {
	const isDesktop: boolean = useIsDesktop();

	const filters = [
		"Todos",
		...new Set(news.map((item) => item.category)),
	] as const;

	const [selectedFilter, setSelectedFilter] = useState("Todos");

	const filteredNews =
		selectedFilter === "Todos"
			? news
			: news.filter((item) => item.category === selectedFilter);

	return (
		<section id="news" className="mb-48">
			{isDesktop && (
				<header className="flex flex-wrap md:justify-between items-center gap-2 mb-12">
					<div>
						<Text as="h2" variant="subtitle">
							Novidades no campus
						</Text>
						<Text variant="heading" className="text-(--secondary)">
							Anúncios recentes dos seus colegas.
						</Text>
					</div>

					<div className="w-full md:w-auto max-h-max flex flex-col gap-2">
						<SearchBar />

						<div className="w-8/10 md:w-auto flex gap-2 overflow-x-auto">
							{filters.map((filter) => (
								<Filter
									key={filter}
									label={filter}
									selected={selectedFilter === filter}
									onSelect={() => setSelectedFilter(filter)}
								/>
							))}
						</div>
					</div>
				</header>
			)}

			<div id="carrossel-cards" className="md:overflow-x-auto py-6">
				<ul className="flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-6 md:px-3">
					{filteredNews.map((item) => (
						<li key={item.id}>
							<Card item={item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
