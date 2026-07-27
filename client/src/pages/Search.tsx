import { useEffect, useMemo, useState } from "react";

import Card from "../components/cards/Card";
import Filters from "../components/search/Filters";
import EmptyState from "../components/smalls/EmptyState";
import Spinner from "../components/smalls/Spinner";

import useCachedResource from "../hooks/useCachedResource";
import { useFilters } from "../hooks/useFilters";
import { useDebounce } from "../hooks/useDebounce";

import { getAnnounces } from "../services/announce.service";

import { getAnnouncesCacheKey } from "../utils/buildCacheKeys";

import type { Announce } from "../types/announce.types";

export default function Search() {
	const [announces, setAnnounces] = useState<Announce[]>([]);
	
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
		<section id="search" className="mt-18 pb-18">
			<header>
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
			</header>

			<div className="py-6">
				<ul className="flex flex-wrap justify-start gap-6 md:px-3">
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
									subtitle="Tente alterar os filtros"
								/>
							)}
						</>
					)}
				</ul>
			</div>
		</section>
	);
}
