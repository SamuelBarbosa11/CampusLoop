import { useEffect, useState } from "react";
import clsx from "clsx";

import Text from "../../../components/text/Text";
import Card from "../../../components/cards/Card";
import Filters from "../../../components/search/Filters";
import EmptyState from "../../../components/smalls/EmptyState";
import Spinner from "../../../components/smalls/Spinner";

import { useFilters } from "../../../hooks/useFilters";
import { useAnnounces } from "../../../hooks/api/useAnnounces";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import useIsInstalled from "../../../hooks/useIsInstalled";

import type { Announce } from "../../../types/announce.types";

export default function News() {
	const isDesktop = useIsDesktop();
	const isInstalled = useIsInstalled();

	const { findAll, loadingAnnounces } = useAnnounces();

	const [announces, setAnnounces] = useState<Announce[]>([]);

	const filters = useFilters();

	const categories = [
		"Todos",
		...Array.from(new Set(announces.map((a) => a.category))),
	];

	const orders = [
		{
			label: "Recente",
			value: "recent",
		},
		{
			label: "Menor Preço",
			value: "price-asc",
		},
		{
			label: "Maior Preço",
			value: "price-desc",
		},
	];

	useEffect(() => {
		findAll({
			category: filters.category,
			donation: filters.donation,
			search: filters.search,
			sort: filters.sort,
		})
			.then(setAnnounces)
			.catch(console.error);
	}, [filters.category, filters.donation, filters.search, filters.sort]);

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

					<div className="w-auto max-h-max flex flex-col gap-2">
						<Filters
							search={filters.search}
							onSearchChange={filters.setSearch}
							categories={categories}
							sorts={orders}
							category={filters.category}
							donation={filters.donation}
							sort={filters.sort}
							onCategoryChange={filters.selectCategory}
							onDonationToggle={filters.toggleDonation}
							onSortChange={filters.selectSort}
						/>
					</div>
				</header>
			)}

			<div
				id="carrossel-cards"
				className={clsx("md:overflow-x-auto py-6", isInstalled && "mt-24")}
			>
				<ul className="flex flex-wrap justify-center md:justify-start md:flex-nowrap gap-6 md:px-3">
					{loadingAnnounces ? (
						<div className="w-full min-h-screen flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<>
							{announces.length > 0 ? (
								announces.map((item, index) => (
									<li key={index}>
										<Card item={item} clickable />
									</li>
								))
							) : (
								<EmptyState
									title="Nenhum anúncio encontrado"
									subtitle={isDesktop ? "Tente alterar os filtros" : ""}
								/>
							)}{" "}
						</>
					)}
				</ul>
			</div>
		</section>
	);
}
