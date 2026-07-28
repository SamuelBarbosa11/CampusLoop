import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import Text from "../../../components/text/Text";
import Card from "../../../components/cards/Card";
import Filters from "../../../components/search/Filters";
import EmptyState from "../../../components/smalls/EmptyState";
import Spinner from "../../../components/smalls/Spinner";

import useCachedResource from "../../../hooks/useCachedResource";
import useIsInstalled from "../../../hooks/useIsInstalled";
import { useFilters } from "../../../hooks/useFilters";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { useDebounce } from "../../../hooks/useDebounce";

import { getAnnounces, getCategories } from "../../../services/announce.service";

import { getAnnouncesCacheKey, getCategoriesCacheKey } from "../../../utils/buildCacheKeys";

import type { Announce } from "../../../types/announce.types";

export default function News() {
	const isDesktop = useIsDesktop();
	const isInstalled = useIsInstalled();

	const [announces, setAnnounces] = useState<Announce[]>([]);
	const [categories, setCategories] = useState<string[]>([]);

	const filters = useFilters();
	const debouncedSearch = useDebounce(filters.search, 500);
	const filtersData = useMemo(
		() => ({
			category: filters.category,
			donation: filters.donation,
			search: debouncedSearch,
			sort: filters.sort,
		}),
		[filters.category, filters.donation, debouncedSearch, filters.sort]
	);

	const loadCategories = useCachedResource({
		cacheKey: getCategoriesCacheKey(),

		request: getCategories,

		params: [],

		onData: setCategories,
	});

	useEffect(() => {
		loadCategories.load();
	}, []);

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

	const { load, isLoading } = useCachedResource({
		cacheKey: getAnnouncesCacheKey(filtersData),

		request: getAnnounces,

		params: [filtersData],

		onData: setAnnounces,
	});

	useEffect(() => {
		load();
	}, [load]);

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
							categories={["Todos", ...categories]}
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
					{isLoading ? (
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
