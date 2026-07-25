import { useEffect, useState } from "react";

import Card from "../components/cards/Card";
import Filters from "../components/search/Filters";
import EmptyState from "../components/smalls/EmptyState";
import Spinner from "../components/smalls/Spinner";

import { useAnnounces } from "../hooks/api/useAnnounces";
import { useFilters } from "../hooks/useFilters";
import { useDebounce } from "../hooks/useDebounce";

import type { Announce } from "../types/announce.types";

export default function Search() {
	const { findAll, loadingAnnounces } = useAnnounces();

	const [announces, setAnnounces] = useState<Announce[]>([]);

	const filters = useFilters();

	const debouncedSearch = useDebounce(filters.search, 500);

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
			search: debouncedSearch,
			sort: filters.sort,
		})
			.then(setAnnounces)
			.catch(console.error);
	}, [filters.category, filters.donation, debouncedSearch, filters.sort]);

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
