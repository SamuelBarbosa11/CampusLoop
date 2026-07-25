import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ButtonBackTo from "../components/navegation/ButtonBackTo";
import Text from "../components/text/Text";
import MyAnnounceCard from "../components/cards/MyAnnounceCard";
import Filters from "../components/search/Filters";
import EmptyState from "../components/smalls/EmptyState";
import Spinner from "../components/smalls/Spinner";

import { IoIosAdd } from "react-icons/io";

import { useFilters } from "../hooks/useFilters";
import { useAnnounces } from "../hooks/api/useAnnounces";

import { useDebounce } from "../hooks/useDebounce";
import { useIsDesktop } from "../hooks/useIsDesktop";

import type { Announce } from "../types/announce.types";

export default function Dashboard() {
	const navigate = useNavigate();

	const isDesktop = useIsDesktop();

	const { findMine, remove, loadingAnnounces } = useAnnounces();
	const filters = useFilters();

	const [announces, setAnnounces] = useState<Announce[]>([]);

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
		findMine({
			category: filters.category,
			donation: filters.donation,
			search: debouncedSearch,
			sort: filters.sort,
		})
			.then(setAnnounces)
			.catch(console.error);
	}, [filters.category, filters.donation, debouncedSearch, filters.sort]);

	async function handleDelete(announce: Announce) {
		if (!window.confirm(`Deseja excluir o anúncio "${announce.title}"?`)) {
			return;
		}

		await remove(announce.id);

		setAnnounces((previous) =>
			previous.filter((item) => item.id !== announce.id)
		);
	}

	return (
		<section id="dashboard" className="w-full min-h-screen mt-30">
			<header className="flex justify-between items-center mb-8">
				<div className="flex w-full items-center gap-4">
					{isDesktop && <ButtonBackTo />}
					<Text variant="subtitle" className="w-full text-center md:text-start">
						Meus Anúncios
					</Text>
				</div>

				{isDesktop && (
					<Text
						as="button"
						variant="button"
						onClick={() => navigate("/announce")}
						className="button flex max-h-max rounded-2xl transition duration-200 hover:opacity-105 hover:scale-103 gap-1 px-4 py-3 md:px-8 md:py-4"
					>
						<IoIosAdd color="black" size="1.5rem" />
						Anunciar
					</Text>
				)}
			</header>

			<div id="filters" className="w-full max-h-max flex flex-col gap-2">
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

			<div id="cards" className="mt-6 px-8 pb-24">
				<ul className="flex flex-wrap justify-center gap-4 md:gap-6">
					{loadingAnnounces ? (
						<div className="w-full min-h-screen flex justify-center items-center">
							<Spinner />
						</div>
					) : (
						<>
							{announces.length > 0 ? (
								announces.map((item) => (
									<li key={item.id}>
										{<MyAnnounceCard item={item} onDelete={handleDelete} />}
									</li>
								))
							) : (
								<EmptyState
									title="Nenhum anúncio encontrado"
									subtitle="Não encontrou o que esperava? experimente anunciar agora aquele item 👀"
								/>
							)}
						</>
					)}
				</ul>
			</div>
		</section>
	);
}
